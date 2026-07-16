import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// получить услуги
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Failed loading services',
      },
      {
        status: 500,
      },
    );
  }
}

// создать услугу
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, description, duration, price } = body;

    if (!name || !duration) {
      return NextResponse.json(
        {
          error: 'Name and duration required',
        },
        {
          status: 400,
        },
      );
    }

    const service = await prisma.service.create({
      data: {
        name,

        description,

        duration: Number(duration),

        price: price ? Number(price) : null,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Create failed',
      },
      {
        status: 500,
      },
    );
  }
}
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          error: 'Service id required',
        },
        {
          status: 400,
        },
      );
    }

    const service = await prisma.service.update({
      where: {
        id: Number(id),
      },

      data: {
        active: false,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Archive failed',
      },
      {
        status: 500,
      },
    );
  }
}
// восстановить услугу
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          error: 'Service id required',
        },
        {
          status: 400,
        },
      );
    }

    const service = await prisma.service.update({
      where: {
        id: Number(id),
      },

      data: {
        active: true,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Restore failed',
      },
      {
        status: 500,
      },
    );
  }
}
