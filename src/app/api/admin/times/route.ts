import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// получить время конкретного дня

export async function GET(
  request: Request
) {

  try {


    const { searchParams } =
      new URL(request.url);


    const date =
      searchParams.get("date");



    if(!date){

      return NextResponse.json(
        [],
      );

    }



    const slots =
      await prisma.timeSlot.findMany({

        where:{
          date,
        },

        orderBy:{
          time:"asc",
        },

      });



    return NextResponse.json(slots);



  } catch(error){


    console.error(error);


    return NextResponse.json(
      {
        error:"Failed loading slots"
      },
      {
        status:500
      }
    );

  }

}





// добавить время на дату

export async function POST(
request:Request
){


try{


const {
date,
time
}
=
await request.json();



if(!date || !time){

return NextResponse.json(
{
error:"Date and time required"
},
{
status:400
}
);

}




const exists =
await prisma.timeSlot.findFirst({

where:{
date,
time
}

});



if(exists){

return NextResponse.json(
{
error:"Already exists"
},
{
status:400
}
);

}





const slot =
await prisma.timeSlot.create({

data:{
date,
time
}

});




return NextResponse.json(slot);



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