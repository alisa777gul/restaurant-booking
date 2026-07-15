import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {

  try {

    const body = await request.json();


    const {
      name,
      phone,
      email,
      date,
      time,
      guests,
    } = body;



    if (
      !name ||
      !phone ||
      !email ||
      !date ||
      !time ||
      !guests
    ) {

      return NextResponse.json(
        {
          error: "All fields are required",
        },
        {
          status: 400,
        }
      );

    }



    const reservation = await prisma.reservation.create({

      data: {

        name,
        phone,
        email,

        date,
        time,

        guests,

      },

    });



    return NextResponse.json(
      reservation,
      {
        status: 201,
      }
    );



  } catch (error) {

    console.error(error);


    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );

  }

}