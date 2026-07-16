'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '€0',
      description: 'Perfect for trying BookFlow.',
      features: ['Basic booking system', 'Up to 50 appointments', 'Client management'],
    },

    {
      name: 'Starter',
      price: '€19',
      description: 'For small businesses growing online.',
      popular: true,
      features: [
        'Unlimited bookings',
        'Calendar management',
        'Customer database',
        'Email notifications',
      ],
    },

    {
      name: 'Business',
      price: '€49',
      description: 'For professional teams.',
      features: [
        'Everything in Starter',
        'Advanced analytics',
        'Team accounts',
        'Priority support',
      ],
    },
  ];

  return (
    <section
      id="pricing"
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
        {/* TITLE */}

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
          <p
            className="
            font-semibold
            text-blue-600
            dark:text-blue-400
            "
          >
            Pricing
          </p>

          <h2
            className="
            mt-4
            text-3xl
            font-bold
            tracking-tight
            sm:text-5xl
            "
          >
            Simple pricing.
            <br />
            Built for growth.
          </h2>

          <p
            className="
            mt-5
            text-neutral-500
            dark:text-neutral-400
            "
          >
            Choose the plan that fits your business needs.
          </p>
        </motion.div>

        {/* CARDS */}

        <div
          className="
          mt-12
          grid
          gap-6
          md:grid-cols-3
          "
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}

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
                delay: index * 0.15,
              }}

              whileHover={{
                y: -8,
              }}

              className={`
              
              relative
              rounded-3xl
              border
              bg-white
              p-7
              shadow-sm
              transition

              dark:bg-neutral-900

              ${
                plan.popular
                  ? `
                border-blue-600
                shadow-xl
                shadow-blue-500/20
                `
                  : `
                border-neutral-200
                dark:border-neutral-800
                `
              }

              `}
            >
              {plan.popular && (
                <div
                  className="
                  absolute
                  -top-4
                  left-1/2
                  -translate-x-1/2
                  rounded-full
                  bg-blue-600
                  px-4
                  py-1
                  text-xs
                  font-semibold
                  text-white
                  "
                >
                  Most popular
                </div>
              )}

              <h3
                className="
                text-xl
                font-bold
                "
              >
                {plan.name}
              </h3>

              <p
                className="
                mt-2
                text-sm
                text-neutral-500
                dark:text-neutral-400
                "
              >
                {plan.description}
              </p>

              <div
                className="
                mt-6
                flex
                items-end
                gap-2
                "
              >
                <span
                  className="
                  text-5xl
                  font-bold
                  "
                >
                  {plan.price}
                </span>

                <span
                  className="
                  mb-2
                  text-sm
                  text-neutral-500
                  "
                >
                  /month
                </span>
              </div>

              <ul
                className="
                mt-8
                space-y-4
                "
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    "
                  >
                    <span
                      className="
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-500/10
                      text-blue-600
                      "
                    >
                      <Check size={14} />
                    </span>

                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/admin/login"

                className="
                mt-8
                block
                rounded-xl
                bg-blue-600
                py-3
                text-center
                font-semibold
                text-white
                transition
                hover:bg-blue-700
                "
              >
                Get started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
