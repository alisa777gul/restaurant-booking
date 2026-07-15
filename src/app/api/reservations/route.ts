import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(
 request:Request
){

try{


const body =
await request.json();



const {
name,
phone,
email,
date,
time,
guests
}=body;



if(
!name ||
!phone ||
!email ||
!date ||
!time ||
!guests
){

return NextResponse.json(
{
error:"All fields required"
},
{
status:400
}
);

}




// существует ли такой слот

const slot =
await prisma.timeSlot.findFirst({

where:{
date,
time
}

});



if(!slot){

return NextResponse.json(
{
error:"This time is not available"
},
{
status:400
}
);

}




// занято ли уже

const exists =
await prisma.reservation.findFirst({

where:{
date,
time
}

});



if(exists){

return NextResponse.json(
{
error:"This time already booked"
},
{
status:400
}
);

}





const reservation =
await prisma.reservation.create({

data:{

name,

phone,

email,

date,

time,

guests,

status:"PENDING"

}

});




return NextResponse.json(
reservation,
{
status:201
}
);



}catch(error){


console.error(error);


return NextResponse.json(
{
error:"Server error"
},
{
status:500
}
);


}


}