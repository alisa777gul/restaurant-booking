import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// GET - получить время

export async function GET() {

  try {

    const times =
      await prisma.availableTime.findMany({

        where:{
          active:true,
        },

        orderBy:{
          time:"asc",
        },

      });


    return NextResponse.json(times);


  } catch(error) {

    console.error(error);


    return NextResponse.json(
      {
        error:"Failed to load times"
      },
      {
        status:500
      }
    );

  }

}



// POST - добавить время

export async function POST(
  request: Request
) {


  try {


    const body =
      await request.json();


    const time =
      body.time;



    if(!time){

      return NextResponse.json(
        {
          error:"Time required"
        },
        {
          status:400
        }
      );

    }




    const exists =
      await prisma.availableTime.findUnique({

        where:{
          time,
        }

      });



    if(exists){

      return NextResponse.json(
        {
          error:"Time already exists"
        },
        {
          status:400
        }
      );

    }




    const newTime =
      await prisma.availableTime.create({

        data:{
          time,
          active:true,
        }

      });




    return NextResponse.json(newTime);



  } catch(error){


    console.error(error);


    return NextResponse.json(
      {
        error:"Failed to create time"
      },
      {
        status:500
      }
    );


  }


}