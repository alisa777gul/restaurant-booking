"use client";

import { useEffect, useState } from "react";


type Time = {
  id: number;
  time: string;
};



export default function SettingsPage() {


  const [times, setTimes] = useState<Time[]>([]);
  const [newTime, setNewTime] = useState("");

  const [loading, setLoading] = useState(false);



  const loadTimes = async () => {

    const response =
      await fetch("/api/settings/times");


    const data =
      await response.json();


    setTimes(data);

  };



useEffect(() => {

  let ignore = false;


  const fetchTimes = async () => {

    const response =
      await fetch("/api/settings/times");


    const data =
      await response.json();


    if (!ignore) {
      setTimes(data);
    }

  };


  fetchTimes();


  return () => {
    ignore = true;
  };


}, []);




  const addTime = async () => {


    if (!newTime) return;


    setLoading(true);



    await fetch(
      "/api/settings/times",
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json",
        },


        body:JSON.stringify({

          time:newTime,

        }),

      }
    );



    setNewTime("");

    await loadTimes();


    setLoading(false);


  };






  const deleteTime = async (
    id:number
  ) => {


    await fetch(
      `/api/settings/times/${id}`,
      {

        method:"DELETE",

      }
    );



    loadTimes();


  };






  return (

    <main className="
      min-h-screen
      bg-[#0b0b0b]
      text-white
      px-6
      py-20
    ">


      <section className="
        max-w-3xl
        mx-auto
      ">



        <h1 className="
          text-4xl
          font-bold
          mb-10
        ">
          Reservation Settings
        </h1>





        <div className="
          bg-neutral-900
          rounded-2xl
          p-6
          border
          border-neutral-800
        ">


          <h2 className="
            text-xl
            font-semibold
            mb-6
          ">
            Available times
          </h2>





          <div className="
            grid
            gap-3
          ">



            {times.map((item)=>(


              <div

                key={item.id}

                className="
                  flex
                  items-center
                  justify-between
                  bg-neutral-800
                  rounded-xl
                  px-5
                  py-3
                "

              >


                <span>
                  {item.time}
                </span>



                <button

                  onClick={()=>
                    deleteTime(item.id)
                  }


                  className="
                    text-red-400
                    hover:text-red-300
                  "

                >
                  Delete
                </button>



              </div>


            ))}



          </div>





          <div className="
            flex
            gap-3
            mt-8
          ">


            <input

              type="time"

              value={newTime}

              onChange={(e)=>
                setNewTime(e.target.value)
              }


              className="
                flex-1
                rounded-xl
                bg-neutral-800
                border
                border-neutral-700
                px-4
                py-3
              "

            />



            <button

              onClick={addTime}

              disabled={loading}


              className="
                bg-yellow-500
                text-black
                px-6
                rounded-xl
                font-semibold
              "

            >

              Add

            </button>



          </div>




        </div>




      </section>


    </main>

  );

}