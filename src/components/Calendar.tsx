/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { DayPicker } from "react-day-picker";
import { useState } from "react";
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

    <div className="rounded-2xl bg-neutral-900 border border-neutral-700 p-5">

      <DayPicker

        mode="single"

        selected={value}

        onSelect={onChange}

        disabled={{
          before: today,
        }}

      />

    </div>

  );
}