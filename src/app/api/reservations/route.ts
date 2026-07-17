import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveHours, generateSlots } from '@/lib/availability';
import { notifyReservation } from '@/lib/reservation-events';

export async function POST(request: Request) {
  try {
    const {
      name,
      phone,
      email,
      date,
      time,
      guests,
      serviceId: rawServiceId,
      status,
    } = await request.json();

    const serviceId = Number(rawServiceId);

    if (!name || !phone || !email || !date || !time || !guests || !serviceId) {
      return NextResponse.json(
        {
          error: 'All fields required',
        },
        {
          status: 400,
        },
      );
    }

    if (Number.isNaN(serviceId)) {
      return NextResponse.json(
        {
          error: 'Invalid service',
        },
        {
          status: 400,
        },
      );
    }

    const service = await prisma.service.findUnique({
      where: {
        id: Number(serviceId),
      },
    });

    if (!service) {
      return NextResponse.json(
        {
          error: 'Service not found',
        },
        {
          status: 400,
        },
      );
    }

    const hours = await getEffectiveHours(date);

    if (!hours) {
      return NextResponse.json(
        {
          error: 'The restaurant is closed on this date',
        },
        {
          status: 400,
        },
      );
    }

    const validSlots = generateSlots(hours.open, hours.close, hours.slotDuration);

    if (!validSlots.includes(time)) {
      return NextResponse.json(
        {
          error: 'This time is not available on the selected date',
        },
        {
          status: 400,
        },
      );
    }

    const exists = await prisma.reservation.count({
      where: {
        date,
        time,
      },
    });

    if (exists) {
      return NextResponse.json(
        {
          error: 'This time already booked',
        },
        {
          status: 400,
        },
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        name,
        phone,
        email,
        date,
        time,
        guests,
        serviceId,
        status: status === 'CONFIRMED' ? 'CONFIRMED' : 'PENDING',
      },
      include: {
        service: true,
      },
    });

    notifyReservation({
      type: 'NEW_RESERVATION',
      reservation,
    });

    return NextResponse.json(reservation, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Server error',
      },
      {
        status: 500,
      },
    );
  }
}
