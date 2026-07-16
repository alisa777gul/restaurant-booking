'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

import ThemeToggle from '@/components/ThemeToggle';

type TopbarProps = {
  setOpen: (value: boolean) => void;
};

export default function Topbar({ setOpen }: TopbarProps) {
  return (
    <header
      className="
        sticky
        top-0
        z-30

        flex
        h-16
        items-center
        justify-between

        border-b
        border-neutral-200

        bg-white/80
        px-4

        backdrop-blur-xl

        dark:border-neutral-800
        dark:bg-neutral-950/80

        sm:h-20
        sm:px-6

        lg:px-10
      "
    >
      <div className="flex items-center gap-4">
        {/* MOBILE MENU */}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-xl

            border
            border-neutral-200

            bg-white

            shadow-sm

            transition

            hover:bg-neutral-100

            dark:border-neutral-800
            dark:bg-neutral-900
            dark:hover:bg-neutral-800

            lg:hidden
          "
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* BRAND */}

        <div>
          <Link
            href="/"
            className="
              text-xl
              font-bold
              tracking-tight

              sm:text-2xl
            "
          >
            Book
            <span className="text-blue-600">Flow</span>
          </Link>

          <p
            className="
              hidden

              text-sm
              text-neutral-500

              sm:block
            "
          >
            Booking management platform
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <ThemeToggle />

        <div
          className="
            flex

            h-9
            w-9

            items-center
            justify-center

            rounded-2xl

            bg-gradient-to-br
            from-blue-500
            to-indigo-600

            font-bold
            text-white

            sm:h-10
            sm:w-10
          "
        >
          A
        </div>
      </div>
    </header>
  );
}
