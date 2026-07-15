import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {

  const { date, time } = await request.json();


  const existing = await prisma.reservation.findFirst({
    where: {
      date,
      time,
    },
  });


  return NextResponse.json({
    available: !existing,
  });

}