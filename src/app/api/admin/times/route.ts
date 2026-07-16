/* eslint-disable prefer-const */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


function getDayName(date:string){

  const day =
    new Date(date).getDay();


  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


  return days[day];

}




function generateSlots(
open:string,
close:string,
duration:number
){

  const result:string[]=[];


  let current =
    new Date(`2000-01-01T${open}`);


  const end =
    new Date(`2000-01-01T${close}`);



  while(current < end){


    result.push(
      current.toTimeString().slice(0,5)
    );


    current.setMinutes(
      current.getMinutes()+duration
    );


  }


  return result;

}







export async function GET(
req:Request
){


try{


const {searchParams}=new URL(req.url);


const date =
searchParams.get("date");


if(!date){

return NextResponse.json([]);

}



const day =
getDayName(date);





const workingHour =
await prisma.workingHour.findUnique({

where:{
day
}

});





// закрыто

if(
!workingHour ||
workingHour.closed
){

return NextResponse.json([]);

}





const times =
generateSlots(
workingHour.open,
workingHour.close,
workingHour.slotDuration
);
const now = new Date();

const filteredTimes = times.filter((time)=>{

  const slotDate = new Date(
  `${date}T${time}:00`
);


  // если день сегодня — убрать прошлые часы
  if(
    slotDate <= now
  ){
    return false;
  }


  return true;

});




const reservations =
await prisma.reservation.findMany({

where:{
date
}

});






const slots =
filteredTimes.map(time=>({


id:`${date}-${time}`,

date,

time,


available:
!reservations.some(
r=>r.time===time
)


}));





return NextResponse.json(slots);



}
catch(error){


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