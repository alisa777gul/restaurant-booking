import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const today = new Date();
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
      today.getDate(),
    ).padStart(2, '0')}`;

    const todayReservations = await prisma.reservation.findMany({
      where: {
        date,
      },

      include: {
        service: true,
      },
      orderBy: {
        time: 'asc',
      },
    });

    const [total, pending, confirmed] = await Promise.all([
      prisma.reservation.count(),

      prisma.reservation.count({
        where: {
          status: 'PENDING',
        },
      }),

      prisma.reservation.count({
        where: {
          status: 'CONFIRMED',
        },
      }),
    ]);

    return NextResponse.json({
      todayReservations,

      stats: {
        total,
        pending,
        confirmed,
        today: todayReservations.length,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Dashboard error',
      },
      {
        status: 500,
      },
    );
  }
}
