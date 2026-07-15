"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react";



const links = [

  {
    title:"Dashboard",
    href:"/admin/dashboard",
    icon:LayoutDashboard,
  },

  {
    title:"Reservations",
    href:"/admin/reservations",
    icon:BookOpen,
  },

  {
    title:"Calendar",
    href:"/admin/calendar",
    icon:CalendarDays,
  },

 

];





export default function Sidebar(){


const pathname = usePathname();

const router = useRouter();


const [open,setOpen] = useState(false);





async function logout(){


await fetch(
"/api/admin/logout",
{
method:"POST"
}
);


router.replace(
"/admin/login"
);


router.refresh();


}






return (

<>


{/* MOBILE BUTTON */}


<button

onClick={()=>setOpen(true)}

className="
lg:hidden

fixed

top-4

left-4

z-50

bg-neutral-900

border

border-neutral-800

p-3

rounded-xl

"

>

<Menu size={22}/>

</button>








{/* OVERLAY */}


{
open && (

<div

onClick={()=>setOpen(false)}

className="
fixed
inset-0

bg-black/60

z-40

lg:hidden

"

/>

)

}








<aside


className={`

fixed

lg:static


top-0

left-0


z-50


h-screen


w-72


bg-[#111]


border-r

border-neutral-800


flex

flex-col



transition-transform

duration-300



${

open

?

"translate-x-0"

:

"-translate-x-full lg:translate-x-0"

}


`}

>







{/* HEADER */}



<div

className="
p-6

border-b

border-neutral-800

flex

justify-between

items-start

"

>


<div>

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
text-sm
text-neutral-500
mt-1
"

>

Admin Panel

</p>


</div>





<button

onClick={()=>setOpen(false)}

className="
lg:hidden
text-neutral-400
"

>

<X size={24}/>

</button>



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

onClick={()=>setOpen(false)}


className={`

flex

items-center

gap-4


rounded-xl


px-5

py-4


transition



${

active

?

"bg-yellow-500 text-black font-semibold"

:

"text-neutral-300 hover:bg-neutral-800"

}

`}

>


<Icon size={20}/>


<span>
{link.title}
</span>


</Link>


)


})

}


</nav>









{/* USER */}



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

<p className="font-semibold">
Admin
</p>


<p className="text-xs text-neutral-500">
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



</>

);

}