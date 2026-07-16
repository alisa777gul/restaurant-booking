'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section
      id="contact"
      className="
      relative
      overflow-hidden
      px-4
      py-24
      sm:py-32
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
        absolute
        left-1/2
        top-1/2
        -z-10
        h-[400px]
        w-[400px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-blue-500/20
        blur-[120px]
        sm:h-[600px]
        sm:w-[600px]
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        viewport={{
          once: true,
        }}

        transition={{
          duration: 0.7,
        }}

        className="
        mx-auto
        max-w-4xl
        rounded-3xl
        border
        border-neutral-200
        bg-white/70
        px-6
        py-12
        text-center
        shadow-2xl
        backdrop-blur-xl

        dark:border-neutral-800
        dark:bg-neutral-900/70

        sm:px-12
        sm:py-16
        "
      >
        {/* BADGE */}

        <motion.div
          animate={{
            y: [0, -5, 0],
          }}

          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}

          className="
          mx-auto
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-blue-500/10
          px-4
          py-2
          text-sm
          font-medium
          text-blue-600
          dark:text-blue-400
          "
        >
          <Sparkles size={16} />
          Start your journey
        </motion.div>

        <h2
          className="
          mt-6
          text-4xl
          font-bold
          tracking-tight

          sm:text-6xl
          "
        >
          Ready to simplify
          <br />
          <span
            className="
            bg-gradient-to-r
            from-blue-600
            to-indigo-500
            bg-clip-text
            text-transparent
            "
          >
            your bookings?
          </span>
        </h2>

        <p
          className="
          mx-auto
          mt-5
          max-w-xl
          text-base
          leading-relaxed
          text-neutral-500

          dark:text-neutral-400

          sm:text-lg
          "
        >
          Create your workspace and manage appointments, clients and schedules in one powerful
          platform.
        </p>

        <div
          className="
          mt-8
          flex
          flex-col
          justify-center
          gap-4

          sm:flex-row
          "
        >
          <Link
            href="/admin/login"

            className="
            inline-flex
            items-center
            justify-center
            gap-2

            rounded-2xl

            bg-blue-600

            px-8
            py-4

            font-semibold

            text-white

            shadow-xl
            shadow-blue-500/30

            transition

            hover:scale-105
            hover:bg-blue-700
            "
          >
            Start for free
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/reservation"

            className="
            inline-flex
            items-center
            justify-center

            rounded-2xl

            border
            border-neutral-300

            px-8
            py-4

            font-semibold

            transition

            hover:bg-neutral-100

            dark:border-neutral-700

            dark:hover:bg-neutral-800
            "
          >
            Live demo
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
