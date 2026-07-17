'use client';

import { useEffect, useState } from 'react';
import Calendar from '@/components/Calendar';
import Header from '@/components/home/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/reservation/BookingForm';
type Service = {
  id: number;
  name: string;
  description: string | null;
  duration: number;
  price: number | null;
};

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;
}

export default function ReservationPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');

  const [reservedTimes, setReservedTimes] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchServices() {
      try {
        const res = await fetch('/api/services', {
          signal: controller.signal,
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setServices(data);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error(error);
        }
      }
    }

    fetchServices();

    return () => controller.abort();
  }, []);

  const date = selectedDate ? formatDate(selectedDate) : '';

  async function handleDateChange(newDate: Date | undefined) {
    setSelectedDate(newDate);

    setTime('');
    setError('');
    setSuccess(false);

    if (!newDate) {
      setReservedTimes([]);
      setTimes([]);
      return;
    }

    const formattedDate = formatDate(newDate);

    try {
      const slotResponse = await fetch(`/api/admin/times?date=${formattedDate}`);

      const slotData = await slotResponse.json();

      setTimes(Array.isArray(slotData) ? slotData.map((item: { time: string }) => item.time) : []);

      const reservedResponse = await fetch('/api/reservations/available', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          date: formattedDate,
        }),
      });

      const reservedData = await reservedResponse.json();

      setReservedTimes(reservedData.reservedTimes ?? []);
    } catch {
      setReservedTimes([]);
      setTimes([]);
      setError('Could not load available times');
    }
  }

  async function handleSubmit() {
    setError('');
    setSuccess(false);

    if (!name || !phone || !email || !date || !time || !guests || !selectedService) {
      setError('Please fill in all fields');
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValid) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name,
          phone,
          email,
          date,
          time,
          guests,
          serviceId: selectedService,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setSuccess(true);

      setName('');
      setPhone('');
      setEmail('');
      setSelectedDate(undefined);
      setTime('');
      setGuests('2');
      setReservedTimes([]);
    } catch {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="
min-h-screen

bg-linear-to-br
from-neutral-50
via-white
to-blue-50

dark:from-[#050505]
dark:via-[#09090b]
dark:to-[#111827]

text-neutral-900
dark:text-white

px-4
sm:px-6
py-12
sm:py-20
"
    >
      <Header />
      <section
        className="
max-w-3xl
mx-auto
my-10
"
      >
        <div
          className="
text-center
"
        >
          <div
            className="
inline-flex
px-4
py-2
rounded-full

bg-blue-500/10

text-blue-600
dark:text-blue-400

text-sm
font-medium
"
          >
            ✨ Online booking
          </div>

          <h1
            className="
mt-6

text-4xl
sm:text-6xl

font-bold

tracking-tight

"
          >
            Book your appointment
          </h1>

          <p
            className="
mt-4

text-neutral-500
dark:text-neutral-400

max-w-xl
mx-auto

"
          >
            Choose a convenient time and reserve your appointment in seconds.
          </p>
        </div>

        {success && (
          <div
            className="
mt-10

rounded-3xl

bg-green-500/10

border
border-green-500/30

p-6

backdrop-blur-xl
"
          >
            <p
              className="
text-green-600
dark:text-green-400

font-semibold
text-lg
"
            >
              Reservation successful 🎉
            </p>

            <p
              className="
mt-2
text-neutral-600
dark:text-neutral-400
"
            >
              We will contact you shortly.
            </p>
          </div>
        )}

        {error && (
          <div
            className="
mt-10

rounded-3xl

bg-red-500/10

border
border-red-500/30

p-6

text-red-500

"
          >
            {error}
          </div>
        )}

        <div
          className="
mt-12

rounded-4xl

border

border-neutral-200
dark:border-neutral-800


bg-white/70
dark:bg-neutral-950/70


backdrop-blur-xl


shadow-2xl


p-5
sm:p-8

"
        >
          <div
            className="
grid
gap-6
"
          >
            <div>
              <label
                className="
block
mb-3

text-sm
font-medium

text-neutral-700
dark:text-neutral-300

"
              >
                Select date
              </label>

              <div
                className="
rounded-2xl

border
border-neutral-200
dark:border-neutral-800

p-3

bg-neutral-50
dark:bg-neutral-900

"
              >
                <Calendar
                  value={selectedDate}

                  onChange={handleDateChange}
                />
              </div>
            </div>

            <div>
              <label
                className="
block
mb-3
text-sm
font-medium
text-neutral-700
dark:text-neutral-300
"
              >
                Choose service
              </label>

              <div
                className="
grid
gap-3
"
              >
                {services.map((service) => (
                  <button
                    key={service.id}

                    type="button"

                    onClick={() => setSelectedService(service.id)}

                    className={`

rounded-2xl

border

p-4

text-left

transition


${
  selectedService === service.id
    ? 'border-blue-600 bg-blue-500/10'
    : 'border-neutral-200 dark:border-neutral-800'
}

`}
                  >
                    <p className="font-bold">{service.name}</p>

                    <p
                      className="
text-sm
text-neutral-500
"
                    >
                      {service.duration} min
                      {service.price && ` • ${service.price} €`}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                className="
block
mb-3

text-sm
font-medium

text-neutral-700
dark:text-neutral-300
"
              >
                Available time
              </label>

              <div
                className="
grid

grid-cols-2
sm:grid-cols-4

gap-3

"
              >
                {times.map((item) => (
                  <button
                    key={item}

                    type="button"

                    disabled={reservedTimes.includes(item)}

                    onClick={() => setTime(item)}

                    className={`

h-12

rounded-2xl

border

text-sm

font-medium

transition-all


${
  time === item
    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20 scale-105'
    : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-blue-500'
}



${reservedTimes.includes(item) ? 'opacity-30 cursor-not-allowed line-through' : ''}

`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <BookingForm
              name={name}

              phone={phone}

              email={email}

              guests={guests}

              loading={loading}

              onNameChange={setName}

              onPhoneChange={setPhone}

              onEmailChange={setEmail}

              onGuestsChange={setGuests}

              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
