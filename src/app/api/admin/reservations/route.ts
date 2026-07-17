import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        date: true,
        time: true,
        status: true,

        service: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true,
          },
        },
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
