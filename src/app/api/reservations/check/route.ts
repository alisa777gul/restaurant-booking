import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { date, time } = await request.json();

    const reservation = await prisma.reservation.findFirst({
      where: {
        date,
        time,
      },
    });

    return NextResponse.json({
      available: !reservation,
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
