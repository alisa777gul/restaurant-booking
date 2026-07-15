"use client";

import { useCallback, useEffect, useState } from "react";
import { Clock, Plus, Trash2 } from "lucide-react";

type TimeSlot = {
  id: number;
  date: string;
  time: string;
};

type Props = {
  date: string;
};

export default function TimeSlots({ date }: Props) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Получение времени с сервера.
   * Не меняет state напрямую.
   */
  const fetchSlots = useCallback(async (): Promise<TimeSlot[]> => {
    if (!date) {
      return [];
    }

    try {
      const res = await fetch(`/api/admin/times?date=${date}`);

      if (!res.ok) {
        console.error("Failed to load time slots");
        return [];
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        return [];
      }

      return [...data].sort((a, b) =>
        a.time.localeCompare(b.time)
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [date]);


  /**
   * Первичная загрузка при смене даты
   */
  useEffect(() => {
    let active = true;

    const load = async () => {
      const data = await fetchSlots();

      if (active) {
        setSlots(data);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [fetchSlots]);


  /**
   * Добавление времени
   */
  const addTime = async () => {
    if (!newTime || loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/admin/times", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          time: newTime,
        }),
      });


      if (!res.ok) {
        console.error("Failed adding time");
        return;
      }


      setNewTime("");

      const updatedSlots = await fetchSlots();
      setSlots(updatedSlots);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };


  /**
   * Удаление времени
   */
  const deleteTime = async (id: number) => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/admin/times/${id}`, {
        method: "DELETE",
      });


      if (!res.ok) {
        console.error("Failed deleting time");
        return;
      }


      const updatedSlots = await fetchSlots();
      setSlots(updatedSlots);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="mt-8 border-t border-neutral-800 pt-6">

      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-400">
          <Clock size={20} />
        </div>

        <div>
          <h3 className="font-bold">
            Available times
          </h3>

          <p className="text-sm text-neutral-500">
            For selected day
          </p>
        </div>
      </div>


      {slots.length === 0 ? (

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-sm text-neutral-500">
          No available times
        </div>

      ) : (

        <div className="space-y-3">

          {slots.map((slot) => (

            <div
              key={slot.id}
              className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3"
            >

              <div className="flex items-center gap-3">

                <Clock
                  size={16}
                  className="text-yellow-400"
                />

                <span className="font-medium">
                  {slot.time}
                </span>

              </div>


              <button
                onClick={() => deleteTime(slot.id)}
                disabled={loading}
                className="text-red-400 hover:text-red-300 disabled:opacity-50 transition"
              >
                <Trash2 size={18} />
              </button>

            </div>

          ))}

        </div>

      )}



      <div className="flex gap-3 mt-5">

        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-yellow-500"
        />


        <button
          onClick={addTime}
          disabled={loading}
          className="flex items-center gap-2 bg-yellow-500 text-black px-5 rounded-xl font-semibold hover:bg-yellow-400 disabled:opacity-50 transition"
        >

          <Plus size={18} />

          Add

        </button>

      </div>

    </div>
  );
}