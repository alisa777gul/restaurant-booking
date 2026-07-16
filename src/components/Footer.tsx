'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  return (
    <footer
      className="
      border-t
      border-neutral-200
      bg-white
      py-10

      dark:border-neutral-800
      dark:bg-[#050505]
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        viewport={{
          once: true,
        }}

        transition={{
          duration: 0.6,
        }}

        className="
        mx-auto
        flex
        max-w-7xl
        flex-col
        gap-8
        px-4

        sm:px-6

        lg:flex-row
        lg:items-center
        lg:justify-between
        lg:px-8
        "
      >
        {/* LOGO */}

        <div
          className="
          text-center
          lg:text-left
          "
        >
          <Link
            href="/"
            className="
            text-xl
            font-bold
            tracking-tight
            "
          >
            Book
            <span className="text-blue-600">Flow</span>
          </Link>

          <p
            className="
            mt-2
            text-sm
            text-neutral-500
            dark:text-neutral-400
            "
          >
            Smart booking platform for modern businesses.
          </p>
        </div>

        {/* HOME LINKS ONLY */}

        {isHomePage && (
          <div
            className="
            flex
            flex-wrap
            justify-center
            gap-6
            text-sm
            text-neutral-500

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
          </div>
        )}

        {/* CONTACT BUTTON */}

        <div
          className="
          flex
          justify-center
          "
        >
          <Link
            href="mailto:hello@bookflow.com"

            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-neutral-200

            transition

            hover:-translate-y-1
            hover:border-blue-600
            hover:text-blue-600

            dark:border-neutral-800
            "
          >
            <Mail size={18} />
          </Link>
        </div>
      </motion.div>

      {/* COPYRIGHT */}

      <div
        className="
        mx-auto
        mt-8
        max-w-7xl
        border-t
        border-neutral-200
        px-4
        pt-6
        text-center
        text-sm
        text-neutral-500

        dark:border-neutral-800

        sm:px-6
        lg:px-8
        "
      >
        © 2026 BookFlow. All rights reserved.
      </div>
    </footer>
  );
}
