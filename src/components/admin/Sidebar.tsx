"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  Settings,
  ChartColumn,
  BookOpen,
} from "lucide-react";

const links = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Reservations",
    href: "/admin/reservations",
    icon: BookOpen,
  },
  {
    title: "Calendar",
    href: "/admin/calendar",
    icon: CalendarDays,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: ChartColumn,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-neutral-800 bg-[#111] flex flex-col">
      <div className="p-8 border-b border-neutral-800">
        <h1 className="text-2xl font-bold">
          🍽 Restaurant
        </h1>

        <p className="text-neutral-500 text-sm mt-2">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 p-5 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-4 rounded-xl px-5 py-4 hover:bg-neutral-800 transition"
            >
              <Icon size={20} />

              {link.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}