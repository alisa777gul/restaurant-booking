import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];

    const todayReservations = await prisma.reservation.findMany({
      where: {
        date: today,
      },
      // include the related service so the dashboard
      // can show which service was booked
      include: {
        service: true,
      },
      orderBy: {
        time: 'asc',
      },
    });

    const total = await prisma.reservation.count();

    const pending = await prisma.reservation.count({
      where: {
        status: 'PENDING',
      },
    });

    const confirmed = await prisma.reservation.count({
      where: {
        status: 'CONFIRMED',
      },
    });

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
