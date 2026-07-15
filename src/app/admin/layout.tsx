"use client";


import { usePathname } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";



export default function AdminLayout({

  children,

}: {

  children: React.ReactNode;

}) {



  const pathname = usePathname();



  const isLoginPage =
    pathname === "/admin/login";



  // login без sidebar и topbar

  if (isLoginPage) {

    return (
      <>
        {children}
      </>
    );

  }




  return (

    <div
      className="
      flex
      min-h-screen
      bg-[#0b0b0b]
      text-white
      "
    >



      <Sidebar />




      <div
        className="
        flex-1
        min-w-0
        "
      >



        <Topbar />




        <main
          className="
          p-8
          "
        >

          {children}

        </main>



      </div>



    </div>

  );

}