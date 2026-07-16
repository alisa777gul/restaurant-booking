'use client';

import { useEffect, useState } from 'react';

type WorkingHour = {
  id: number;
  day: string;
  open: string;
  close: string;
  closed: boolean;
  slotDuration: number;
};

type EditableField = 'open' | 'close' | 'closed' | 'slotDuration';

type DateOverride = {
  id: number;
  date: string;
  closed: boolean;
  open: string | null;
  close: string | null;
  slotDuration: number | null;
  reason: string | null;
};

export default function SettingsPage() {
  const [hours, setHours] = useState<WorkingHour[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  // --- Special date overrides (closures / special openings) ---

  const [overrides, setOverrides] = useState<DateOverride[]>([]);

  const [savingOverride, setSavingOverride] = useState(false);

  const [overrideDate, setOverrideDate] = useState('');

  const [overrideMode, setOverrideMode] = useState<'closed' | 'custom'>('closed');

  const [overrideOpen, setOverrideOpen] = useState('10:00');

  const [overrideClose, setOverrideClose] = useState('22:00');

  const [overrideSlot, setOverrideSlot] = useState(30);

  const [overrideReason, setOverrideReason] = useState('');

  const [overrideError, setOverrideError] = useState('');

  useEffect(() => {
    async function loadHours() {
      try {
        const res = await fetch('/api/admin/settings/working-hours');

        const data = await res.json();

        if (Array.isArray(data)) {
          setHours(data);
        }
      } catch (error) {
        console.error('Loading hours error:', error);
      } finally {
        setLoading(false);
      }
    }

    loadHours();
  }, []);

  function updateHour(index: number, field: EditableField, value: string | boolean | number) {
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
    } catch (error) {
      console.error('Saving error:', error);
    } finally {
      setSaving(false);
    }
  }

  // Load existing date overrides on mount.

  useEffect(() => {
    async function loadOverrides() {
      try {
        const res = await fetch('/api/admin/date-overrides');

        const data = await res.json();

        if (Array.isArray(data)) {
          setOverrides(data);
        }
      } catch (error) {
        console.error('Loading overrides error:', error);
      }
    }

    loadOverrides();
  }, []);

  async function addOverride() {
    setOverrideError('');

    if (!overrideDate) {
      setOverrideError('Please pick a date');
      return;
    }

    if (overrideMode === 'custom' && overrideOpen >= overrideClose) {
      setOverrideError('Opening time must be before closing time');
      return;
    }

    try {
      setSavingOverride(true);

      const res = await fetch('/api/admin/date-overrides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: overrideDate,
          closed: overrideMode === 'closed',
          open: overrideMode === 'custom' ? overrideOpen : null,
          close: overrideMode === 'custom' ? overrideClose : null,
          slotDuration: overrideMode === 'custom' ? overrideSlot : null,
          reason: overrideReason || null,
        }),
      });

      const saved = await res.json();

      if (!res.ok) {
        setOverrideError(saved.error || 'Failed to save');
        return;
      }

      // Replace if the date already existed, otherwise add.
      setOverrides((prev) => {
        const rest = prev.filter((o) => o.id !== saved.id);

        return [...rest, saved].sort((a, b) => a.date.localeCompare(b.date));
      });

      // Reset the form.
      setOverrideDate('');
      setOverrideReason('');
    } catch (error) {
      console.error('Save override error:', error);
      setOverrideError('Server error');
    } finally {
      setSavingOverride(false);
    }
  }

  async function deleteOverride(id: number) {
    setOverrides((prev) => prev.filter((o) => o.id !== id));

    try {
      await fetch(`/api/admin/date-overrides/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Delete override error:', error);
    }
  }

  if (loading) {
    return (
      <div
        className="
        h-40
        flex
        items-center
        justify-center
        text-neutral-500
        "
      >
        Loading settings...
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="mb-8">
        <h1
          className="
          text-3xl
          sm:text-4xl
          font-bold
          "
        >
          Settings
        </h1>

        <p
          className="
          mt-2
          text-neutral-500
          "
        >
          Manage restaurant working hours
        </p>
      </div>

      <div
        className="
        bg-white
        dark:bg-neutral-950

        border
        border-neutral-200
        dark:border-neutral-800

        rounded-3xl

        p-5
        sm:p-8

        space-y-5
        "
      >
        {hours.map((item, index) => (
          <div
            key={item.id}

            className="
              flex
              flex-col
              lg:flex-row

              lg:items-center
              lg:justify-between

              gap-5

              pb-5

              border-b
              border-neutral-200
              dark:border-neutral-800
              "
          >
            <div>
              <h2
                className="
                  font-bold
                  text-lg
                  "
              >
                {item.day}
              </h2>

              <p
                className="
                  text-sm
                  text-neutral-500
                  "
              >
                Restaurant opening hours
              </p>
            </div>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
                "
            >
              <input
                type="time"

                value={item.open}

                disabled={item.closed}

                onChange={(e) => updateHour(index, 'open', e.target.value)}

                className="
                  rounded-xl
                  border
                  border-neutral-300
                  dark:border-neutral-700

                  bg-white
                  dark:bg-neutral-900

                  px-3
                  py-2
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
                  border-neutral-300
                  dark:border-neutral-700

                  bg-white
                  dark:bg-neutral-900

                  px-3
                  py-2
                  "
              />

              <select
                value={item.slotDuration}

                disabled={item.closed}

                onChange={(e) => updateHour(index, 'slotDuration', Number(e.target.value))}

                className="
                  rounded-xl
                  border
                  border-neutral-300
                  dark:border-neutral-700

                  bg-white
                  dark:bg-neutral-900

                  px-3
                  py-2
                  "
              >
                <option value={15}>15 min</option>

                <option value={30}>30 min</option>

                <option value={60}>60 min</option>
              </select>

              <label
                className="
                  flex
                  items-center
                  gap-2

                  cursor-pointer

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
          mt-4

          bg-blue-600
          hover:bg-blue-700

          disabled:opacity-50

          text-white

          px-6
          py-3

          rounded-2xl

          font-semibold

          transition
          "
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      {/* ---------- SPECIAL DATES ---------- */}

      <div className="mt-12 mb-8">
        <h2
          className="
          text-2xl
          sm:text-3xl
          font-bold
          "
        >
          Special dates
        </h2>

        <p className="mt-2 text-neutral-500">
          Close the restaurant on a specific date (e.g. a holiday) or open it with custom hours on a
          day that is normally closed.
        </p>
      </div>

      <div
        className="
        bg-white
        dark:bg-neutral-950

        border
        border-neutral-200
        dark:border-neutral-800

        rounded-3xl

        p-5
        sm:p-8

        space-y-6
        "
      >
        {/* ADD / EDIT FORM */}

        <div
          className="
          flex
          flex-col
          gap-4
          "
        >
          <div
            className="
            flex
            flex-wrap
            items-end
            gap-4
            "
          >
            <div className="flex flex-col gap-1">
              <label className="text-sm text-neutral-500">Date</label>

              <input
                type="date"
                value={overrideDate}
                onChange={(e) => setOverrideDate(e.target.value)}
                className="
                rounded-xl
                border
                border-neutral-300
                dark:border-neutral-700

                bg-white
                dark:bg-neutral-900

                px-3
                py-2
                "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-neutral-500">Type</label>

              <select
                value={overrideMode}
                onChange={(e) => setOverrideMode(e.target.value as 'closed' | 'custom')}
                className="
                rounded-xl
                border
                border-neutral-300
                dark:border-neutral-700

                bg-white
                dark:bg-neutral-900

                px-3
                py-2
                "
              >
                <option value="closed">Closed all day</option>
                <option value="custom">Custom hours (special opening)</option>
              </select>
            </div>

            {overrideMode === 'custom' && (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-neutral-500">Open</label>

                  <input
                    type="time"
                    value={overrideOpen}
                    onChange={(e) => setOverrideOpen(e.target.value)}
                    className="
                      rounded-xl
                      border
                      border-neutral-300
                      dark:border-neutral-700

                      bg-white
                      dark:bg-neutral-900

                      px-3
                      py-2
                      "
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-neutral-500">Close</label>

                  <input
                    type="time"
                    value={overrideClose}
                    onChange={(e) => setOverrideClose(e.target.value)}
                    className="
                      rounded-xl
                      border
                      border-neutral-300
                      dark:border-neutral-700

                      bg-white
                      dark:bg-neutral-900

                      px-3
                      py-2
                      "
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-neutral-500">Slot</label>

                  <select
                    value={overrideSlot}
                    onChange={(e) => setOverrideSlot(Number(e.target.value))}
                    className="
                      rounded-xl
                      border
                      border-neutral-300
                      dark:border-neutral-700

                      bg-white
                      dark:bg-neutral-900

                      px-3
                      py-2
                      "
                  >
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={60}>60 min</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-500">Note (optional)</label>

            <input
              type="text"
              placeholder="e.g. Public holiday"
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              className="
              rounded-xl
              border
              border-neutral-300
              dark:border-neutral-700

              bg-white
              dark:bg-neutral-900

              px-3
              py-2

              w-full
              sm:max-w-sm
              "
            />
          </div>

          {overrideError && <p className="text-sm text-red-500">{overrideError}</p>}

          <button
            onClick={addOverride}
            disabled={savingOverride}
            className="
            self-start

            bg-blue-600
            hover:bg-blue-700

            disabled:opacity-50

            text-white

            px-6
            py-3

            rounded-2xl

            font-semibold

            transition
            "
          >
            {savingOverride ? 'Saving...' : 'Add / update date'}
          </button>
        </div>

        {/* LIST */}

        <div
          className="
          border-t
          border-neutral-200
          dark:border-neutral-800

          pt-6

          space-y-3
          "
        >
          {overrides.length === 0 ? (
            <p className="text-neutral-500">No special dates configured.</p>
          ) : (
            overrides.map((item) => (
              <div
                key={item.id}
                className="
                  flex
                  items-center
                  justify-between

                  gap-4

                  rounded-2xl

                  border
                  border-neutral-200
                  dark:border-neutral-800

                  px-4
                  py-3
                  "
              >
                <div>
                  <p className="font-semibold">{item.date}</p>

                  <p className="text-sm text-neutral-500">
                    {item.closed
                      ? 'Closed all day'
                      : `Open ${item.open} - ${item.close}` +
                        (item.slotDuration ? ` (${item.slotDuration} min)` : '')}
                    {item.reason ? ` • ${item.reason}` : ''}
                  </p>
                </div>

                <button
                  onClick={() => deleteOverride(item.id)}
                  className="
                    text-sm

                    text-red-500

                    hover:bg-red-500/10

                    px-3
                    py-2

                    rounded-xl

                    transition
                    "
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
