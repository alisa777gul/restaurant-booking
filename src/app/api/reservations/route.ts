import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveHours, generateSlots } from '@/lib/availability';

export async function POST(request: Request) {
  try {
    const { name, phone, email, date, time, guests, serviceId } = await request.json();

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

    // существует ли услуга

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

    // выбранная дата открыта и время попадает в рабочие часы?
    // (учитывает недельные часы + переопределения конкретных дат)

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

    // время уже занято?

    const exists = await prisma.reservation.findFirst({
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

        serviceId: Number(serviceId),

        status: 'PENDING',
      },

      // return the related service so the client receives
      // the full booking (including the chosen service)
      include: {
        service: true,
      },
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
