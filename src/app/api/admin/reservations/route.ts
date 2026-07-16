import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// получить все брони

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      // include the related service so the admin UI
      // can show which service was booked
      include: {
        service: true,
      },

      orderBy: [
        {
          date: 'asc',
        },
        {
          time: 'asc',
        },
      ],
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Failed to load reservations',
      },
      {
        status: 500,
      },
    );
  }
}
