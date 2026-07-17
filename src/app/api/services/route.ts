import { prisma } from '@/lib/prisma';
import { success, failure } from '@/lib/api';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: {
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
