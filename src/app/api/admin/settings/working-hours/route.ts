import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const defaultDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export async function GET() {
  try {
    let hours = await prisma.workingHour.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    if (hours.length === 0) {
      await prisma.workingHour.createMany({
        data: defaultDays.map((day) => ({
          day,

          open: '10:00',

          close: '22:00',

          closed: false,

          slotDuration: 30,
        })),
      });

      hours = await prisma.workingHour.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    }

    return NextResponse.json(hours);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Failed loading settings',
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();

    for (const item of data) {
      await prisma.workingHour.update({
        where: {
          id: item.id,
        },

        data: {
          open: item.open,
          close: item.close,
          closed: item.closed,
          slotDuration: item.slotDuration,
        },
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Failed saving',
      },
      {
        status: 500,
      },
    );
  }
}
