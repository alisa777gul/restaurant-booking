'use client';

import { motion } from 'framer-motion';
import { Rocket, Settings, CalendarCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Rocket,
      title: 'Create your workspace',
      text: 'Set up your business profile and prepare everything in minutes.',
    },

    {
      number: '02',
      icon: Settings,
      title: 'Add services and availability',
      text: 'Configure your services, working hours and booking rules.',
    },

    {
      number: '03',
      icon: CalendarCheck,
      title: 'Accept online bookings',
      text: 'Let your customers book appointments anytime, anywhere.',
    },
  ];

  return (
    <section
      className="
      py-20
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
        <div
          className="
          grid
          items-center
          gap-12
          lg:grid-cols-2
          "
        >
          {/* LEFT SIDE */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.6,
            }}
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
              Simple process
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
              Start in minutes,
              <br />
              grow forever.
            </h2>

            <p
              className="
              mt-5
              max-w-lg
              leading-relaxed
              text-neutral-500
              dark:text-neutral-400
              "
            >
              Create your workspace, add services and start accepting bookings. Everything you need
              to grow your business.
            </p>
          </motion.div>

          {/* RIGHT SIDE */}

          <div
            className="
            relative
            space-y-5
            "
          >
            {/* CONNECTING LINE */}

            <div
              className="
              absolute
              left-7
              top-8
              hidden
              h-[75%]
              w-px
              bg-neutral-200
              dark:bg-neutral-800
              sm:block
              "
            />

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}

                  initial={{
                    opacity: 0,
                    x: 40,
                  }}

                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}

                  whileHover={{
                    y: -5,
                  }}

                  className="
                  relative
                  flex
                  gap-5
                  rounded-3xl
                  border
                  border-neutral-200
                  bg-white
                  p-5
                  transition
                  hover:shadow-xl

                  dark:border-neutral-800
                  dark:bg-neutral-900
                  "
                >
                  {/* ICON */}

                  <div
                    className="
                    relative
                    z-10
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-600
                    text-white
                    shadow-lg
                    shadow-blue-500/30
                    "
                  >
                    <Icon size={26} strokeWidth={2} />
                  </div>

                  <div>
                    <div
                      className="
                      flex
                      items-center
                      gap-3
                      "
                    >
                      <span
                        className="
                        text-sm
                        font-bold
                        text-blue-600
                        dark:text-blue-400
                        "
                      >
                        {step.number}
                      </span>

                      <h3
                        className="
                        text-lg
                        font-bold
                        "
                      >
                        {step.title}
                      </h3>
                    </div>

                    <p
                      className="
                      mt-2
                      leading-relaxed
                      text-neutral-500
                      dark:text-neutral-400
                      "
                    >
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
