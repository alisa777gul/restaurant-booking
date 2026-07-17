import { prisma } from '@/lib/prisma';
import { success, failure } from '@/lib/api';

function getId(body: { id?: unknown }) {
  if (!body.id) {
    return null;
  }

  const id = Number(body.id);

  if (Number.isNaN(id)) {
    return null;
  }

  return id;
}

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        duration: true,
        price: true,
        active: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return success(services);
  } catch (error) {
    console.error(error);

    return failure('Failed loading services');
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, description, duration, price } = body;

    if (!name || !duration || Number.isNaN(Number(duration))) {
      return failure('Name and duration required', 400);
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        duration: Number(duration),
        price: price !== undefined && price !== '' ? Number(price) : null,
      },
    });

    return success(service);
  } catch (error) {
    console.error(error);

    return failure('Create failed');
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const id = getId(body);

    if (!id) {
      return failure('Service id required', 400);
    }

    const service = await prisma.service.update({
      where: {
        id,
      },

      data: {
        active: false,
      },
    });

    return success(service);
  } catch (error) {
    console.error(error);

    return failure('Archive failed');
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const id = getId(body);

    if (!id) {
      return failure('Service id required', 400);
    }

    const service = await prisma.service.update({
      where: {
        id,
      },

      data: {
        active: true,
      },
    });

    return success(service);
  } catch (error) {
    console.error(error);

    return failure('Restore failed');
  }
}
