"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface CalendarProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}


export default function Calendar({
  value,
  onChange,
}: CalendarProps) {


  const today = new Date();



  return (

    <div
      className="
      w-full
      rounded-3xl

      border
      border-neutral-200
      dark:border-neutral-800

      bg-white/80
      dark:bg-neutral-950/80

      backdrop-blur-xl

      shadow-xl
      shadow-black/5
      dark:shadow-black/30

      p-4
      sm:p-6

      transition-all
      "
    >



      {/* HEADER */}

      <div
        className="
        mb-5
        flex
        items-center
        justify-between
        "
      >

        <div>

          <p
            className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-neutral-400
            "
          >
            Booking
          </p>


          <h3
            className="
            mt-1
            text-lg
            font-semibold
            text-neutral-900
            dark:text-white
            "
          >
            Select date
          </h3>

        </div>



        <div
          className="
          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-full

          bg-blue-600

          text-white

          text-sm
          font-bold
          "
        >
          📅
        </div>


      </div>






      <div
        className="
        calendar-wrapper
        flex
        justify-center
        "
      >

        <DayPicker

          mode="single"

          selected={value}

          onSelect={onChange}


          disabled={{
            before: today,
          }}


          className="
          mx-auto
          "
          
        />


      </div>




    </div>


  );
}