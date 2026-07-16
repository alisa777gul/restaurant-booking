'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    if (loading) return;

    try {
      setLoading(true);

      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      router.replace('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={logout}
      disabled={loading}

      className="
      group

      w-full

      flex
      items-center
      justify-center
      gap-3

      rounded-2xl

      px-5
      py-3.5

      font-medium

      text-red-500

      bg-red-500/5

      border
      border-red-500/10

      hover:bg-red-500/10
      hover:border-red-500/20

      transition-all
      duration-300

      disabled:opacity-50
      disabled:cursor-not-allowed
      "
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <LogOut
          size={18}
          className="
            group-hover:translate-x-1
            transition
            "
        />
      )}

      {loading ? 'Signing out...' : 'Logout'}
    </button>
  );
}
