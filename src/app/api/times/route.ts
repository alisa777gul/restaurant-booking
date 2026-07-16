import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveHours, generateSlots } from '@/lib/availability';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json([]);
    }

    // Effective hours for this date: combines the weekly working hours
    // with any per-date override (closures / special openings).
    const hours = await getEffectiveHours(date);

    // Closed on this date -> no slots at all.
    if (!hours) {
      return NextResponse.json([]);
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        date,
      },
      select: {
        time: true,
      },
    });

    const booked = reservations.map((item) => item.time);

    const times = generateSlots(hours.open, hours.close, hours.slotDuration);

    const slots = times.map((time, index) => ({
      id: index,
      time,
      available: !booked.includes(time),
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
