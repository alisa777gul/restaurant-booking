type Listener = (data: unknown) => void;

const listeners = new Set<Listener>();

export function subscribe(listener: Listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function notifyReservation(data: unknown) {
  listeners.forEach((listener) => {
    listener(data);
  });
}
