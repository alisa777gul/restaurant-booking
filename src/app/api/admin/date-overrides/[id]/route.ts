import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;

    const overrideId = Number(id);

    if (Number.isNaN(overrideId)) {
      return NextResponse.json(
        {
          error: 'Invalid id',
        },
        {
          status: 400,
        },
      );
    }

    await prisma.dateOverride.delete({
      where: {
        id: overrideId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Delete date override error:', error);

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
