type Listener = (data: unknown) => void;

const listeners = new Set<Listener>();

export function subscribe(listener: Listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function notifyReservation(data: unknown) {
  for (const listener of listeners) {
    try {
      listener(data);
    } catch (error) {
      console.error('SSE listener failed:', error);

      listeners.delete(listener);
    }
  }
}
