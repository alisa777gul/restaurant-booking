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

      rounded-2xl

      bg-neutral-900

      border
      border-neutral-800

      p-3
      sm:p-5

      overflow-hidden

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


  );

}