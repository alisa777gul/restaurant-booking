"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminCalendar from "@/components/admin/AdminCalendar";


type Reservation = {

  id:number;

  name:string;

  phone:string;

  email:string;

  date:string;

  time:string;

  guests:string;

  status:string;

};



export default function CalendarPage(){


  const [
    reservations,
    setReservations
  ] = useState<Reservation[]>([]);



  const [
    loading,
    setLoading
  ] = useState(true);



  





useEffect(() => {

  async function fetchReservations() {

    try {

      const response = await fetch(
        "/api/admin/reservations"
      );


      const data = await response.json();


      if(Array.isArray(data)) {

        setReservations(data);

      } else {

        setReservations([]);

      }


    } catch(error) {

      console.error(
        "Loading reservations error:",
        error
      );

      setReservations([]);


    } finally {

      setLoading(false);

    }

  }


  fetchReservations();


},[]);







  async function updateReservation(
    id:number,
    status:string
  ){


    try {


      await fetch(
        `/api/admin/reservations/${id}`,
        {

          method:"PATCH",

          headers:{
            "Content-Type":"application/json",
          },


          body:JSON.stringify({

            status,

          }),

        }
      );


      



    } catch(error){


      console.error(
        "Update error:",
        error
      );


    }


  }








  async function deleteReservation(
    id:number
  ){


    try {


      const response =
        await fetch(
          `/api/admin/reservations/${id}`,
          {

            method:"DELETE",

          }
        );



      if(!response.ok){

        throw new Error(
          "Delete failed"
        );

      }



      



    } catch(error){


      console.error(
        "Delete error:",
        error
      );


    }


  }







  if(loading){


    return (

      <div className="text-neutral-400">

        Loading calendar...

      </div>

    );


  }







  return (

    <div>


      <h1
        className="
        text-4xl
        font-bold
        mb-2
        "
      >

        Calendar

      </h1>



      <p
        className="
        text-neutral-500
        mb-10
        "
      >

        Reservation schedule

      </p>





      <AdminCalendar


        reservations={
          reservations
        }


        onUpdate={
          updateReservation
        }


        onDelete={
          deleteReservation
        }


      />



    </div>

  );


}