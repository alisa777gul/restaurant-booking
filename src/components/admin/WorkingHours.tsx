'use client';

import { useEffect, useState } from 'react';

type WorkingHour = {
  id: number;
  day: string;
  open: string;
  close: string;
  closed: boolean;
};

type EditableField = 'open' | 'close' | 'closed';

export default function WorkingHours() {
  const [hours, setHours] = useState<WorkingHour[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/settings/working-hours');

        const data = await res.json();

        setHours(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function updateHour(index: number, field: EditableField, value: string | boolean) {
    setHours((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  }

  async function save() {
    try {
      setSaving(true);

      await fetch('/api/admin/settings/working-hours', {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(hours),
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-neutral-500">Loading working hours...</p>;
  }

  return (
    <div
      className="
bg-white
dark:bg-neutral-950

border
border-neutral-200
dark:border-neutral-800

rounded-3xl

p-6

space-y-5
"
    >
      <h2
        className="
text-xl
font-bold
"
      >
        Restaurant working hours
      </h2>

      {hours.map((item, index) => (
        <div
          key={item.id}

          className="
flex
flex-col
md:flex-row

md:items-center
md:justify-between

gap-4

border-b
border-neutral-200
dark:border-neutral-800

pb-4
"
        >
          <div>
            <p className="font-semibold">{item.day}</p>

            <p className="text-sm text-neutral-500">
              {item.closed ? 'Closed' : `${item.open} - ${item.close}`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="time"
              value={item.open}
              disabled={item.closed}

              onChange={(e) => updateHour(index, 'open', e.target.value)}

              className="
rounded-xl
border
px-3
py-2

dark:bg-neutral-900
"
            />

            <span>-</span>

            <input
              type="time"
              value={item.close}
              disabled={item.closed}

              onChange={(e) => updateHour(index, 'close', e.target.value)}

              className="
rounded-xl
border
px-3
py-2

dark:bg-neutral-900
"
            />

            <label
              className="
flex
gap-2
items-center
text-sm
"
            >
              <input
                type="checkbox"

                checked={item.closed}

                onChange={(e) => updateHour(index, 'closed', e.target.checked)}
              />
              Closed
            </label>
          </div>
        </div>
      ))}

      <button
        onClick={save}

        disabled={saving}

        className="
bg-blue-600
hover:bg-blue-700

disabled:opacity-50

text-white

px-6
py-3

rounded-2xl

font-semibold
"
      >
        {saving ? 'Saving...' : 'Save changes'}
      </button>
    </div>
  );
}
