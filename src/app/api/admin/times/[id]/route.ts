import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const slotId = Number(id);

    if (Number.isNaN(slotId)) {
      return NextResponse.json(
        {
          error: 'Invalid id',
        },
        {
          status: 400,
        },
      );
    }

    await prisma.timeSlot.delete({
      where: {
        id: slotId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Delete timeslot error:', error);

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
