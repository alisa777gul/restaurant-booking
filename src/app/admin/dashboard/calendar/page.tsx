"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminCalendar from "@/components/admin/AdminCalendar";


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



export default function CalendarPage(){


const [reservations,setReservations] =
useState<Reservation[]>([]);


const [loading,setLoading] =
useState(true);





useEffect(()=>{


const controller =
new AbortController();



async function fetchReservations(){


try{


const response =
await fetch(
"/api/admin/reservations",
{
signal:controller.signal,
}
);



const data =
await response.json();



setReservations(
Array.isArray(data)
?
data
:
[]
);



}
catch(error){


if(
error instanceof DOMException &&
error.name==="AbortError"
){
return;
}


console.error(
"Loading reservations error:",
error
);


setReservations([]);


}
finally{

setLoading(false);

}


}



fetchReservations();



return ()=>controller.abort();


},[]);







async function updateReservation(
id:number,
status:string
){


setReservations(prev=>

prev.map(item=>

item.id===id

?
{
...item,
status,
}

:

item

)

);



try{


await fetch(
`/api/admin/reservations/${id}`,
{

method:"PATCH",

headers:{
"Content-Type":"application/json",
},

body:JSON.stringify({
status,
}),

}

);


}
catch(error){

console.error(
"Update reservation error:",
error
);

}


}








async function deleteReservation(
id:number
){


setReservations(prev=>

prev.filter(item=>

item.id!==id

)

);



try{


await fetch(
`/api/admin/reservations/${id}`,
{
method:"DELETE",
}
);


}
catch(error){

console.error(
"Delete reservation error:",
error
);

}


}







if(loading){

return (

<div

className="
min-h-80

flex
items-center
justify-center

text-neutral-500

"

>

Loading calendar...

</div>

);

}









return (

<main className="w-full">





<section className="mb-10">


<div

className="
inline-flex
items-center

rounded-full

bg-blue-500/10

text-blue-600
dark:text-blue-400

px-4
py-2

text-sm
font-medium

mb-5
"

>

📅 Booking calendar

</div>





<h1

className="
text-3xl
sm:text-4xl
lg:text-5xl

font-bold

tracking-tight

"

>

Calendar

</h1>




<p

className="
mt-3

text-neutral-500
dark:text-neutral-400

"

>

Manage reservation schedule and availability

</p>



</section>









<section

className="
rounded-3xl

border

border-neutral-200
dark:border-neutral-800

bg-white/80

dark:bg-neutral-950/80

backdrop-blur-xl

shadow-xl

p-4
sm:p-6
lg:p-8

"

>


<AdminCalendar


reservations={
reservations
}


onUpdate={
updateReservation
}


onDelete={
deleteReservation
}


/>


</section>






</main>

);

}