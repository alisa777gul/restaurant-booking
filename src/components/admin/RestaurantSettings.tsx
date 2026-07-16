'use client';

import { useEffect, useState } from 'react';

export default function RestaurantSettings() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setForm(data);
        }
      });
  }, []);

  function change(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  async function save() {
    setSaving(true);

    await fetch('/api/admin/settings', {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(form),
    });

    setSaving(false);
  }

  return (
    <section
      className="
bg-white
dark:bg-neutral-950

border
border-neutral-200
dark:border-neutral-800

rounded-3xl

p-6

"
    >
      <h2
        className="
text-xl
font-bold
mb-6
"
      >
        Restaurant information
      </h2>

      <div
        className="
grid
sm:grid-cols-2
gap-4
"
      >
        {[
          ['name', 'Restaurant name'],
          ['phone', 'Phone'],
          ['email', 'Email'],
          ['address', 'Address'],
        ].map(([name, label]) => (
          <div key={name}>
            <label
              className="
text-sm
text-neutral-500
"
            >
              {label}
            </label>

            <input
              name={name}

              value={(form as any)[name]}

              onChange={change}

              className="
mt-2

w-full

rounded-xl

px-4
py-3

bg-neutral-100
dark:bg-neutral-900

border
border-neutral-200
dark:border-neutral-800

outline-none

"
            />
          </div>
        ))}
      </div>

      <button
        onClick={save}

        className="
mt-6

bg-blue-600

text-white

px-6

py-3

rounded-2xl

font-semibold

"
      >
        {saving ? 'Saving...' : 'Save changes'}
      </button>
    </section>
  );
}
