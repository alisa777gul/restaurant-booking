import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(
  request: Request
) {

  const { date } =
    await request.json();



  const reservations =
    await prisma.reservation.findMany({

      where:{
        date,
      },


      select:{
        time:true,
      },

    });



  const reservedTimes =
    reservations.map(
      (item)=>item.time
    );



  return NextResponse.json({
    reservedTimes,
  });

}