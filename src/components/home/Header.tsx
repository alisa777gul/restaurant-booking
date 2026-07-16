'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  return (
    <header
      className="
      fixed
      inset-x-0
      top-0
      z-50
      border-b
      border-neutral-200/50
      bg-white/70
      backdrop-blur-xl

      dark:border-neutral-800/50
      dark:bg-black/50
      "
    >
      <div
        className="
        mx-auto
        flex
        h-16
        max-w-7xl
        items-center
        justify-between
        px-4

        sm:h-20
        sm:px-6

        lg:px-8
        "
      >
        {/* LOGO */}

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

        {/* DESKTOP MENU ONLY HOME */}

        {isHomePage && (
          <nav
            className="
            hidden
            items-center
            gap-8

            text-sm
            text-neutral-500

            md:flex

            dark:text-neutral-400
            "
          >
            <Link
              href="#features"
              className="
              transition
              hover:text-blue-600
              "
            >
              Features
            </Link>

            <Link
              href="#pricing"
              className="
              transition
              hover:text-blue-600
              "
            >
              Pricing
            </Link>

            <Link
              href="#contact"
              className="
              transition
              hover:text-blue-600
              "
            >
              Contact
            </Link>
          </nav>
        )}

        {/* ACTIONS */}

        <div
          className="
          flex
          items-center
          gap-2
          "
        >
          <ThemeToggle />

          <Link
            href="/admin/login"
            className="
            hidden
            rounded-full
            px-4
            py-2
            text-sm
            transition

            hover:bg-neutral-100

            dark:hover:bg-neutral-900

            sm:block
            "
          >
            Login
          </Link>

          <Link
            href="/admin/login"
            className="
            rounded-full
            bg-black
            px-4
            py-2

            text-sm
            font-semibold
            text-white

            transition
            hover:scale-105

            dark:bg-white
            dark:text-black

            sm:px-6
            sm:py-3
            "
          >
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}
