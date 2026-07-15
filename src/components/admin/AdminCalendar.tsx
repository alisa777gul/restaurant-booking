"use client";

import { useMemo, useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./calendar.css";
import TimeSlots from "@/components/admin/TimeSlots";
import {
  CalendarDays,
  Clock,
  Users,
  Phone,
  Mail,
} from "lucide-react";

import ReservationModal from "@/components/admin/ReservationModal";


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
  reservations: Reservation[];

  onUpdate: (
    id:number,
    status:string
  )=>void;

  onDelete: (
    id:number
  )=>void;
};



function formatDate(date:Date){

  return (
    `${date.getFullYear()}-` +
    `${String(date.getMonth()+1).padStart(2,"0")}-` +
    `${String(date.getDate()).padStart(2,"0")}`
  );

}



function normalizeDate(value:string){

  if(!value)
    return "";

  return value.split("T")[0];

}




export default function AdminCalendar({

  reservations = [],

  onUpdate,

  onDelete,

}:Props){



const [selectedDate,setSelectedDate] =
useState<Date>(new Date());



const [selectedReservation,setSelectedReservation] =
useState<Reservation | null>(null);





const selectedDay =
formatDate(selectedDate);





const dayReservations =
useMemo(()=>{


return reservations

.filter(item=>

normalizeDate(item.date)
===
selectedDay

)

.sort((a,b)=>

a.time.localeCompare(
b.time
)

);


},[
reservations,
selectedDay
]);





const bookedDays =
useMemo(()=>{


return reservations

.filter(item=>item.date)

.map(item=>

new Date(
normalizeDate(item.date)
)

);


},[reservations]);







return (

<>

<div
className="
grid
xl:grid-cols-[420px_1fr]
gap-8
items-start
"
>



{/* CALENDAR */}


<div
className="
bg-[#111]
border
border-neutral-800
rounded-3xl
p-7
shadow-xl
"
>


<div
className="
flex
items-center
gap-4
mb-7
"
>


<div
className="
p-3
rounded-xl
bg-yellow-500/10
text-yellow-400
"
>

<CalendarDays size={25}/>

</div>


<div>

<h2 className="
text-xl
font-bold
">

Calendar

</h2>


<p className="
text-neutral-500
text-sm
">

Reservation dates

</p>


</div>


</div>





<DayPicker

mode="single"

selected={selectedDate}

onSelect={(date)=>{

if(date)
setSelectedDate(date);

}}

modifiers={{
booked:bookedDays
}}

modifiersClassNames={{
booked:"booked-day"
}}

/>



</div>









{/* RESERVATIONS */}


<div
className="
bg-[#111]
border
border-neutral-800
rounded-3xl
p-7
min-h-[560px]
"
>



<div
className="
mb-8
"
>


<h1
className="
text-3xl
font-bold
"
>

{
selectedDate.toLocaleDateString(
"en-US",
{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
}
)
}

</h1>


<p
className="
text-neutral-500
mt-2
"
>

{dayReservations.length} reservations

</p>

<TimeSlots
 date={selectedDay}
/>
</div>







{
dayReservations.length === 0 ? (


<div
className="
h-[320px]
flex
flex-col
items-center
justify-center
text-neutral-500
"
>


<CalendarDays
size={45}
/>


<p
className="
mt-4
"
>

No reservations

</p>


</div>



)

:

(


<div
className="
space-y-4
"
>


{
dayReservations.map(item=>(


<button

key={item.id}

type="button"

onClick={()=>{

setSelectedReservation(item);

}}


className="
w-full
text-left
bg-neutral-900
border
border-neutral-800
rounded-2xl
p-5
hover:border-yellow-500
transition
"

>


<div
className="
flex
justify-between
items-start
gap-5
"
>


<div
className="
flex-1
"
>


<h3
className="
font-bold
text-lg
"
>

{item.name}

</h3>




<div
className="
flex
items-center
gap-6
mt-3
text-sm
text-neutral-400
"
>


<span
className="
flex
items-center
gap-2
"
>

<Clock size={15}/>

{item.time}

</span>


<span
className="
flex
items-center
gap-2
"
>

<Users size={15}/>

{item.guests}

</span>


</div>


</div>







<span

className={`
inline-flex
justify-center
min-w-[95px]
px-3
py-1.5
rounded-full
text-xs
font-semibold

${
item.status==="CONFIRMED"

?

"bg-green-500/10 text-green-400"

:

item.status==="CANCELLED"

?

"bg-red-500/10 text-red-400"

:

"bg-yellow-500/10 text-yellow-400"

}

`}

>

{item.status}

</span>



</div>







<div
className="
flex
items-center
gap-6
mt-5
text-xs
text-neutral-500
"
>


<span
className="
flex
items-center
gap-2
"
>

<Phone size={13}/>

{item.phone}

</span>




<span
className="
flex
items-center
gap-2
"
>

<Mail size={13}/>

{item.email}

</span>



</div>





</button>


))

}


</div>


)

}



</div>






</div>







{
selectedReservation && (


<ReservationModal

reservation={selectedReservation}


onClose={()=>{

setSelectedReservation(null);

}}



onUpdate={(id,status)=>{

onUpdate(
id,
status
);

setSelectedReservation(null);

}}



onDelete={(id)=>{

onDelete(id);

setSelectedReservation(null);

}}


/>


)

}



</>

);

}