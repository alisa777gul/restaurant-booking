import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// получить все брони

export async function GET() {

  try {

    const reservations =
      await prisma.reservation.findMany({

        orderBy:[
          {
            date:"asc",
          },
          {
            time:"asc",
          }
        ]

      });


    return NextResponse.json(reservations);


  } catch(error){

    console.error(error);

    return NextResponse.json(
      {
        error:"Failed to load reservations"
      },
      {
        status:500
      }
    );

  }

}