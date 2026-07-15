"use client";

import { useEffect, useState } from "react";


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



export default function ReservationsPage() {


  const [reservations, setReservations] =
    useState<Reservation[]>([]);


  const [loading, setLoading] =
    useState(true);





  useEffect(() => {


    let cancelled = false;


    async function fetchReservations() {


      try {


        const response =
          await fetch(
            "/api/admin/reservations"
          );


        const data =
          await response.json();



        if (!cancelled) {

          setReservations(
            Array.isArray(data)
              ? data
              : []
          );

        }



      } catch (error) {


        console.error(
          "Loading reservations error:",
          error
        );


        if (!cancelled) {

          setReservations([]);

        }



      } finally {


        if (!cancelled) {

          setLoading(false);

        }


      }


    }



    fetchReservations();



    return () => {

      cancelled = true;

    };


  }, []);









  async function changeStatus(
    id: number,
    status: string
  ) {



    setReservations(prev =>

      prev.map(item =>

        item.id === id

          ? {
              ...item,
              status
            }

          : item

      )

    );




    await fetch(

      `/api/admin/reservations/${id}`,

      {

        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
        }),

      }

    );


  }









  async function remove(
    id: number
  ) {



    setReservations(prev =>

      prev.filter(item =>
        item.id !== id
      )

    );



    await fetch(

      `/api/admin/reservations/${id}`,

      {
        method: "DELETE",
      }

    );


  }









  if (loading) {


    return (

      <div className="text-neutral-400">

        Loading reservations...

      </div>

    );


  }










  return (

    <section>


      <div className="mb-8">


        <h1
          className="
          text-2xl
          sm:text-3xl
          lg:text-4xl
          font-bold
          "
        >

          Reservations

        </h1>


        <p
          className="
          text-neutral-500
          mt-2
          "
        >

          Manage restaurant bookings

        </p>


      </div>









      {
        reservations.length === 0 ? (


          <div
            className="
            bg-[#111]
            border
            border-neutral-800
            rounded-2xl
            p-8
            text-center
            text-neutral-500
            "
          >

            No reservations yet

          </div>



        ) : (



          <>





            {/* MOBILE CARDS */}


            <div
              className="
              lg:hidden
              space-y-4
              "
            >


              {
                reservations.map(item => (


                  <div

                    key={item.id}

                    className="
                    bg-[#111]
                    border
                    border-neutral-800
                    rounded-2xl
                    p-5
                    "

                  >



                    <div
                      className="
                      flex
                      justify-between
                      gap-4
                      items-start
                      "
                    >



                      <div>


                        <h3
                          className="
                          font-bold
                          text-lg
                          "
                        >

                          {item.name}

                        </h3>



                        <p
                          className="
                          text-sm
                          text-neutral-500
                          "
                        >

                          {item.phone}

                        </p>


                      </div>






                      <span

                        className={`

                        inline-flex
                        items-center
                        justify-center

                        min-w-22.5

                        px-3
                        py-1.5

                        rounded-full

                        text-xs
                        font-semibold


                        ${
                          item.status === "CONFIRMED"

                          ?

                          "bg-green-500/10 text-green-400"

                          :

                          item.status === "CANCELLED"

                          ?

                          "bg-red-500/10 text-red-400"

                          :

                          "bg-yellow-500/10 text-yellow-400"

                        }

                        `}

                      >

                        {item.status}

                      </span>



                    </div>









                    <div
                      className="
                      grid
                      grid-cols-2
                      gap-4
                      mt-5
                      text-sm
                      "
                    >


                      <div>

                        <p className="text-neutral-500">
                          Date
                        </p>

                        <p>
                          {item.date}
                        </p>

                      </div>



                      <div>

                        <p className="text-neutral-500">
                          Time
                        </p>

                        <p>
                          {item.time}
                        </p>

                      </div>



                      <div>

                        <p className="text-neutral-500">
                          Guests
                        </p>

                        <p>
                          {item.guests}
                        </p>

                      </div>




                      <div>

                        <p className="text-neutral-500">
                          Email
                        </p>

                        <p className="truncate">
                          {item.email}
                        </p>

                      </div>


                    </div>







                    <div
                      className="
                      grid
                      grid-cols-3
                      gap-2
                      mt-5
                      "
                    >


                      <button

                        onClick={() =>
                          changeStatus(
                            item.id,
                            "CONFIRMED"
                          )
                        }

                        className="
                        bg-green-600
                        rounded-xl
                        py-2
                        text-sm
                        font-semibold
                        "

                      >

                        Confirm

                      </button>





                      <button

                        onClick={() =>
                          changeStatus(
                            item.id,
                            "CANCELLED"
                          )
                        }

                        className="
                        bg-red-600
                        rounded-xl
                        py-2
                        text-sm
                        font-semibold
                        "

                      >

                        Cancel

                      </button>





                      <button

                        onClick={() =>
                          remove(item.id)
                        }

                        className="
                        bg-neutral-700
                        rounded-xl
                        py-2
                        text-sm
                        font-semibold
                        "

                      >

                        Delete

                      </button>



                    </div>



                  </div>


                ))
              }


            </div>









            {/* DESKTOP TABLE */}



            <div
              className="
              hidden
              lg:block
              bg-[#111]
              border
              border-neutral-800
              rounded-2xl
              overflow-hidden
              "
            >


              <table className="w-full">


                <thead
                  className="
                  bg-neutral-900
                  text-neutral-400
                  text-sm
                  "
                >


                  <tr>


                    <th className="px-6 py-4 text-left">
                      Name
                    </th>


                    <th className="px-6 py-4 text-left">
                      Date
                    </th>


                    <th className="px-6 py-4 text-left">
                      Time
                    </th>


                    <th className="px-6 py-4 text-left">
                      Guests
                    </th>


                    <th className="px-6 py-4 text-left">
                      Status
                    </th>


                    <th className="px-6 py-4 text-left">
                      Actions
                    </th>


                  </tr>


                </thead>





                <tbody>


                  {
                    reservations.map(item => (


                      <tr

                        key={item.id}

                        className="
                        border-t
                        border-neutral-800
                        "

                      >



                        <td className="px-6 py-5">


                          <p className="font-semibold">
                            {item.name}
                          </p>


                          <p className="text-sm text-neutral-500">
                            {item.phone}
                          </p>


                        </td>




                        <td className="px-6 py-5">
                          {item.date}
                        </td>



                        <td className="px-6 py-5">
                          {item.time}
                        </td>



                        <td className="px-6 py-5">
                          {item.guests}
                        </td>




                        <td className="px-6 py-5">


                          <span

                            className={`

                            inline-flex
                            items-center
                            justify-center

                            min-w-23.75

                            px-3
                            py-1.5

                            rounded-full

                            text-xs
                            font-semibold


                            ${
                              item.status === "CONFIRMED"

                              ?

                              "bg-green-500/10 text-green-400"

                              :

                              item.status === "CANCELLED"

                              ?

                              "bg-red-500/10 text-red-400"

                              :

                              "bg-yellow-500/10 text-yellow-400"

                            }

                            `}

                          >

                            {item.status}

                          </span>


                        </td>






                        <td className="px-6 py-5">


                          <div className="flex gap-2">


                            <button

                              onClick={() =>
                                changeStatus(
                                  item.id,
                                  "CONFIRMED"
                                )
                              }

                              className="
                              bg-green-600
                              px-3
                              py-2
                              rounded-lg
                              text-sm
                              "

                            >

                              Confirm

                            </button>





                            <button

                              onClick={() =>
                                changeStatus(
                                  item.id,
                                  "CANCELLED"
                                )
                              }

                              className="
                              bg-red-600
                              px-3
                              py-2
                              rounded-lg
                              text-sm
                              "

                            >

                              Cancel

                            </button>





                            <button

                              onClick={() =>
                                remove(item.id)
                              }

                              className="
                              bg-neutral-700
                              px-3
                              py-2
                              rounded-lg
                              text-sm
                              "

                            >

                              Delete

                            </button>


                          </div>


                        </td>



                      </tr>


                    ))
                  }


                </tbody>


              </table>


            </div>




          </>


        )
      }



    </section>

  );

}