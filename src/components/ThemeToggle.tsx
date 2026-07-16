'use client';

import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '@/components/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}

      aria-label="Toggle theme"

      className="
w-10
h-10
rounded-full
border
border-neutral-200
dark:border-neutral-800
flex
items-center
justify-center
hover:scale-105
transition
bg-white
dark:bg-neutral-900
"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
