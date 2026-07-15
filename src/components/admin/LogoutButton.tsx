"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LogoutButton() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);



  async function logout() {

    if (loading) return;


    try {

      setLoading(true);


      const response = await fetch(
        "/api/admin/logout",
        {
          method: "POST",
        }
      );


      if (!response.ok) {

        throw new Error(
          "Logout failed"
        );

      }



      router.replace(
        "/admin/login"
      );


      router.refresh();



    } catch(error) {

      console.error(
        "Logout error:",
        error
      );


    } finally {

      setLoading(false);

    }

  }




  return (

    <button

      onClick={logout}

      disabled={loading}

      className="
        rounded-xl
        bg-red-600
        text-white

        px-5
        py-3

        font-semibold

        hover:bg-red-700

        transition

        disabled:opacity-50
        disabled:cursor-not-allowed
      "

    >

      {
        loading
        ? "Logging out..."
        : "Logout"
      }


    </button>

  );

}