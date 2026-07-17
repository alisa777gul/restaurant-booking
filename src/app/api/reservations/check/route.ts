import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { date, time } = await request.json();

    if (!date || !time) {
      return NextResponse.json(
        {
          error: 'Date and time required',
        },
        {
          status: 400,
        },
      );
    }

    const reservation = await prisma.reservation.findFirst({
      where: {
        date,
        time,
      },
      select: {
        id: true,
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
