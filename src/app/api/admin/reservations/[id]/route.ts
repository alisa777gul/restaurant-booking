import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const body = await request.json();

    const allowedStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED'];

    if (!allowedStatuses.includes(body.status)) {
      return NextResponse.json(
        {
          error: 'Invalid status',
        },
        {
          status: 400,
        },
      );
    }

    const { id } = await params;

    const reservation = await prisma.reservation.update({
      where: {
        id: Number(id),
      },

      data: {
        status: body.status,
      },

      include: {
        service: true,
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Update failed',
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  try {
    const { id } = await params;

    const reservation = await prisma.reservation.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Delete failed',
      },
      {
        status: 500,
      },
    );
  }
}
