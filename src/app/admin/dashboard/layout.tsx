"use client";

import { useState } from "react";

import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";


export default function AdminLayout({
  children,
}:{
  children:React.ReactNode;
}) {


const [open,setOpen] = useState(false);



return (

<div
className="
h-screen
flex
overflow-hidden
bg-white
dark:bg-neutral-950
"
>


<Sidebar
open={open}
setOpen={setOpen}
/>



<div
className="
flex-1
flex
flex-col
min-w-0
"
>


<Topbar
setOpen={setOpen}
/>



<main
className="
flex-1
overflow-y-auto
p-4
sm:p-6
lg:p-8
"
>

{children}

</main>



</div>


</div>

);

}