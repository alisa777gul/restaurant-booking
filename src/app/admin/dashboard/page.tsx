"use client";

import {
  useEffect,
  useState,
} from "react";

import StatCard from "@/components/admin/StatCard";



type Reservation = {
  id:number;
  name:string;
  time:string;
  guests:string;
  status:string;
};



type Stats = {
  total:number;
  pending:number;
  confirmed:number;
  today:number;
};





export default function DashboardPage(){



  const [
    stats,
    setStats
  ] = useState<Stats>({
    total:0,
    pending:0,
    confirmed:0,
    today:0,
  });




  const [
    reservations,
    setReservations
  ] = useState<Reservation[]>([]);




  const [
    loading,
    setLoading
  ] = useState(true);








  useEffect(()=>{


    const controller =
      new AbortController();




    async function loadDashboard(){


      try{


        const response =
          await fetch(
            "/api/admin/dashboard",
            {
              signal:
                controller.signal,
            }
          );



        const data =
          await response.json();




        if(!response.ok){

          throw new Error(
            data.error ||
            "Failed to load dashboard"
          );

        }





        setStats(
          data.stats ?? {
            total:0,
            pending:0,
            confirmed:0,
            today:0,
          }
        );




        setReservations(
          data.todayReservations ?? []
        );



      }
      catch(error){


        if(
          error instanceof DOMException &&
          error.name === "AbortError"
        ){
          return;
        }


        console.error(
          "Dashboard error:",
          error
        );


      }
      finally{


        setLoading(false);


      }


    }





    loadDashboard();




    return ()=>{

      controller.abort();

    };


  },[]);









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

        Loading dashboard...

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
          "
        >

          Dashboard

        </h1>



        <p
          className="
          text-neutral-500
          mt-2
          text-sm
          sm:text-base
          "
        >

          Restaurant overview

        </p>


      </section>









      {/* STATS */}



      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
        sm:gap-6
        "
      >


        <StatCard
          title="Today"
          value={stats.today}
        />



        <StatCard
          title="All reservations"
          value={stats.total}
        />



        <StatCard
          title="Pending"
          value={stats.pending}
        />



        <StatCard
          title="Confirmed"
          value={stats.confirmed}
        />


      </div>









      {/* TODAY RESERVATIONS */}




      <section
        className="
        mt-8
        sm:mt-12
        bg-[#111]
        border
        border-neutral-800
        rounded-2xl
        p-4
        sm:p-6
        "
      >



        <h2
          className="
          text-xl
          sm:text-2xl
          font-bold
          mb-5
          "
        >

          Today&apos;s reservations

        </h2>







        {
          reservations.length === 0 ? (


            <div
              className="
              py-10
              text-center
              text-neutral-500
              "
            >

              No reservations today

            </div>


          )
          :
          (



            <div
              className="
              space-y-3
              "
            >



              {
                reservations.map((item)=>(


                  <div
                    key={item.id}

                    className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                    bg-neutral-900
                    border
                    border-neutral-800
                    rounded-xl
                    p-4
                    "
                  >




                    <div>


                      <p
                        className="
                        font-semibold
                        text-base
                        "
                      >

                        {item.name}

                      </p>




                      <p
                        className="
                        text-neutral-400
                        text-sm
                        mt-1
                        "
                      >

                        🕒 {item.time}

                      </p>


                    </div>








                    <div
                      className="
                      flex
                      items-center
                      justify-between
                      sm:flex-col
                      sm:items-end
                      gap-2
                      "
                    >



                      <p
                        className="
                        text-sm
                        text-neutral-300
                        "
                      >

                        {item.guests} guests

                      </p>





                      <span
                        className={`

                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold


                        ${
                          item.status==="CONFIRMED"

                          ?

                          "bg-green-500/10 text-green-400"

                          :

                          item.status==="CANCELLED"

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





                  </div>


                ))
              }





            </div>


          )
        }






      </section>





    </main>


  );

}