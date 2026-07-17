import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveHours, generateSlots } from '@/lib/availability';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json([]);
    }

    const hours = await getEffectiveHours(date);

    if (!hours) {
      return NextResponse.json([]);
    }

    const times = generateSlots(hours.open, hours.close, hours.slotDuration);

    const now = new Date();

    const filteredTimes = times.filter((time) => {
      const slotDate = new Date(`${date}T${time}:00`);

      if (slotDate <= now) {
        return false;
      }

      return true;
    });

    const reservations = await prisma.reservation.findMany({
      where: {
        date,
      },
      select: {
        time: true,
      },
    });

    const reservedTimes = new Set(reservations.map((reservation) => reservation.time));

    const slots = filteredTimes.map((time) => ({
      id: `${date}-${time}`,

      date,

      time,

      available: !reservedTimes.has(time),
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
