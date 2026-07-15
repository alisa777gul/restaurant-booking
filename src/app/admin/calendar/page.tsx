"use client";


import {
useEffect,
useState
} from "react";


import AdminCalendar
from "@/components/admin/AdminCalendar";



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



const [
reservations,
setReservations
]=
useState<Reservation[]>([]);



const [
loading,
setLoading
]=
useState(true);





async function loadReservations(){


try{


const response =
await fetch(
"/api/admin/reservations"
);



const data =
await response.json();



console.log(
"API:",
data
);



if(Array.isArray(data)){


setReservations(data);


}else{


setReservations([]);


}



}

catch(error){


console.error(error);


setReservations([]);


}

finally{


setLoading(false);


}


}







useEffect(()=>{


let cancelled = false;


async function init(){

  await loadReservations();


}


if(!cancelled){

  init();

}



return ()=>{

  cancelled = true;

};



},[]);








async function updateReservation(
id:number,
status:string
){



await fetch(
"/api/admin/reservations",
{

method:"PATCH",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id,

status

})


}
);



loadReservations();


}







async function deleteReservation(
id:number
){


await fetch(
`/api/admin/reservations?id=${id}`,
{

method:"DELETE"

}
);



loadReservations();


}









if(loading){


return (

<div
className="
text-neutral-400
"
>

Loading calendar...

</div>


);


}







return (


<div>


<h1
className="
text-4xl
font-bold
mb-2
"
>

Calendar

</h1>


<p
className="
text-neutral-500
mb-10
"
>

Reservation schedule

</p>





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



</div>


);


}