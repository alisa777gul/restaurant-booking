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

    // Effective hours for this date: combines the weekly working hours
    // with any per-date override (closures / special openings).
    const hours = await getEffectiveHours(date);

    // Closed on this date -> no slots at all.
    if (!hours) {
      return NextResponse.json([]);
    }

    const times = generateSlots(hours.open, hours.close, hours.slotDuration);

    const now = new Date();

    const filteredTimes = times.filter((time) => {
      const slotDate = new Date(`${date}T${time}:00`);

      // If the day is today, hide slots that are already in the past.
      if (slotDate <= now) {
        return false;
      }

      return true;
    });

    const reservations = await prisma.reservation.findMany({
      where: {
        date,
      },
    });

    const slots = filteredTimes.map((time) => ({
      id: `${date}-${time}`,

      date,

      time,

      available: !reservations.some((r) => r.time === time),
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
