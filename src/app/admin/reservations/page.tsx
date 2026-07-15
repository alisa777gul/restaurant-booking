"use client";


import {useEffect,useState} from "react";


type Reservation={

id:number;
name:string;
phone:string;
email:string;
date:string;
time:string;
guests:string;
status:string;

}



export default function ReservationsPage(){


const [reservations,setReservations]
=
useState<Reservation[]>([]);



const loadReservations =
async()=>{


const res =
await fetch(
"/api/admin/reservations"
);


const data =
await res.json();


setReservations(data);


};



useEffect(() => {

  let ignore = false;


  const fetchReservations = async () => {

    const res = await fetch(
      "/api/admin/reservations"
    );


    const data = await res.json();


    if (!ignore) {
      setReservations(data);
    }

  };


  fetchReservations();


  return () => {
    ignore = true;
  };


}, []);





const changeStatus =
async(
id:number,
status:string
)=>{


await fetch(
`/api/admin/reservations/${id}`,
{

method:"PATCH",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
status
})

}

);


loadReservations();


};





const remove =
async(id:number)=>{


await fetch(
`/api/admin/reservations/${id}`,
{

method:"DELETE"

}

);


loadReservations();


};




return (

<div>


<h1 className="
text-4xl
font-bold
">
Reservations
</h1>


<p className="
text-neutral-500
mt-2
">
Manage restaurant bookings
</p>





<div className="
mt-10
bg-[#111]
border
border-neutral-800
rounded-2xl
overflow-hidden
">


<table className="w-full">


<thead className="bg-neutral-900">


<tr>

<th className="p-4 text-left">
Name
</th>


<th>
Date
</th>


<th>
Time
</th>


<th>
Guests
</th>


<th>
Status
</th>


<th>
Actions
</th>


</tr>


</thead>





<tbody>


{
reservations.map((item)=>(


<tr
key={item.id}
className="
border-t
border-neutral-800
"
>


<td className="p-4">

<div className="font-semibold">
{item.name}
</div>

<div className="text-sm text-neutral-500">
{item.phone}
</div>

</td>



<td>
{item.date}
</td>


<td>
{item.time}
</td>


<td>
{item.guests}
</td>



<td>

<span
className="
text-yellow-500
"
>
{item.status}
</span>


</td>



<td className="
flex
gap-2
p-4
">


<button

onClick={()=>changeStatus(
item.id,
"CONFIRMED"
)}

className="
bg-green-600
px-3
py-2
rounded-lg
text-sm
"
>

Confirm

</button>



<button

onClick={()=>changeStatus(
item.id,
"CANCELLED"
)}

className="
bg-red-600
px-3
py-2
rounded-lg
text-sm
"
>

Cancel

</button>



<button

onClick={()=>remove(item.id)}

className="
bg-neutral-700
px-3
py-2
rounded-lg
text-sm
"
>

Delete

</button>


</td>


</tr>


))

}


</tbody>


</table>


</div>


</div>

);


}