'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { CalendarDays, BookOpen, LogOut, X, Settings, Users, LayoutDashboard } from 'lucide-react';

const links = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Reservations',
    href: '/admin/dashboard/reservations',
    icon: BookOpen,
  },
  {
    title: 'Calendar',
    href: '/admin/dashboard/calendar',
    icon: CalendarDays,
  },
  {
    title: 'Services',
    href: '/admin/dashboard/services',
    icon: Users,
  },
  {
    title: 'Settings',
    href: '/admin/dashboard/settings',
    icon: Settings,
  },
];

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', {
      method: 'POST',
    });

    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
fixed
inset-0
z-40
bg-black/50
backdrop-blur-sm
lg:hidden
"
        />
      )}

      <aside
        className={`
fixed
lg:static
top-0
left-0
z-50

w-72
h-full
overflow-y-auto
flex
flex-col

bg-white
dark:bg-neutral-950

border-r
border-neutral-200
dark:border-neutral-800

transition-transform
duration-300

${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}

`}
      >
        <div
          className="
h-20
px-6
flex
items-center
justify-between

border-b
border-neutral-200
dark:border-neutral-800
"
        >
          <div>
            <h1 className="text-2xl font-bold">BookFlow</h1>

            <p className="text-sm text-neutral-500">Booking platform</p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="
lg:hidden
text-neutral-500
"
          >
            <X size={22} />
          </button>
        </div>

        <nav
          className="
flex-1
p-5
space-y-2
"
        >
          {links.map((link) => {
            const Icon = link.icon;

            const active = pathname === link.href;

            return (
              <Link
                key={link.href}

                href={link.href}

                onClick={() => setOpen(false)}

                className={`
flex
items-center
gap-3

px-4
py-3

rounded-2xl

font-medium

transition

${
  active
    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
}

`}
              >
                <Icon size={20} />

                {link.title}
              </Link>
            );
          })}
        </nav>

        <div
          className="
p-5

border-t
border-neutral-200
dark:border-neutral-800
"
        >
          <div
            className="
rounded-2xl
bg-neutral-100
dark:bg-neutral-900

p-4

mb-4
"
          >
            <p className="font-semibold">Admin</p>

            <p className="text-xs text-neutral-500 mt-1">Workspace owner</p>
          </div>

          <button
            onClick={logout}

            className="
w-full

flex
items-center
gap-3

px-4
py-3

rounded-2xl

text-red-500

hover:bg-red-500/10

transition
"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
