"use client";

import { useMemo, useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./calendar.css";

import TimeSlots from "@/components/admin/TimeSlots";
import ReservationModal from "@/components/admin/ReservationModal";

import {
  CalendarDays,
  Clock,
  Users,
  Phone,
  Mail,
} from "lucide-react";


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
  reservations: Reservation[];

  onUpdate: (
    id:number,
    status:string
  ) => void;

  onDelete: (
    id:number
  ) => void;
};



function formatDate(date:Date){

  return (
    `${date.getFullYear()}-` +
    `${String(date.getMonth()+1).padStart(2,"0")}-` +
    `${String(date.getDate()).padStart(2,"0")}`
  );

}



function normalizeDate(value:string){

  if(!value) return "";

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

.filter(item =>

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


},[
reservations
]);








return (

<>

<div
className="
flex
flex-col
gap-5

lg:grid
lg:grid-cols-[360px_1fr]
lg:gap-8

items-start
"
>



{/* CALENDAR */}


<div
className="
bg-[#111]
border
border-neutral-800

rounded-2xl
sm:rounded-3xl

p-4
sm:p-6

shadow-xl

overflow-hidden
"
>



<div
className="
flex
items-center
gap-3
mb-5
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

<CalendarDays size={24}/>

</div>



<div>

<h2
className="
text-lg
sm:text-xl
font-bold
"
>

Calendar

</h2>


<p
className="
text-neutral-500
text-sm
"
>

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

rounded-2xl
sm:rounded-3xl

p-4
sm:p-6
lg:p-7

"
>





<div
className="
mb-6
"
>



<h1
className="
text-xl
sm:text-2xl
lg:text-3xl

font-bold

leading-tight
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

mt-1

text-sm
"
>

{dayReservations.length} reservations

</p>





<div className="mt-6">

<TimeSlots

date={selectedDay}

/>

</div>



</div>










{
dayReservations.length === 0 ? (



<div
className="
min-h-60

sm:min-h-80

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
space-y-3
sm:space-y-4
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

rounded-xl
sm:rounded-2xl

p-4
sm:p-5

hover:border-yellow-500

transition
"

>




<div
className="
flex

flex-col

gap-4

sm:flex-row

sm:justify-between

sm:items-start
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

text-base
sm:text-lg
"
>

{item.name}

</h3>





<div
className="
flex
flex-wrap

items-center

gap-4

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

w-fit

min-w-23.75

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

flex-col

gap-2

mt-5

text-xs

text-neutral-500

sm:flex-row

sm:gap-6
"

>



<span
className="
flex
items-center
gap-2

break-all
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

break-all
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


reservation={
selectedReservation
}



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