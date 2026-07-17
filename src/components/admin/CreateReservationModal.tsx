'use client';

import { useEffect, useState } from 'react';
import { X, CalendarDays, Clock, Sparkles } from 'lucide-react';

type Service = {
  id: number;
  name: string;
  duration: number;
  price: number | null;
};

type Props = {
  date: string;
  time: string;

  onClose: () => void;
  onCreated: () => void;
};

export default function CreateReservationModal({ date, time, onClose, onCreated }: Props) {
  const [services, setServices] = useState<Service[]>([]);

  const [serviceId, setServiceId] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [guests, setGuests] = useState('2');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/services');

      const data = await res.json();

      if (Array.isArray(data)) {
        setServices(data);
      }
    }

    load();
  }, []);

  async function create() {
    if (!name || !phone || !serviceId) {
      setError('Name, phone and service required');

      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/reservations', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name,
          phone,

          email: email || 'admin@booking.local',

          date,
          time,

          guests,

          serviceId: Number(serviceId),

          status: 'CONFIRMED',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error');

        return;
      }

      onCreated();
    } catch (err) {
      console.error(err);

      setError('Server error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/60
backdrop-blur-md
p-4
"
    >
      <div
        className="
w-full
max-w-xl
rounded-3xl
bg-white
dark:bg-neutral-950
shadow-2xl
border
border-neutral-200
dark:border-neutral-800
"
      >
        <header
          className="
flex
justify-between
items-center
p-6
border-b

border-neutral-200
dark:border-neutral-800
"
        >
          <div>
            <p
              className="
text-sm
text-neutral-500
"
            >
              New booking
            </p>

            <h2
              className="
text-2xl
font-bold
"
            >
              Create reservation
            </h2>
          </div>

          <button
            onClick={onClose}
            className="
w-10
h-10
rounded-xl
bg-neutral-100
dark:bg-neutral-900
flex
items-center
justify-center
"
          >
            <X />
          </button>
        </header>

        <div
          className="
p-6
space-y-4
"
        >
          <input
            className="booking-input"
            placeholder="Customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="booking-input"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="booking-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            className="booking-input"

            value={serviceId}

            onChange={(e) => setServiceId(e.target.value)}
          >
            <option value="">Select service</option>

            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
                {s.price && ` - ${s.price}€`}
              </option>
            ))}
          </select>

          <div
            className="
grid
grid-cols-2
gap-3
"
          >
            <div
              className="
rounded-xl
bg-neutral-100
dark:bg-neutral-900
p-4
"
            >
              <CalendarDays size={18} />

              <p>{date}</p>
            </div>

            <div
              className="
rounded-xl
bg-neutral-100
dark:bg-neutral-900
p-4
"
            >
              <Clock size={18} />

              <p>{time}</p>
            </div>
          </div>

          <select
            className="booking-input"

            value={guests}

            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="1">1 guest</option>

            <option value="2">2 guests</option>

            <option value="3">3 guests</option>

            <option value="4">4 guests</option>
          </select>

          {error && (
            <div
              className="
bg-red-500/10
text-red-500
rounded-xl
p-3
"
            >
              {error}
            </div>
          )}

          <button
            disabled={loading}

            onClick={create}

            className="
w-full
rounded-2xl
bg-blue-600
hover:bg-blue-700
text-white
py-4
font-semibold
"
          >
            {loading ? 'Creating...' : 'Create CONFIRMED booking'}
          </button>
        </div>
      </div>
    </div>
  );
}
