"use client";


import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  CalendarDays,
  Settings,
  ChartColumn,
  BookOpen,
  LogOut,
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


  const pathname = usePathname();

  const router = useRouter();




  async function logout(){


    await fetch(
      "/api/admin/logout",
      {
        method:"POST",
      }
    );


    router.push(
      "/admin/login"
    );


    router.refresh();


  }





  return (


    <aside
      className="
      w-72
      min-h-screen
      bg-[#111]
      border-r
      border-neutral-800
      flex
      flex-col
      "
    >




      {/* LOGO */}


      <div
        className="
        p-8
        border-b
        border-neutral-800
        "
      >


        <h1
          className="
          text-2xl
          font-bold
          "
        >

          🍽 Restaurant

        </h1>



        <p
          className="
          text-neutral-500
          text-sm
          mt-2
          "
        >

          Admin Panel

        </p>


      </div>






      {/* MENU */}


      <nav
        className="
        flex-1
        p-5
        space-y-2
        "
      >


        {
          links.map((link)=>{


            const Icon = link.icon;


            const active =
              pathname === link.href;



            return (


              <Link

                key={link.href}

                href={link.href}


                className={`
                
                flex
                items-center
                gap-4
                rounded-xl
                px-5
                py-4
                transition
                duration-200
                
                ${
                  active

                  ?

                  "bg-yellow-500 text-black font-semibold"

                  :

                  "text-neutral-300 hover:bg-neutral-800 hover:text-white"

                }

                `}

              >


                <Icon size={20}/>


                <span>

                  {link.title}

                </span>


              </Link>


            );


          })
        }



      </nav>








      {/* USER / LOGOUT */}


      <div
        className="
        p-5
        border-t
        border-neutral-800
        "
      >



        <div
          className="
          mb-4
          px-4
          py-3
          rounded-xl
          bg-neutral-900
          "
        >


          <p
            className="
            text-sm
            font-semibold
            "
          >

            Admin

          </p>



          <p
            className="
            text-xs
            text-neutral-500
            "
          >

            Restaurant manager

          </p>



        </div>






        <button

          onClick={logout}


          className="
          w-full
          flex
          items-center
          gap-4
          rounded-xl
          px-5
          py-4
          text-red-400
          hover:bg-red-500/10
          transition
          "

        >


          <LogOut size={20}/>


          Logout


        </button>




      </div>





    </aside>


  );

}