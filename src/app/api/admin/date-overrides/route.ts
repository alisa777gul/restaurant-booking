import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/date-overrides
// Returns every date-specific override (closures + special openings),
// ordered by date ascending.
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

// POST /api/admin/date-overrides
// Creates or updates (upsert) an override for a specific date.
//
// Body:
// {
//   date: "YYYY-MM-DD",   (required)
//   closed: boolean,       -> fully close the restaurant on that date
//   open: "HH:MM" | null,  -> custom opening time (special opening)
//   close: "HH:MM" | null, -> custom closing time
//   slotDuration: number | null,
//   reason: string | null
// }
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

    // A basic YYYY-MM-DD sanity check.
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

    // If the day is being marked as a special opening (not closed) and
    // custom hours are supplied, make sure open < close.
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
      // When the date is closed we don't keep custom hours.
      open: isClosed ? null : open || null,
      close: isClosed ? null : close || null,
      slotDuration: !isClosed && slotDuration ? Number(slotDuration) : null,
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
