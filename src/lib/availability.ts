import { prisma } from '@/lib/prisma';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export type EffectiveHours = {
  open: string;
  close: string;
  slotDuration: number;
};

// Weekday name (e.g. "Monday") for a "YYYY-MM-DD" date string.
export function getDayName(date: string) {
  const day = new Date(date).getDay();
  return WEEKDAYS[day];
}

// Resolves the effective opening hours for a specific "YYYY-MM-DD" date.
//
// It combines the recurring weekly WorkingHour with any per-date
// DateOverride:
//   - override.closed === true   -> the date is closed (returns null)
//   - override.open + close set  -> "special opening" (uses those hours
//                                     even if the weekday is normally
//                                     closed)
//   - otherwise                  -> the regular weekly hours, allowing a
//                                     partial override of open/close/
//                                     slotDuration
//
// Returns null when the restaurant is closed on that date, so callers
// can simply treat null as "no available slots".
export async function getEffectiveHours(date: string): Promise<EffectiveHours | null> {
  const override = await prisma.dateOverride.findUnique({
    where: { date },
  });

  // Explicit closure for this specific date (e.g. a holiday).
  if (override?.closed) {
    return null;
  }

  const day = getDayName(date);

  const workingHour = await prisma.workingHour.findUnique({
    where: { day },
  });

  // Special opening: the date has custom hours even though the weekday
  // might normally be closed or undefined.
  if (override && override.open && override.close) {
    return {
      open: override.open,
      close: override.close,
      slotDuration: override.slotDuration ?? workingHour?.slotDuration ?? 30,
    };
  }

  // No configured hours, or the weekday is marked closed.
  if (!workingHour || workingHour.closed) {
    return null;
  }

  // Regular weekly hours, with an optional partial override.
  return {
    open: override?.open ?? workingHour.open,
    close: override?.close ?? workingHour.close,
    slotDuration: override?.slotDuration ?? workingHour.slotDuration,
  };
}

// Builds the list of "HH:MM" slots between open and close using the
// given slot duration (minutes).
export function generateSlots(open: string, close: string, duration: number) {
  const result: string[] = [];

  let current = new Date(`2000-01-01T${open}`);

  const end = new Date(`2000-01-01T${close}`);

  while (current < end) {
    result.push(current.toTimeString().slice(0, 5));

    current.setMinutes(current.getMinutes() + duration);
  }

  return result;
}
