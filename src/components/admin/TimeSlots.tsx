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
  <div
    className="
    mt-8
    pt-8
    border-t
    border-neutral-200
    dark:border-neutral-800
    "
  >


    {/* HEADER */}

    <div
      className="
      flex
      items-center
      justify-between
      mb-6
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
          w-11
          h-11
          rounded-2xl
          flex
          items-center
          justify-center
          bg-blue-500/10
          text-blue-500
          "
        >
          <Clock size={22}/>
        </div>


        <div>

          <h3
            className="
            font-bold
            text-lg
            tracking-tight
            "
          >
            Available times
          </h3>


          <p
            className="
            text-sm
            text-neutral-500
            "
          >
            Manage working hours for this day
          </p>

        </div>


      </div>


      <span
        className="
        text-xs
        px-3
        py-1.5
        rounded-full
        bg-blue-500/10
        text-blue-500
        font-medium
        "
      >
        {slots.length} slots
      </span>


    </div>





    {/* EMPTY STATE */}


    {
      slots.length === 0 ? (


        <div
          className="
          rounded-3xl
          border
          border-dashed
          border-neutral-300
          dark:border-neutral-800

          bg-neutral-50
          dark:bg-neutral-900/40

          p-8

          text-center
          "
        >

          <Clock
            size={34}
            className="
            mx-auto
            text-neutral-400
            "
          />


          <p
            className="
            mt-4
            font-medium
            "
          >
            No available times
          </p>


          <p
            className="
            text-sm
            text-neutral-500
            mt-1
            "
          >
            Add working hours below
          </p>


        </div>


      )


      :


      (


        <div
          className="
          grid
          sm:grid-cols-2
          gap-3
          "
        >

          {
            slots.map((slot)=>(


              <div
                key={slot.id}

                className="
                group

                flex
                items-center
                justify-between

                rounded-2xl

                border
                border-neutral-200
                dark:border-neutral-800

                bg-white
                dark:bg-neutral-950

                px-5
                py-4

                shadow-sm

                hover:border-blue-500/40
                hover:shadow-md

                transition-all
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
                    w-9
                    h-9
                    rounded-xl
                    bg-yellow-500/10
                    text-yellow-500
                    flex
                    items-center
                    justify-center
                    "
                  >

                    <Clock size={17}/>

                  </div>



                  <span
                    className="
                    font-semibold
                    "
                  >
                    {slot.time}
                  </span>


                </div>




                <button

                  onClick={() => deleteTime(slot.id)}

                  disabled={loading}


                  className="
                  w-9
                  h-9

                  rounded-xl

                  flex
                  items-center
                  justify-center

                  text-red-500

                  hover:bg-red-500/10

                  disabled:opacity-50

                  transition
                  "

                >

                  <Trash2 size={17}/>

                </button>



              </div>


            ))
          }


        </div>


      )
    }







    {/* ADD TIME */}


    <div
      className="
      mt-6

      flex
      flex-col
      sm:flex-row

      gap-3

      rounded-3xl

      border
      border-neutral-200
      dark:border-neutral-800

      bg-neutral-50
      dark:bg-neutral-900/50

      p-4
      "
    >


      <input

        type="time"

        value={newTime}

        onChange={(e)=>setNewTime(e.target.value)}

        className="
        flex-1

        rounded-2xl

        bg-white
        dark:bg-neutral-950

        border
        border-neutral-200
        dark:border-neutral-800

        px-4
        py-3

        outline-none

        focus:border-blue-500

        transition
        "

      />




      <button

        onClick={addTime}

        disabled={loading}

        className="
        flex
        items-center
        justify-center
        gap-2

        rounded-2xl

        bg-blue-600

        text-white

        px-6
        py-3

        font-semibold

        hover:bg-blue-500

        active:scale-95

        disabled:opacity-50

        transition
        "

      >

        <Plus size={18}/>

        Add time

      </button>


    </div>



  </div>
);
}