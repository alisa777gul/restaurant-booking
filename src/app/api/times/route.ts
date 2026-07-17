import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveHours, generateSlots } from '@/lib/availability';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        {
          error: 'Date required',
        },
        {
          status: 400,
        },
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        {
          error: 'Invalid date format',
        },
        {
          status: 400,
        },
      );
    }

    const hours = await getEffectiveHours(date);

    if (!hours) {
      return NextResponse.json([]);
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        date,
        status: {
          not: 'CANCELLED',
        },
      },
      select: {
        time: true,
      },
    });

    const booked = new Set(reservations.map((item) => item.time));
    const times = generateSlots(hours.open, hours.close, hours.slotDuration);

    const slots = times.map((time) => ({
      id: `${date}-${time}`,
      time,
      available: !booked.has(time),
    }));

    return NextResponse.json(slots);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Failed loading times',
      },
      {
        status: 500,
      },
    );
  }
}
