'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      className="
      relative
      flex
      min-h-screen
      items-center
      overflow-visible
      pt-24
      "
    >
      {/* GLOW */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
        }}
        className="
        absolute
        left-1/2
        top-20
        -translate-x-1/2

        h-[350px]
        w-[350px]

        rounded-full

        bg-blue-500/20

        blur-[120px]

        sm:h-[700px]
        sm:w-[700px]
        "
      />

      <div
        className="
        relative
        mx-auto
        grid
        max-w-7xl
        items-center
        gap-16
        px-4

        sm:px-6

        lg:grid-cols-2

        lg:px-8
        "
      >
        {/* LEFT SIDE */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.8,
          }}
        >
          <div
            className="
            inline-flex
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
            ✨ Smart booking platform
          </div>

          <h1
            className="
            mt-6

            text-4xl
            font-bold

            leading-[1.05]

            tracking-tight

            sm:text-6xl

            lg:text-7xl
            "
          >
            Run your business.
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
              Without chaos.
            </span>
          </h1>

          <p
            className="
            mt-6

            max-w-xl

            text-base

            leading-relaxed

            text-neutral-500

            sm:text-lg

            dark:text-neutral-400
            "
          >
            BookFlow helps salons, clinics and professionals manage appointments, clients and
            schedules in one beautiful platform.
          </p>

          <div
            className="
            mt-8

            flex

            flex-col

            gap-4

            sm:flex-row
            "
          >
            <Link
              href="/admin/login"
              className="
              rounded-2xl

              bg-blue-600

              px-8

              py-4

              text-center

              font-semibold

              text-white

              shadow-xl

              shadow-blue-500/30

              transition

              hover:scale-105
              "
            >
              Create workspace
            </Link>

            <Link
              href="/reservation"
              className="
              rounded-2xl

              border

              border-neutral-300

              px-8

              py-4

              text-center

              font-semibold

              transition

              hover:bg-neutral-100

              dark:border-neutral-700

              dark:hover:bg-neutral-900
              "
            >
              Live demo
            </Link>
          </div>
        </motion.div>

        {/* RIGHT DASHBOARD */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.95,
          }}

          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}

          transition={{
            duration: 0.9,
            delay: 0.2,
          }}

          className="
          relative

          mt-12

          pb-16

          lg:mt-0
          "
        >
          {/* FLOAT CARD */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}

            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}

            className="
            absolute

            -right-2

            -top-8

            z-20

            rounded-2xl

            border

            border-neutral-200

            bg-white

            p-4

            shadow-2xl

            dark:border-neutral-800

            dark:bg-neutral-900

            sm:right-0
            "
          >
            <p className="text-xs text-neutral-500">Today bookings</p>

            <p className="mt-1 text-3xl font-bold">24</p>

            <p className="text-xs font-semibold text-green-500">↑ 18% this week</p>
          </motion.div>

          {/* DASHBOARD */}

          <div
            className="
            rounded-3xl

            border

            border-neutral-200

            bg-white/80

            p-4

            shadow-2xl

            backdrop-blur-xl

            dark:border-neutral-800

            dark:bg-neutral-950/80

            sm:p-6
            "
          >
            <div
              className="
              mb-6

              flex

              items-center

              justify-between
              "
            >
              <div>
                <p className="text-xs text-neutral-500">Dashboard</p>

                <h2 className="text-xl font-bold">Schedule</h2>
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

                font-bold

                text-white
                "
              >
                B
              </div>
            </div>

            <div
              className="
            grid
            grid-cols-3
            gap-3
            "
            >
              {[
                ['Bookings', '128'],
                ['Clients', '542'],
                ['Revenue', '€8.4k'],
              ].map((item) => (
                <div
                  key={item[0]}
                  className="
                  rounded-2xl
                  bg-neutral-100
                  p-3
                  dark:bg-neutral-900
                  "
                >
                  <p className="text-xs text-neutral-500">{item[0]}</p>

                  <p className="mt-2 font-bold">{item[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
