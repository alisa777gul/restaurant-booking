"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminCalendar from "@/components/admin/AdminCalendar";


type Reservation = {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  status: string;
};



export default function CalendarPage() {


  const [
    reservations,
    setReservations
  ] = useState<Reservation[]>([]);



  const [
    loading,
    setLoading
  ] = useState(true);





  useEffect(() => {


    const controller =
      new AbortController();



    async function fetchReservations(){


      try {


        const response =
          await fetch(
            "/api/admin/reservations",
            {
              signal:
                controller.signal,
            }
          );



        const data =
          await response.json();




        if(
          Array.isArray(data)
        ){

          setReservations(data);

        } else {

          setReservations([]);

        }



      } catch(error){


        if(
          error instanceof DOMException &&
          error.name === "AbortError"
        ){
          return;
        }


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



    return () => {

      controller.abort();

    };



  }, []);









  async function updateReservation(
    id:number,
    status:string
  ){



    // мгновенное обновление UI

    setReservations(prev =>

      prev.map(item =>

        item.id === id

          ? {
              ...item,
              status,
            }

          : item

      )

    );





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
        "Update reservation error:",
        error
      );


    }



  }









  async function deleteReservation(
    id:number
  ){



    // сразу убрать из интерфейса

    setReservations(prev =>

      prev.filter(item =>

        item.id !== id

      )

    );





    try {


      await fetch(
        `/api/admin/reservations/${id}`,
        {
          method:"DELETE",
        }
      );



    } catch(error){


      console.error(
        "Delete reservation error:",
        error
      );


    }



  }








  if(loading){


    return (

      <div
        className="
        min-h-75
        flex
        items-center
        justify-center
        text-neutral-400
        text-sm
        sm:text-base
        "
      >

        Loading calendar...

      </div>

    );


  }








  return (

    <main
      className="
      w-full
      "
    >



      <section
        className="
        mb-8
        "
      >


        <h1
          className="
          text-3xl
          sm:text-4xl
          font-bold
          leading-tight
          "
        >

          Calendar

        </h1>



        <p
          className="
          text-neutral-500
          mt-2
          text-sm
          sm:text-base
          "
        >

          Reservation schedule

        </p>


      </section>









      <div
        className="
        w-full
        "
      >


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






    </main>

  );

}