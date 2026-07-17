import { subscribe } from '@/lib/reservation-events';

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const send = (data: unknown) => {
        try {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        } catch (error) {
          console.error('SSE closed:', error);
        }
      };

      const unsubscribe = subscribe(send);

      const interval = setInterval(() => {
        try {
          controller.enqueue(`: ping\n\n`);
        } catch {
          clearInterval(interval);
        }
      }, 30000);

      return () => {
        clearInterval(interval);

        unsubscribe();
      };
    },

    cancel() {
      console.log('SSE connection closed');
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
