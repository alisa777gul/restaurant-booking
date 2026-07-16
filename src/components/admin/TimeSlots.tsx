"use client";


import {
  useEffect,
  useState,
} from "react";

import {
  Clock
} from "lucide-react";



type TimeSlot = {

id:string;

date:string;

time:string;

available:boolean;

};



type Props = {

date:string;

};





export default function TimeSlots({
date
}:Props){



const [slots,setSlots] =
useState<TimeSlot[]>([]);



const [loading,setLoading] =
useState(true);






useEffect(()=>{


if(!date){

return;

}



let cancelled=false;



async function load(){


try{


setLoading(true);



const res =
await fetch(
`/api/admin/times?date=${date}`
);



const data =
await res.json();




if(
!cancelled &&
Array.isArray(data)
){

setSlots(data);

}



}
catch(error){


console.error(
"Loading slots error",
error
);


}
finally{


if(!cancelled){

setLoading(false);

}


}



}



load();




return ()=>{

cancelled=true;

};



},[date]);







if(loading){

return (

<div className="
py-10
text-center
text-neutral-500
">

Loading times...

</div>

);

}







return (

<div
className="
mt-8
pt-8
border-t
border-neutral-200
dark:border-neutral-800
"
>


<div
className="
flex
items-center
justify-between
mb-5
"
>


<div
className="
flex
items-center
gap-3
"
>

<div
className="
w-10
h-10
rounded-xl
bg-blue-500/10
text-blue-500
flex
items-center
justify-center
"
>

<Clock size={20}/>

</div>


<div>

<h3 className="font-bold">

Available times

</h3>


<p className="
text-sm
text-neutral-500
">

Generated from working hours

</p>


</div>


</div>




<span
className="
text-sm
text-blue-500
font-semibold
"
>

{slots.length} slots

</span>



</div>





{
slots.length===0 ?


(

<div
className="
rounded-2xl
border
border-dashed
p-8
text-center
text-neutral-500
"
>

No available times

</div>

)


:

(

<div
className="
grid
sm:grid-cols-2
lg:grid-cols-3
gap-3
"
>


{
slots.map(slot=>(


<div

key={slot.id}

className={`
rounded-2xl
border
px-4
py-3
flex
justify-between
items-center

${
slot.available
?
"bg-green-500/5 border-green-500/30"
:
"bg-red-500/5 border-red-500/30 opacity-60"
}

`}

>


<div
className="
flex
items-center
gap-2
"
>

<Clock size={16}/>

<span className="font-semibold">

{slot.time}

</span>

</div>




<span className="text-xs">

{
slot.available
?
"Available"
:
"Booked"
}

</span>


</div>


))
}


</div>

)

}



</div>

);


}