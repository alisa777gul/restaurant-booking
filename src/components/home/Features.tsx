'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Users, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: CalendarDays,
      title: 'Smart Calendar',
      text: 'Manage your schedule with real-time availability and automated bookings.',
    },

    {
      icon: Users,
      title: 'Client Management',
      text: 'Keep customer information organized and accessible in one place.',
    },

    {
      icon: Zap,
      title: 'Automation',
      text: 'Save hours every week with powerful workflows and smart tools.',
    },
  ];

  return (
    <section
      id="features"
      className="
      bg-neutral-50
      py-20
      dark:bg-neutral-950
      sm:py-32
      "
    >
      <div
        className="
        mx-auto
        max-w-7xl
        px-4
        sm:px-6
        lg:px-8
        "
      >
        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
          max-w-3xl
          text-center
          "
        >
          <span
            className="
            inline-flex
            rounded-full
            bg-blue-500/10
            px-4
            py-2
            text-sm
            font-semibold
            text-blue-600
            dark:text-blue-400
            "
          >
            Powerful features
          </span>

          <h2
            className="
            mt-6
            text-3xl
            font-bold
            tracking-tight
            sm:text-5xl
            "
          >
            Everything you need
            <br />
            to manage bookings
          </h2>

          <p
            className="
            mx-auto
            mt-5
            max-w-xl
            text-neutral-500
            dark:text-neutral-400
            "
          >
            A complete platform for appointments, clients and business growth.
          </p>
        </motion.div>

        {/* CARDS */}

        <div
          className="
          mt-14
          grid
          gap-6
          md:grid-cols-3
          "
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}

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
                  duration: 0.5,
                  delay: index * 0.15,
                }}

                whileHover={{
                  y: -10,
                }}

                className="
                group
                rounded-3xl
                border
                border-neutral-200
                bg-white
                p-7
                shadow-sm
                transition-all
                duration-300

                hover:shadow-xl

                dark:border-neutral-800
                dark:bg-neutral-900
                "
              >
                {/* ICON */}

                <div
                  className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-500/10
                  text-blue-600
                  transition
                  duration-300

                  group-hover:scale-110

                  dark:text-blue-400
                  "
                >
                  <Icon size={28} strokeWidth={2} />
                </div>

                {/* TITLE */}

                <h3
                  className="
                  mt-6
                  text-xl
                  font-bold
                  "
                >
                  {item.title}
                </h3>

                {/* TEXT */}

                <p
                  className="
                  mt-3
                  leading-relaxed
                  text-neutral-500
                  dark:text-neutral-400
                  "
                >
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
