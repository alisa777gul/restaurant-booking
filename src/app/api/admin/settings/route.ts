import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const hours = await prisma.workingHour.findMany({
      select: {
        id: true,
        day: true,
        open: true,
        close: true,
        closed: true,
        slotDuration: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return NextResponse.json(hours);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Failed loading working hours',
      },
      {
        status: 500,
      },
    );
  }
}
