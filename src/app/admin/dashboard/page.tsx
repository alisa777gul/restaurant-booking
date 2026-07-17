'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import StatCard from '@/components/admin/StatCard';
import { toast } from 'sonner';

type Service = {
  id: number;
  name: string;
  duration: number;
  price: number | null;
};

type Reservation = {
  id: number;
  name: string;
  time: string;
  guests: string;
  status: string;
  serviceId: number | null;
  service: Service | null;
};

type Stats = {
  total: number;
  pending: number;
  confirmed: number;
  today: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    today: 0,
  });

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const loadDashboard = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        cache: 'no-store',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setStats(
        data.stats ?? {
          total: 0,
          pending: 0,
          confirmed: 0,
          today: 0,
        },
      );

      setReservations(data.todayReservations ?? []);
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const enableAudio = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio('/notification.mp3');
        audioRef.current.volume = 1;
      }

      audioRef.current
        .play()
        .then(() => {
          audioRef.current!.pause();
          audioRef.current!.currentTime = 0;

          setAudioEnabled(true);

          console.log('🔊 Audio enabled');
        })
        .catch(() => {});
    };

    window.addEventListener('click', enableAudio, {
      once: true,
    });

    return () => {
      window.removeEventListener('click', enableAudio);
    };
  }, []);

  useEffect(() => {
    const events = new EventSource('/api/admin/events');

    events.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'NEW_RESERVATION') {
        toast.success('🔔 New reservation received');

        if (audioEnabled && audioRef.current) {
          audioRef.current.currentTime = 0;

          audioRef.current.play().catch((error) => {
            console.error('Sound error:', error);
          });
        }

        loadDashboard();
      }
    };

    events.onerror = () => {
      console.log('SSE disconnected');
      events.close();
    };

    return () => {
      events.close();
    };
  }, [audioEnabled, loadDashboard]);

  if (loading) {
    return (
      <div
        className="
min-h-80
flex
items-center
justify-center
text-neutral-500
"
      >
        Loading dashboard...
      </div>
    );
  }

  return (
    <main className="w-full">
      <section className="mb-10">
        <div
          className="
inline-flex
items-center
rounded-full
bg-blue-500/10
text-blue-600
dark:text-blue-400
px-4
py-2
text-sm
font-medium
mb-5
"
        >
          ✨ Overview
        </div>

        <h1
          className="
text-3xl
sm:text-4xl
lg:text-5xl
font-bold
tracking-tight
"
        >
          Dashboard
        </h1>

        <p
          className="
mt-3
text-neutral-500
dark:text-neutral-400
"
        >
          Manage your bookings and business activity
        </p>
      </section>

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
"
      >
        <StatCard title="Today" value={stats.today} />

        <StatCard title="All reservations" value={stats.total} />

        <StatCard title="Pending" value={stats.pending} />

        <StatCard title="Confirmed" value={stats.confirmed} />
      </div>

      <section
        className="
mt-10

rounded-3xl

border
border-neutral-200
dark:border-neutral-800

bg-white/80
dark:bg-neutral-950/80

backdrop-blur-xl

shadow-xl

p-5
sm:p-7

"
      >
        <div
          className="
flex
items-center
justify-between
mb-6
"
        >
          <div>
            <h2
              className="
text-xl
sm:text-2xl
font-bold
"
            >
              Today&apos;s reservations
            </h2>

            <p
              className="
text-sm
text-neutral-500
mt-1
"
            >
              Upcoming bookings
            </p>
          </div>

          <div
            className="
w-10
h-10
rounded-xl
bg-blue-500/10
text-blue-500
flex
items-center
justify-center
font-bold
"
          >
            {reservations.length}
          </div>
        </div>

        {reservations.length === 0 ? (
          <div
            className="
rounded-2xl
border
border-dashed
border-neutral-300
dark:border-neutral-800
py-14
text-center
text-neutral-500
"
          >
            No reservations today
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((item) => (
              <div
                key={item.id}

                className="
group

flex

flex-col

sm:flex-row

sm:items-center

sm:justify-between

gap-5

rounded-2xl

border

border-neutral-200

dark:border-neutral-800

bg-neutral-50

dark:bg-neutral-900/50

p-5

hover:border-blue-500/50

hover:shadow-lg

transition-all

"
              >
                <div
                  className="
flex
items-center
gap-4
"
                >
                  <div
                    className="
w-12
h-12
rounded-2xl

bg-blue-500/10

text-blue-600

dark:text-blue-400

flex
items-center
justify-center

font-bold

"
                  >
                    {item.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p
                      className="
font-bold
text-lg
"
                    >
                      {item.name}
                    </p>

                    <p
                      className="
text-sm
text-neutral-500
mt-1
"
                    >
                      🕒 {item.time}
                      {item.service ? ` • ${item.service.name}` : ''}
                    </p>
                  </div>
                </div>

                <div
                  className="
flex
items-center
justify-between
sm:flex-col
sm:items-end
gap-3
"
                >
                  <p
                    className="
text-sm
text-neutral-500
"
                  >
                    {item.guests} guests
                  </p>

                  <span
                    className={`

px-4
py-1.5

rounded-full

text-xs

font-semibold


${
  item.status === 'CONFIRMED'
    ? 'bg-green-500/10 text-green-600 dark:text-green-400'
    : item.status === 'CANCELLED'
      ? 'bg-red-500/10 text-red-600 dark:text-red-400'
      : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
}

`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
