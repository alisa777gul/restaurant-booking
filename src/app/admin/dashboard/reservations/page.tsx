"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, Users, Mail, Phone, Check, X, Trash2 } from "lucide-react";


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



export default function ReservationsPage(){

  const [reservations,setReservations] = useState<Reservation[]>([]);
  const [loading,setLoading] = useState(true);


  useEffect(()=>{

    let cancelled = false;

    async function load(){

      try{

        const res = await fetch("/api/admin/reservations");
        const data = await res.json();

        if(!cancelled){
          setReservations(Array.isArray(data) ? data : []);
        }

      }catch(error){

        console.error(error);

        if(!cancelled) setReservations([]);

      }finally{

        if(!cancelled) setLoading(false);

      }

    }

    load();

    return ()=> {
      cancelled = true;
    };

  },[]);



  async function changeStatus(id:number,status:string){

    setReservations(prev =>
      prev.map(item =>
        item.id === id
        ? {...item,status}
        : item
      )
    );


    await fetch(`/api/admin/reservations/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({status})
    });

  }



  async function remove(id:number){

    setReservations(prev =>
      prev.filter(item=>item.id!==id)
    );


    await fetch(`/api/admin/reservations/${id}`,{
      method:"DELETE"
    });

  }



  if(loading){

    return (
      <div className="
      flex items-center justify-center
      min-h-75
      text-neutral-500
      ">
        Loading reservations...
      </div>
    );

  }



  return (

    <section className="space-y-8">


      <div>

        <h1 className="
        text-3xl
        sm:text-4xl
        font-bold
        tracking-tight
        ">
          Reservations
        </h1>


        <p className="
        mt-2
        text-neutral-500
        ">
          Manage your bookings and customers
        </p>

      </div>




      {
        reservations.length === 0 ? (

          <div className="
          rounded-3xl
          border
          border-neutral-200
          dark:border-neutral-800

          bg-white
          dark:bg-neutral-950

          p-10

          text-center
          text-neutral-500
          ">
            No reservations yet
          </div>

        ) : (


          <div className="space-y-4">


            {
              reservations.map(item=>(

                <div
                  key={item.id}
                  className="
                  rounded-3xl

                  border
                  border-neutral-200
                  dark:border-neutral-800

                  bg-white
                  dark:bg-neutral-950

                  p-5
                  sm:p-6

                  shadow-sm
                  hover:shadow-lg

                  transition
                  "
                >


                  <div className="
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-6
                  ">


                    <div className="flex items-center gap-4">


                      <div className="
                      w-12
                      h-12
                      rounded-2xl

                      bg-blue-500/10

                      text-blue-500

                      flex
                      items-center
                      justify-center

                      font-bold
                      ">
                        {item.name[0]}
                      </div>



                      <div>

                        <h3 className="
                        font-bold
                        text-lg
                        ">
                          {item.name}
                        </h3>


                        <div className="
                        flex
                        flex-wrap
                        gap-3
                        text-sm
                        text-neutral-500
                        mt-1
                        ">

                          <span className="flex gap-1 items-center">
                            <Phone size={14}/>
                            {item.phone}
                          </span>


                          <span className="flex gap-1 items-center">
                            <Mail size={14}/>
                            {item.email}
                          </span>

                        </div>

                      </div>


                    </div>





                    <span className={`
                    px-4
                    py-2
                    rounded-full
                    text-xs
                    font-semibold
                    w-fit

                    ${
                      item.status==="CONFIRMED"
                      ?"bg-green-500/10 text-green-500"
                      :
                      item.status==="CANCELLED"
                      ?"bg-red-500/10 text-red-500"
                      :
                      "bg-yellow-500/10 text-yellow-500"
                    }
                    `}>
                      {item.status}
                    </span>


                  </div>





                  <div className="
                  grid
                  grid-cols-2
                  sm:grid-cols-3
                  gap-4
                  mt-6

                  text-sm
                  ">


                    <Info 
                      icon={<CalendarDays size={15}/>}
                      label="Date"
                      value={item.date}
                    />


                    <Info 
                      icon={<Clock size={15}/>}
                      label="Time"
                      value={item.time}
                    />


                    <Info 
                      icon={<Users size={15}/>}
                      label="Guests"
                      value={item.guests}
                    />


                  </div>




                  <div className="
                  flex
                  flex-wrap
                  gap-3
                  mt-6
                  ">


                    <button
                      onClick={()=>changeStatus(item.id,"CONFIRMED")}
                      className="
                      flex items-center gap-2

                      px-4 py-2

                      rounded-xl

                      bg-green-500/10
                      text-green-500

                      hover:bg-green-500/20

                      transition
                      "
                    >
                      <Check size={16}/>
                      Confirm
                    </button>



                    <button
                      onClick={()=>changeStatus(item.id,"CANCELLED")}
                      className="
                      flex items-center gap-2

                      px-4 py-2

                      rounded-xl

                      bg-red-500/10
                      text-red-500

                      hover:bg-red-500/20

                      transition
                      "
                    >
                      <X size={16}/>
                      Cancel
                    </button>



                    <button
                      onClick={()=>remove(item.id)}
                      className="
                      flex items-center gap-2

                      px-4 py-2

                      rounded-xl

                      bg-neutral-100
                      dark:bg-neutral-900

                      text-neutral-500

                      hover:text-red-500

                      transition
                      "
                    >
                      <Trash2 size={16}/>
                      Delete
                    </button>


                  </div>



                </div>

              ))
            }


          </div>

        )
      }


    </section>

  );

}





function Info({
  icon,
  label,
  value
}:{
  icon:React.ReactNode;
  label:string;
  value:string;
}){

  return (

    <div>

      <p className="
      text-neutral-500
      flex
      items-center
      gap-2
      ">
        {icon}
        {label}
      </p>


      <p className="font-medium mt-1">
        {value}
      </p>

    </div>

  );

}