"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

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

  if(!value) return "";

  
  // 2026-07-15
  if(value.includes("-")){

    return value.split("T")[0];

  }



  // 15.07.2026

  if(value.includes(".")){


    const [
      day,
      month,
      year
    ] = value.split(".");


    return `${year}-${month}-${day}`;


  }



  return "";

}







export default function AdminCalendar({

  reservations,

  onUpdate,

  onDelete,

}:Props){



const [selectedDate,setSelectedDate] =
useState<Date>(
  new Date()
);



const [selectedReservation,setSelectedReservation]
=
useState<Reservation | null>(null);






const selectedFormatted =
formatDate(selectedDate);





const dayReservations =
reservations.filter((item)=>{


return (
normalizeDate(item.date)
===
selectedFormatted
);


});







return (


<div
className="
grid
md:grid-cols-2
gap-8
"
>




<div
className="
bg-[#111]
border
border-neutral-800
rounded-2xl
p-6
"
>


<h2
className="
text-xl
font-bold
mb-5
"
>
Choose date
</h2>


<DayPicker


mode="single"


selected={selectedDate}


onSelect={(date)=>{

if(date){

setSelectedDate(date);

}

}}


/>


</div>









<div
className="
bg-[#111]
border
border-neutral-800
rounded-2xl
p-6
"
>



<h2
className="
text-2xl
font-bold
mb-6
"
>

{
selectedDate.toLocaleDateString(
"en-US",
{
day:"numeric",
month:"long",
year:"numeric"
}
)
}

</h2>






{
dayReservations.length === 0 ? (


<p
className="
text-neutral-500
"
>
No reservations
</p>



):(



<div
className="
space-y-4
"
>


{
dayReservations.map((item)=>(



<button

key={item.id}

type="button"

onClick={()=>{

setSelectedReservation(item);

}}


className="
w-full
bg-neutral-900
rounded-xl
p-4
border
border-transparent
hover:border-yellow-500
transition
flex
justify-between
items-center
text-left
"

>


<div>


<p
className="
font-semibold
"
>
{item.name}
</p>


<p
className="
text-neutral-400
"
>
{item.time}
</p>


</div>





<div
className="
text-right
"
>


<p>
{item.guests} guests
</p>



<span
className={

item.status==="CONFIRMED"

?

"text-green-400 text-sm"

:

item.status==="CANCELLED"

?

"text-red-400 text-sm"

:

"text-yellow-400 text-sm"

}

>

{item.status}

</span>


</div>


</button>



))


}


</div>


)


}



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



</div>


);

}