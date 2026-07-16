"use client";

import {
  X,
  Phone,
  Mail,
  CalendarDays,
  Clock,
  Users,
  Check,
  Ban,
  Trash2,
} from "lucide-react";


type Reservation = {
  id:number;
  name:string;
  phone:string;
  email:string;
  date:string;
  time:string;
  guests:string;
  status:string;
};


type Props = {
  reservation:Reservation;

  onClose:()=>void;

  onUpdate:(id:number,status:string)=>void;

  onDelete:(id:number)=>void;
};



export default function ReservationModal({

reservation,

onClose,

onUpdate,

onDelete,

}:Props){



return (

<div

className="
fixed
inset-0

z-50

flex
items-center
justify-center

p-4

bg-black/60

backdrop-blur-md
"

>


<div

className="
relative

w-full

max-w-xl

rounded-3xl

border

border-neutral-200
dark:border-neutral-800

bg-white
dark:bg-neutral-950

shadow-2xl

overflow-hidden

"

>





{/* HEADER */}


<div

className="
flex
items-start
justify-between

p-6
sm:p-8

border-b

border-neutral-200
dark:border-neutral-800
"

>


<div>


<p
className="
text-sm
text-neutral-500
"
>
Reservation
</p>


<h2

className="
mt-1

text-2xl

font-bold

tracking-tight
"

>

Reservation details

</h2>


</div>





<button

onClick={onClose}

className="
w-10
h-10

rounded-xl

flex
items-center
justify-center

bg-neutral-100
dark:bg-neutral-900

text-neutral-500

hover:text-red-500

transition
"

>

<X size={20}/>

</button>


</div>







{/* CONTENT */}



<div

className="
p-6
sm:p-8

space-y-6
"

>





{/* CLIENT */}


<div

className="
rounded-2xl

bg-neutral-100
dark:bg-neutral-900

p-5
"

>


<div
className="
flex
items-center
gap-4
"
>


<div

className="
w-14
h-14

rounded-2xl

bg-blue-500/10

text-blue-500

flex
items-center
justify-center

font-bold

text-xl

"

>

{
reservation.name
.charAt(0)
.toUpperCase()
}

</div>



<div>


<h3

className="
text-lg

font-bold
"

>

{reservation.name}

</h3>


<div

className="
flex
items-center
gap-2

text-sm

text-neutral-500

mt-1
"

>

<Phone size={14}/>

{reservation.phone}

</div>


</div>



</div>


</div>







{/* INFO GRID */}


<div

className="
grid

grid-cols-1

sm:grid-cols-2

gap-4

"

>



<Info

icon={<Mail size={17}/>}

title="Email"

value={reservation.email}

/>



<Info

icon={<CalendarDays size={17}/>}

title="Date"

value={reservation.date}

/>



<Info

icon={<Clock size={17}/>}

title="Time"

value={reservation.time}

/>



<Info

icon={<Users size={17}/>}

title="Guests"

value={reservation.guests}

/>



</div>








{/* STATUS */}


<div

className="
flex

items-center

justify-between

rounded-2xl

border

border-neutral-200
dark:border-neutral-800

p-4

"

>


<span
className="
text-sm
text-neutral-500
"
>
Status
</span>



<span

className={`

px-4
py-2

rounded-full

text-sm

font-semibold


${
reservation.status==="CONFIRMED"

?

"bg-green-500/10 text-green-500"

:

reservation.status==="CANCELLED"

?

"bg-red-500/10 text-red-500"

:

"bg-yellow-500/10 text-yellow-500"

}

`}

>

{reservation.status}

</span>


</div>








{/* ACTIONS */}



<div

className="
grid

grid-cols-1

sm:grid-cols-3

gap-3

pt-2

"

>



<button

onClick={()=>onUpdate(
reservation.id,
"CONFIRMED"
)}

className="
flex
items-center
justify-center
gap-2

rounded-2xl

bg-green-600

hover:bg-green-500

text-white

py-3.5

font-semibold

transition

"

>

<Check size={18}/>

Confirm

</button>






<button

onClick={()=>onUpdate(
reservation.id,
"CANCELLED"
)}

className="
flex
items-center
justify-center
gap-2

rounded-2xl

bg-red-600

hover:bg-red-500

text-white

py-3.5

font-semibold

transition

"

>

<Ban size={18}/>

Cancel

</button>







<button

onClick={()=>onDelete(
reservation.id
)}

className="
flex
items-center
justify-center
gap-2

rounded-2xl

bg-neutral-200

dark:bg-neutral-800

hover:bg-neutral-300

dark:hover:bg-neutral-700

py-3.5

font-semibold

transition

"

>

<Trash2 size={18}/>

Delete

</button>





</div>





</div>


</div>


</div>


);

}







function Info({

icon,

title,

value,

}:{

icon:React.ReactNode;

title:string;

value:string;

}){


return (

<div

className="
rounded-2xl

border

border-neutral-200
dark:border-neutral-800

p-4

"

>


<div

className="
flex
items-center
gap-2

text-neutral-500

text-sm

mb-2

"

>

{icon}

{title}

</div>



<p

className="
font-medium

break-all
"

>

{value}

</p>


</div>

);


}