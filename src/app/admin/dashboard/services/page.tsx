'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
type Service = {
  id: number;
  name: string;
  description: string | null;
  duration: number;
  price: number | null;
  active: boolean;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  const [name, setName] = useState('');
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState('');

  const [loading, setLoading] = useState(false);

  async function loadServices(signal?: AbortSignal) {
    try {
      const res = await fetch('/api/admin/services', {
        signal,
      });

      if (!res.ok) {
        throw new Error('Failed to load services');
      }

      const data = await res.json();

      setServices(data);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error(error);
      }
    }
  }
  async function deleteService(id: number) {
    try {
      const res = await fetch('/api/admin/services', {
        method: 'DELETE',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          id,
        }),
      });

      if (!res.ok) {
        throw new Error('Archive failed');
      }

      await loadServices();
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const controller = new AbortController();

    loadServices(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  async function createService() {
    if (!name.trim()) return;

    try {
      setLoading(true);

      const res = await fetch('/api/admin/services', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name,
          duration,
          price: price ? Number(price) : null,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create service');
      }

      setName('');
      setDuration(30);
      setPrice('');

      await loadServices();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  async function restoreService(id: number) {
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          id,
        }),
      });

      if (!res.ok) {
        throw new Error('Restore failed');
      }

      await loadServices();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Services</h1>

      <div
        className="
        bg-white
        dark:bg-neutral-900
        border
        border-neutral-200
        dark:border-neutral-800
        rounded-3xl
        p-6
        space-y-4
        "
      >
        <input
          placeholder="Service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
          w-full
          rounded-xl
          p-3
          border
          border-neutral-200
          bg-neutral-50
          text-neutral-900
          placeholder:text-neutral-400

          dark:bg-neutral-800
          dark:border-neutral-700
          dark:text-white
          dark:placeholder:text-neutral-500
          "
        />

        <input
          type="number"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="
          w-full
          rounded-xl
          p-3
          border
          border-neutral-200
          bg-neutral-50
          text-neutral-900

          dark:bg-neutral-800
          dark:border-neutral-700
          dark:text-white
          "
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="
          w-full
          rounded-xl
          p-3
          border
          border-neutral-200
          bg-neutral-50
          text-neutral-900

          dark:bg-neutral-800
          dark:border-neutral-700
          dark:text-white
          "
        />

        <button
          onClick={createService}
          disabled={loading}
          className="
          bg-blue-600
          hover:bg-blue-700
          disabled:opacity-50
          text-white
          px-6
          py-3
          rounded-xl
          transition
          "
        >
          {loading ? 'Adding...' : 'Add service'}
        </button>
      </div>

      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="
            border
            border-neutral-200
            dark:border-neutral-800
            bg-white
            dark:bg-neutral-900
            rounded-2xl
            p-4
            flex
            justify-between
            items-center
            "
          >
            <div>
              <p className="font-bold text-neutral-900 dark:text-white">{service.name}</p>

              <p className="text-sm text-neutral-500">{service.duration} min</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="font-semibold text-neutral-900 dark:text-white">
                {service.price ?? 0} €
              </div>

              {service.active ? (
                <button
                  onClick={() => deleteService(service.id)}
                  className="
      text-red-500
      hover:text-red-700
      "
                >
                  Hide
                </button>
              ) : (
                <button
                  onClick={() => restoreService(service.id)}
                  className="
      text-green-500
      hover:text-green-700
      "
                >
                  Restore
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
