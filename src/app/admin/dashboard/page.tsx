"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/StatCard";


type Reservation = {
  id: number;
  name: string;
  time: string;
  guests: string;
  status: string;
};


type Stats = {
  total: number;
  pending: number;
  confirmed: number;
  today: number;
};



export default function DashboardPage() {


  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    today: 0,
  });



  const [reservations, setReservations] =
    useState<Reservation[]>([]);



  const [loading, setLoading] =
    useState(true);



  useEffect(() => {


    const loadDashboard = async () => {


      try {


        const response =
          await fetch("/api/admin/dashboard");


        const data =
          await response.json();



        if (!response.ok) {

          throw new Error(
            data.error || "Failed to load dashboard"
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



      } catch(error) {


        console.error(
          "Dashboard error:",
          error
        );


      } finally {


        setLoading(false);


      }


    };



    loadDashboard();



  }, []);





  if (loading) {


    return (

      <div
      className="
      text-neutral-400
      "
      >

        Loading dashboard...

      </div>

    );


  }






  return (

    <div>


      <h1
      className="
      text-4xl
      font-bold
      "
      >
        Dashboard
      </h1>



      <p
      className="
      text-neutral-500
      mt-2
      "
      >
        Restaurant overview
      </p>






      <div
      className="
      grid
      grid-cols-1
      md:grid-cols-4
      gap-6
      mt-10
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







      <div
      className="
      mt-12
      bg-[#111]
      border
      border-neutral-800
      rounded-2xl
      p-6
      "
      >



        <h2
        className="
        text-2xl
        font-bold
        mb-6
        "
        >
          Today&apos;s reservations
        </h2>





        {
          reservations.length === 0 ? (


            <p
            className="
            text-neutral-500
            "
            >
              No reservations today
            </p>



          ) : (



            <div
            className="
            space-y-4
            "
            >


              {
                reservations.map((item)=>(


                  <div

                  key={item.id}

                  className="
                  flex
                  justify-between
                  items-center
                  bg-neutral-900
                  rounded-xl
                  p-4
                  "

                  >



                    <div>


                      <p
                      className="
                      font-semibold
                      "
                      >
                        {item.name}
                      </p>


                      <p
                      className="
                      text-neutral-400
                      "
                      >
                        {item.time}
                      </p>


                    </div>





                    <div
                    className="
                    text-right
                    "
                    >


                      <p>
                        {item.guests} guests
                      </p>



                      <p
                      className="
                      text-yellow-500
                      text-sm
                      "
                      >
                        {item.status}
                      </p>



                    </div>



                  </div>


                ))
              }


            </div>



          )
        }





      </div>




    </div>

  );


}