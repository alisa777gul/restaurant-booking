"use client";

import {
  useEffect,
  useState,
} from "react";


type WorkingHour = {
  id: number;
  day: string;
  open: string;
  close: string;
  closed: boolean;
  slotDuration: number;
};


type EditableField =
  | "open"
  | "close"
  | "closed"
  | "slotDuration";



export default function SettingsPage() {


  const [hours, setHours] =
    useState<WorkingHour[]>([]);


  const [loading, setLoading] =
    useState(true);


  const [saving, setSaving] =
    useState(false);



  useEffect(() => {


    async function loadHours(){


      try{


        const res =
          await fetch(
            "/api/admin/settings/working-hours"
          );


        const data =
          await res.json();



        if(Array.isArray(data)){

          setHours(data);

        }



      }
      catch(error){

        console.error(
          "Loading hours error:",
          error
        );

      }
      finally{

        setLoading(false);

      }


    }



    loadHours();


  }, []);







  function updateHour(
    index:number,
    field:EditableField,
    value:string | boolean | number
  ){


    setHours(prev =>

      prev.map((item,i)=>

        i === index

        ?

        {
          ...item,
          [field]:value
        }

        :

        item

      )

    );


  }








  async function save(){


    try{


      setSaving(true);



      await fetch(
        "/api/admin/settings/working-hours",
        {

          method:"PUT",

          headers:{
            "Content-Type":"application/json",
          },

          body:
            JSON.stringify(hours)

        }
      );


    }
    catch(error){

      console.error(
        "Saving error:",
        error
      );


    }
    finally{

      setSaving(false);

    }


  }









  if(loading){

    return (

      <div
        className="
        h-40
        flex
        items-center
        justify-center
        text-neutral-500
        "
      >

        Loading settings...

      </div>

    );

  }









  return (

    <section className="w-full">


      <div className="mb-8">


        <h1
          className="
          text-3xl
          sm:text-4xl
          font-bold
          "
        >

          Settings

        </h1>


        <p
          className="
          mt-2
          text-neutral-500
          "
        >

          Manage restaurant working hours

        </p>


      </div>









      <div
        className="
        bg-white
        dark:bg-neutral-950

        border
        border-neutral-200
        dark:border-neutral-800

        rounded-3xl

        p-5
        sm:p-8

        space-y-5
        "
      >





        {
          hours.map((item,index)=>(


            <div

              key={item.id}

              className="
              flex
              flex-col
              lg:flex-row

              lg:items-center
              lg:justify-between

              gap-5

              pb-5

              border-b
              border-neutral-200
              dark:border-neutral-800
              "

            >






              <div>


                <h2
                  className="
                  font-bold
                  text-lg
                  "
                >

                  {item.day}

                </h2>



                <p
                  className="
                  text-sm
                  text-neutral-500
                  "
                >

                  Restaurant opening hours

                </p>


              </div>









              <div
                className="
                flex
                flex-wrap
                items-center
                gap-3
                "
              >





                <input

                  type="time"

                  value={item.open}

                  disabled={item.closed}

                  onChange={(e)=>

                    updateHour(
                      index,
                      "open",
                      e.target.value
                    )

                  }

                  className="
                  rounded-xl
                  border
                  border-neutral-300
                  dark:border-neutral-700

                  bg-white
                  dark:bg-neutral-900

                  px-3
                  py-2
                  "

                />





                <span>
                  -
                </span>





                <input

                  type="time"

                  value={item.close}

                  disabled={item.closed}

                  onChange={(e)=>

                    updateHour(
                      index,
                      "close",
                      e.target.value
                    )

                  }

                  className="
                  rounded-xl
                  border
                  border-neutral-300
                  dark:border-neutral-700

                  bg-white
                  dark:bg-neutral-900

                  px-3
                  py-2
                  "

                />







                <select

                  value={item.slotDuration}

                  disabled={item.closed}

                  onChange={(e)=>

                    updateHour(
                      index,
                      "slotDuration",
                      Number(e.target.value)
                    )

                  }


                  className="
                  rounded-xl
                  border
                  border-neutral-300
                  dark:border-neutral-700

                  bg-white
                  dark:bg-neutral-900

                  px-3
                  py-2
                  "

                >

                  <option value={15}>
                    15 min
                  </option>


                  <option value={30}>
                    30 min
                  </option>


                  <option value={60}>
                    60 min
                  </option>


                </select>









                <label
                  className="
                  flex
                  items-center
                  gap-2

                  cursor-pointer

                  text-sm
                  "
                >

                  <input

                    type="checkbox"

                    checked={item.closed}

                    onChange={(e)=>

                      updateHour(
                        index,
                        "closed",
                        e.target.checked
                      )

                    }

                  />


                  Closed


                </label>





              </div>







            </div>


          ))
        }









        <button

          onClick={save}

          disabled={saving}

          className="
          mt-4

          bg-blue-600
          hover:bg-blue-700

          disabled:opacity-50

          text-white

          px-6
          py-3

          rounded-2xl

          font-semibold

          transition
          "

        >

          {
            saving
            ?
            "Saving..."
            :
            "Save changes"
          }


        </button>





      </div>


    </section>

  );


}