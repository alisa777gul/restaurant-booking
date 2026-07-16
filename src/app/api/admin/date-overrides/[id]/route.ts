import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE /api/admin/date-overrides/[id]
// Removes a date override so the date falls back to the regular
// weekly working hours again.
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

    await prisma.dateOverride.delete({
      where: {
        id: Number(id),
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
