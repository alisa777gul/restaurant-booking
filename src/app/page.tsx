import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";


export default function Home(){

return (

<main
className="
min-h-screen
overflow-hidden
bg-linear-to-b
from-white
via-neutral-50
to-neutral-100

dark:from-[#050505]
dark:via-[#09090b]
dark:to-[#111]

text-neutral-900
dark:text-white
"
>



{/* HEADER */}

<header
className="
max-w-7xl
mx-auto
px-5
sm:px-8
py-6
flex
items-center
justify-between
"
>


<div
className="
text-2xl
font-bold
tracking-tight
"
>
BookFlow
</div>



<nav
className="
hidden
md:flex
gap-10
text-sm
text-neutral-500
dark:text-neutral-400
"
>

<a className="hover:text-black dark:hover:text-white transition">
Features
</a>

<a className="hover:text-black dark:hover:text-white transition">
Pricing
</a>

<a className="hover:text-black dark:hover:text-white transition">
Contact
</a>


</nav>





<div
className="
flex
items-center
gap-3
"
>


<ThemeToggle />



<Link
href="/login"
className="
px-4
py-2
rounded-full
text-sm
hover:bg-neutral-200
dark:hover:bg-neutral-800
transition
"
>
Login
</Link>



<Link
href="/register"
className="
rounded-full
bg-black
dark:bg-white
text-white
dark:text-black
px-5
py-2.5
text-sm
font-semibold
transition
hover:scale-105
"
>
Get started
</Link>


</div>



</header>








{/* HERO */}


<section
className="
relative
max-w-7xl
mx-auto
px-5
sm:px-8
pt-20
pb-32
"
>


<div
className="
absolute
top-20
right-0
w-125
h-125
bg-blue-500/20
blur-[120px]
rounded-full
"
/>



<div
className="
relative
grid
lg:grid-cols-2
gap-16
items-center
"
>





<div>


<div
className="
inline-flex
rounded-full
px-4
py-2
bg-blue-500/10
text-blue-600
dark:text-blue-400
text-sm
"
>
✨ Smart booking platform
</div>




<h1
className="
mt-8
text-5xl
sm:text-6xl
lg:text-7xl
font-bold
tracking-tight
leading-none
"
>

Manage bookings.
<br/>

Grow your business.

</h1>




<p
className="
mt-6
max-w-xl
text-lg
text-neutral-500
dark:text-neutral-400
leading-relaxed
"
>

One powerful booking system for salons,
clinics, restaurants and professionals.
Automate schedules, clients and payments.

</p>





<div
className="
mt-10
flex
flex-wrap
gap-4
"
>


<Link
href="/register"
className="
rounded-2xl
bg-blue-600
text-white
px-8
py-4
font-semibold
shadow-xl
shadow-blue-500/20
hover:scale-105
transition
"
>
Start free
</Link>



<Link
href="/reservation"
className="
rounded-2xl
border
border-neutral-300
dark:border-neutral-700
px-8
py-4
hover:bg-neutral-100
dark:hover:bg-neutral-900
transition
"
>
Live demo
</Link>


</div>


</div>









{/* APP PREVIEW */}


<div
className="
relative
"
>




<div
className="
absolute
-top-6
right-4
z-10
rounded-2xl
bg-white
dark:bg-neutral-900
border
border-neutral-200
dark:border-neutral-800
shadow-xl
px-5
py-4
"
>


<p className="
text-xs
text-neutral-500
">
Today&apos;s bookings
</p>


<p className="
text-3xl
font-bold
">
24
</p>


</div>







<div
className="
rounded-3xl
border
border-neutral-200
dark:border-neutral-800

bg-white/80
dark:bg-neutral-950/80

backdrop-blur-xl

shadow-2xl

p-6
"
>



<div
className="
flex
justify-between
mb-8
"
>

<div>

<p className="text-sm text-neutral-500">
Dashboard
</p>


<h2 className="
text-xl
font-bold
">
Schedule
</h2>


</div>



<div
className="
w-10
h-10
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
font-bold
"
>
B
</div>


</div>







<div
className="
grid
grid-cols-3
gap-3
mb-6
"
>


{
[
["Bookings","128"],
["Clients","542"],
["Revenue","€8.4k"]

].map(item=>(


<div
key={item[0]}
className="
rounded-2xl
bg-neutral-100
dark:bg-neutral-900
p-4
"
>

<p className="text-xs text-neutral-500">
{item[0]}
</p>

<p className="font-bold mt-2">
{item[1]}
</p>


</div>


))

}


</div>








<div
className="
rounded-2xl
border
border-neutral-200
dark:border-neutral-800
p-4
"
>


<p className="font-semibold mb-4">
Today&apos;s schedule
</p>




{
[
["09:00","Anna Smith"],
["11:30","Michael Brown"],
["15:00","Sarah Wilson"]

].map(item=>(


<div
key={item[0]}
className="
flex
justify-between
items-center
bg-neutral-100
dark:bg-neutral-900
rounded-xl
px-4
py-3
mb-3
"
>


<div>

<p className="font-medium">
{item[1]}
</p>


<p className="text-xs text-neutral-500">
{item[0]}
</p>


</div>



<span
className="
text-green-500
text-xs
font-semibold
"
>
Confirmed
</span>


</div>


))

}



</div>






</div>





<div
className="
absolute
-bottom-5
-left-5
rounded-2xl
bg-blue-600
text-white
px-6
py-4
shadow-xl
"
>

<p className="text-xs opacity-80">
Growth
</p>

<p className="text-xl font-bold">
+42%
</p>


</div>






</div>





</div>


</section>





</main>

)

}