'use client';

import { useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import './calendar.css';

import TimeSlots from '@/components/admin/TimeSlots';
import ReservationModal from '@/components/admin/ReservationModal';

import { CalendarDays, Clock, Users, Phone, Mail, Sparkles } from 'lucide-react';

type Service = {
  id: number;
  name: string;
  duration: number;
  price: number | null;
};

type Reservation = {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  status: string;
  serviceId: number | null;
  service: Service | null;
};

type Props = {
  reservations: Reservation[];

  onUpdate: (id: number, status: string) => void;

  onDelete: (id: number) => void;
};

const formatDate = (date: Date) => {
  return (
    `${date.getFullYear()}-` +
    `${String(date.getMonth() + 1).padStart(2, '0')}-` +
    `${String(date.getDate()).padStart(2, '0')}`
  );
};

const normalizeDate = (value: string) => {
  return value?.split('T')[0] ?? '';
};

export default function AdminCalendar({ reservations = [], onUpdate, onDelete }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const selectedDay = formatDate(selectedDate);

  const dayReservations = useMemo(() => {
    return reservations

      .filter((item) => normalizeDate(item.date) === selectedDay)

      .sort((a, b) => a.time.localeCompare(b.time));
  }, [reservations, selectedDay]);

  const bookedDays = useMemo(() => {
    return reservations

      .filter((item) => item.date)

      .map((item) => new Date(normalizeDate(item.date)));
  }, [reservations]);

  return (
    <div
      className="
grid
grid-cols-1
xl:grid-cols-[360px_1fr]
gap-6
w-full
"
    >
      {/* LEFT */}

      <section
        className="
relative
overflow-hidden

rounded-3xl

border
border-neutral-200
dark:border-neutral-800

bg-white
dark:bg-neutral-950

shadow-xl

p-5
sm:p-6
"
      >
        <div
          className="
absolute
top-0
right-0

w-40
h-40

bg-blue-500/20

blur-3xl

rounded-full
"
        />

        <div
          className="
relative
flex
items-center
gap-4
mb-6
"
        >
          <div
            className="
w-12
h-12

rounded-2xl

bg-blue-500/10

text-blue-500

flex
items-center
justify-center
"
          >
            <CalendarDays size={24} />
          </div>

          <div>
            <h2
              className="
font-bold
text-xl
"
            >
              Calendar
            </h2>

            <p
              className="
text-sm
text-neutral-500
"
            >
              Manage bookings
            </p>
          </div>
        </div>

        <div
          className="
rounded-2xl

bg-neutral-50
dark:bg-neutral-900

border
border-neutral-200
dark:border-neutral-800

p-3
"
        >
          <DayPicker
            mode="single"

            selected={selectedDate}

            onSelect={(date) => {
              if (date) setSelectedDate(date);
            }}

            modifiers={{
              booked: bookedDays,
            }}

            modifiersClassNames={{
              booked: 'booked-day',
            }}
          />
        </div>

        <div
          className="
mt-5

rounded-2xl

border
border-neutral-200
dark:border-neutral-800

bg-neutral-50
dark:bg-neutral-900

p-4
"
        >
          <div
            className="
flex
items-center
gap-3
"
          >
            <div
              className="
p-2

rounded-xl

bg-yellow-500/10

text-yellow-500
"
            >
              <Sparkles size={18} />
            </div>

            <div>
              <p
                className="
text-xs
text-neutral-500
"
              >
                Selected date
              </p>

              <p
                className="
font-semibold
"
              >
                {selectedDate.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  weekday: 'short',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* RIGHT */}

      <section
        className="
rounded-3xl

border
border-neutral-200
dark:border-neutral-800

bg-white
dark:bg-neutral-950

shadow-xl

p-5
sm:p-6
"
      >
        <div
          className="
flex
flex-col
gap-6
"
        >
          <div>
            <p
              className="
text-sm
text-neutral-500
"
            >
              Reservations
            </p>

            <h1
              className="
mt-1

text-2xl
sm:text-3xl

font-bold

tracking-tight
"
            >
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </h1>

            <div
              className="
mt-3

inline-flex

items-center

gap-2

rounded-full

bg-blue-500/10

text-blue-500

px-3
py-1

text-sm

font-medium
"
            >
              <CalendarDays size={15} />

              <span>{dayReservations.length} bookings</span>
            </div>
          </div>

          {/* TIME SLOTS */}

          <div>
            <TimeSlots date={selectedDay} />
          </div>

          {/* EMPTY */}

          {dayReservations.length === 0 ? (
            <div
              className="
min-h-75

rounded-3xl

border
border-dashed

border-neutral-300
dark:border-neutral-800

bg-neutral-50
dark:bg-neutral-900/50

flex

flex-col

items-center

justify-center

text-neutral-500
"
            >
              <div
                className="
w-16
h-16

rounded-2xl

bg-neutral-200
dark:bg-neutral-800

flex
items-center
justify-center

mb-4
"
              >
                <CalendarDays size={30} />
              </div>

              <p
                className="
font-semibold
"
              >
                No reservations
              </p>

              <p
                className="
text-sm
mt-1
"
              >
                This day is available
              </p>
            </div>
          ) : (
            <div
              className="
space-y-4
"
            >
              {dayReservations.map((item) => (
                <button
                  key={item.id}

                  type="button"

                  onClick={() => setSelectedReservation(item)}

                  className="
group

w-full

text-left

rounded-3xl

border

border-neutral-200

dark:border-neutral-800


bg-white

dark:bg-neutral-900


p-5


hover:border-blue-500/50

hover:shadow-lg


transition-all

duration-300
"
                >
                  <div
                    className="
flex

flex-col

sm:flex-row

sm:items-start

sm:justify-between

gap-5
"
                  >
                    <div
                      className="
flex
gap-4
"
                    >
                      <div
                        className="
w-12
h-12

rounded-2xl

bg-blue-500/10

text-blue-500

flex

items-center

justify-center

font-bold

text-lg
"
                      >
                        {item.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3
                          className="
font-bold

text-lg

group-hover:text-blue-500

transition
"
                        >
                          {item.name}
                        </h3>

                        <div
                          className="
mt-3

flex

flex-wrap

gap-4

text-sm

text-neutral-500
"
                        >
                          <span
                            className="
flex
items-center
gap-2
"
                          >
                            <Clock size={15} />

                            {item.time}
                          </span>

                          <span
                            className="
flex
items-center
gap-2
"
                          >
                            <Users size={15} />

                            {item.guests}
                          </span>

                          {item.service && (
                            <span
                              className="
flex
items-center
gap-2
"
                            >
                              <Sparkles size={15} />

                              {item.service.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`

px-4
py-2

rounded-full

text-xs

font-semibold

w-fit


${
  item.status === 'CONFIRMED'
    ? 'bg-green-500/10 text-green-500'
    : item.status === 'CANCELLED'
      ? 'bg-red-500/10 text-red-500'
      : 'bg-yellow-500/10 text-yellow-500'
}


`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div
                    className="
mt-5

pt-4

border-t

border-neutral-200
dark:border-neutral-800

flex

flex-col

gap-3

text-sm

text-neutral-500
"
                  >
                    <span
                      className="
flex
items-center
gap-3
break-all
"
                    >
                      <Phone size={15} />

                      {item.phone}
                    </span>

                    <span
                      className="
flex
items-center
gap-3
break-all
"
                    >
                      <Mail size={15} />

                      {item.email}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedReservation && (
        <ReservationModal
          reservation={selectedReservation}

          onClose={() => {
            setSelectedReservation(null);
          }}

          onUpdate={(id, status) => {
            onUpdate(id, status);

            setSelectedReservation(null);
          }}

          onDelete={(id) => {
            onDelete(id);

            setSelectedReservation(null);
          }}
        />
      )}
    </div>
  );
}
