"use client";

import { Menu } from "lucide-react";


export default function Topbar({
setOpen,
}:{
setOpen:(value:boolean)=>void;
}) {


return (

<header
className="
sticky
top-0
z-30

h-16
sm:h-20

flex
items-center
justify-between

px-4
sm:px-6
lg:px-10

border-b
border-neutral-200
dark:border-neutral-800

bg-white/80
dark:bg-neutral-950/80

backdrop-blur-xl
"
>



<div className="flex items-center gap-4">


<button

onClick={()=>setOpen(true)}

className="
lg:hidden

w-10
h-10

flex
items-center
justify-center

rounded-xl

bg-white
dark:bg-neutral-900

border
border-neutral-200
dark:border-neutral-800

shadow-sm

"

>

<Menu size={22}/>

</button>



<div>

<h1
className="
text-lg
sm:text-2xl

font-bold

text-neutral-900
dark:text-white
"
>
BookFlow
</h1>


<p
className="
hidden
sm:block

text-sm
text-neutral-500
"
>
Booking management platform
</p>


</div>


</div>





<div>

<div
className="
w-9
h-9

sm:w-10
sm:h-10

rounded-2xl

bg-linear-to-br
from-blue-500
to-indigo-600

flex
items-center
justify-center

text-white
font-bold
"
>
A
</div>


</div>



</header>


);

}