import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];



export async function GET(
request:Request
){


try{


const {searchParams} =
new URL(request.url);



const date =
searchParams.get("date");



if(!date){

return NextResponse.json([]);

}



const currentDate =
new Date(date);



const day =
days[currentDate.getDay()];




const workingHour =
await prisma.workingHour.findUnique({

where:{
day,
}

});




if(
!workingHour ||
workingHour.closed
){

return NextResponse.json([]);

}





const reservations =
await prisma.reservation.findMany({

where:{
date,
},

select:{
time:true,
}

});



const booked =
reservations.map(
(item)=>item.time
);





const slots=[];



let current =
workingHour.open;



while(
current < workingHour.close
){


slots.push({

id:slots.length,

time:current,

available:
!booked.includes(current),

});



const [
hour,
minute
]=current.split(":").map(Number);



const total =
hour*60+
minute+
workingHour.slotDuration;



const nextHour =
Math.floor(total/60);



const nextMinute =
total%60;



current =
`${String(nextHour).padStart(2,"0")}:${String(nextMinute).padStart(2,"0")}`;


}





return NextResponse.json(slots);



}catch(error){


console.error(error);


return NextResponse.json(
{
error:"Failed loading times"
},
{
status:500
}
);


}


}