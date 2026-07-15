import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(
request:Request
){


const {
date
}=await request.json();



const slots =
await prisma.timeSlot.findMany({

where:{
date,
},

orderBy:{
time:"asc"
}

});




const reservations =
await prisma.reservation.findMany({

where:{
date,
},

select:{
time:true
}

});



const busy =
reservations.map(
(item)=>item.time
);



const available =
slots.filter(
(slot)=>
!busy.includes(slot.time)
);



return NextResponse.json(
available
);


}