import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { date } = await request.json();

    if (!date || typeof date !== 'string') {
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

    const reservations = await prisma.reservation.findMany({
      where: {
        date,
      },

      select: {
        time: true,
      },
    });

    const reservedTimes = reservations.map(({ time }) => time);

    return NextResponse.json({
      reservedTimes,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Failed loading reservations',
      },
      {
        status: 500,
      },
    );
  }
}
