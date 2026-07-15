"use client";

import { X } from "lucide-react";


type Reservation = {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  status: string;
};


type Props = {
  reservation: Reservation;
  onClose: () => void;
  onUpdate: (id:number, status:string)=>void;
  onDelete: (id:number)=>void;
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
bg-black/70
backdrop-blur-sm
flex
items-center
justify-center
z-50
px-4
"
>


<div
className="
bg-[#111]
border
border-neutral-800
rounded-3xl
w-full
max-w-lg
p-8
shadow-2xl
"
>


<div
className="
flex
justify-between
items-center
mb-8
"
>


<h2 className="
text-2xl
font-bold
">
Reservation details
</h2>


<button
onClick={onClose}
className="
text-neutral-400
hover:text-white
transition
"
>

<X size={24}/>

</button>


</div>





<div className="space-y-5">



<div>

<p className="text-neutral-500 text-sm">
Name
</p>

<p className="text-lg font-semibold">
{reservation.name}
</p>

</div>



<div>

<p className="text-neutral-500 text-sm">
Phone
</p>

<p>
{reservation.phone}
</p>

</div>



<div>

<p className="text-neutral-500 text-sm">
Email
</p>

<p>
{reservation.email}
</p>

</div>



<div
className="
grid
grid-cols-3
gap-4
"
>


<div>

<p className="text-neutral-500 text-sm">
Date
</p>

<p>
{reservation.date}
</p>

</div>


<div>

<p className="text-neutral-500 text-sm">
Time
</p>

<p>
{reservation.time}
</p>

</div>


<div>

<p className="text-neutral-500 text-sm">
Guests
</p>

<p>
{reservation.guests}
</p>

</div>


</div>




<div>

<p className="text-neutral-500 text-sm">
Status
</p>


<p
className={`
font-semibold

${
reservation.status==="CONFIRMED"
?
"text-green-400"
:
reservation.status==="CANCELLED"
?
"text-red-400"
:
"text-yellow-400"

}
`}
>

{reservation.status}

</p>


</div>


</div>





<div
className="
grid
grid-cols-3
gap-3
mt-8
"
>


<button

onClick={()=>
onUpdate(
reservation.id,
"CONFIRMED"
)
}

className="
bg-green-600
hover:bg-green-500
rounded-xl
py-3
font-semibold
transition
"
>

Confirm

</button>



<button

onClick={()=>
onUpdate(
reservation.id,
"CANCELLED"
)
}

className="
bg-red-600
hover:bg-red-500
rounded-xl
py-3
font-semibold
transition
"
>

Cancel

</button>



<button

onClick={()=>
onDelete(
reservation.id
)
}

className="
bg-neutral-800
hover:bg-neutral-700
rounded-xl
transition
"
>

Delete

</button>


</div>


</div>


</div>

);

}