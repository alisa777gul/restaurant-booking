import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const overrides = await prisma.dateOverride.findMany({
      orderBy: {
        date: 'asc',
      },
    });

    return NextResponse.json(overrides);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Failed loading date overrides',
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { date, closed, open, close, slotDuration, reason } = body;

    if (!date) {
      return NextResponse.json(
        {
          error: 'Date is required',
        },
        {
          status: 400,
        },
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        {
          error: 'Date must be in YYYY-MM-DD format',
        },
        {
          status: 400,
        },
      );
    }

    const isClosed = Boolean(closed);

    if (!isClosed && open && close && open >= close) {
      return NextResponse.json(
        {
          error: 'Opening time must be before closing time',
        },
        {
          status: 400,
        },
      );
    }

    const data = {
      closed: isClosed,

      open: isClosed ? null : open || null,
      close: isClosed ? null : close || null,
      slotDuration:
        !isClosed && slotDuration && !Number.isNaN(Number(slotDuration))
          ? Number(slotDuration)
          : null,
      reason: reason || null,
    };

    const override = await prisma.dateOverride.upsert({
      where: {
        date,
      },
      create: {
        date,
        ...data,
      },
      update: data,
    });

    return NextResponse.json(override);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Failed saving date override',
      },
      {
        status: 500,
      },
    );
  }
}
