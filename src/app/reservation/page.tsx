/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState,useEffect } from "react";
import Calendar from "@/components/Calendar";


export default function ReservationPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");

  const [reservedTimes, setReservedTimes] = useState<string[]>([]);
const [times, setTimes] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  


  const formatDate = (date: Date) => {

    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

  };


  const date = selectedDate
    ? formatDate(selectedDate)
    : "";



 const handleDateChange = async (
  date: Date | undefined
) => {

  setSelectedDate(date);

  setTime("");

  setError("");

  setSuccess(false);

  if (!date) {

    setReservedTimes([]);
    setTimes([]);

    return;

  }

  const formattedDate = formatDate(date);

  try {

    // занятые часы

    const reservedResponse =
      await fetch(
        "/api/reservations/available",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: formattedDate,
          }),
        }
      );

    const reservedData =
      await reservedResponse.json();

    setReservedTimes(
      reservedData.reservedTimes || []
    );



    // доступные часы именно этой даты

    const slotResponse =
      await fetch(
        `/api/admin/times?date=${formattedDate}`
      );

    const slotData =
      await slotResponse.json();

    setTimes(
      slotData.map(
        (item:{time:string}) => item.time
      )
    );

  }

  catch {

    setReservedTimes([]);
    setTimes([]);

    setError(
      "Could not load available times"
    );

  }

};



  const handleSubmit = async () => {


    setError("");

    setSuccess(false);



    if (
      !name ||
      !phone ||
      !email ||
      !date ||
      !time ||
      !guests
    ) {


      setError(
        "Please fill in all fields"
      );


      return;

    }




    const emailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);



    if (!emailValid) {


      setError(
        "Please enter a valid email"
      );


      return;

    }




    setLoading(true);



    try {



      const checkResponse =
        await fetch(
          "/api/reservations/check",
          {


            method: "POST",


            headers: {
              "Content-Type": "application/json",
            },


            body: JSON.stringify({

              date,
              time,

            }),


          }
        );



      const availability =
        await checkResponse.json();




      if (!availability.available) {


        setError(
          "This time is already reserved"
        );


        return;

      }





      const response =
        await fetch(
          "/api/reservations",
          {


            method: "POST",


            headers: {
              "Content-Type": "application/json",
            },


            body: JSON.stringify({

              name,
              phone,
              email,

              date,
              time,

              guests,

            }),


          }
        );



      const data =
        await response.json();




      if (!response.ok) {


        setError(
          data.error ||
          "Something went wrong"
        );


        return;


      }





      setSuccess(true);



      // очистка формы

      setName("");

      setPhone("");

      setEmail("");

      setSelectedDate(undefined);

      setTime("");

      setGuests("2");

      setReservedTimes([]);



    } catch {


      setError(
        "Server error. Please try again."
      );


    } finally {


      setLoading(false);


    }


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



        <p className="
          text-yellow-500
          uppercase
          tracking-[0.4em]
          text-sm
        ">
          Reservation
        </p>



        <h1 className="
          text-5xl
          font-bold
          mt-6
        ">
          Book your table
        </h1>




        {success && (

          <div className="
            mt-8
            rounded-xl
            bg-green-900/30
            border
            border-green-700
            p-5
          ">

            <p className="
              text-green-400
              font-semibold
            ">
              Reservation successful!
            </p>


            <p className="text-neutral-300 mt-2">
              We will contact you shortly.
            </p>


          </div>

        )}




        {error && (

          <div className="
            mt-8
            rounded-xl
            bg-red-900/30
            border
            border-red-700
            p-5
          ">

            <p className="text-red-400">
              {error}
            </p>


          </div>

        )}







        <div className="
          mt-12
          grid
          gap-6
        ">





          <div>

            <label className="
              block
              mb-3
              text-neutral-300
            ">
              Choose date
            </label>


            <Calendar

              value={selectedDate}

              onChange={handleDateChange}

            />


          </div>








          <div>


            <label className="
              block
              mb-3
              text-neutral-300
            ">
              Choose time
            </label>



            <div className="
              grid
              grid-cols-3
              gap-3
            ">


              {times.map((item)=>(


                <button

                  key={item}

                  type="button"


                  disabled={
                    reservedTimes.includes(item)
                  }


                  onClick={() =>
                    setTime(item)
                  }



                  className={`

                    rounded-xl

                    px-4

                    py-3

                    border

                    transition-all


                    ${
                      time === item

                      ?

                      "bg-yellow-500 text-black border-yellow-500 scale-105"

                      :

                      "bg-neutral-900 border-neutral-700 hover:border-yellow-500"

                    }



                    ${
                      reservedTimes.includes(item)

                      ?

                      "opacity-30 cursor-not-allowed line-through"

                      :

                      ""

                    }


                  `}


                >

                  {item}


                </button>


              ))}


            </div>


          </div>









          <div>

            <label className="
              block
              mb-2
              text-neutral-300
            ">
              Guests
            </label>



            <select

              value={guests}

              onChange={(e)=>
                setGuests(e.target.value)
              }


              className="
                w-full
                rounded-xl
                bg-neutral-900
                border
                border-neutral-700
                px-4
                py-3
              "

            >

              <option value="1">
                1 person
              </option>

              <option value="2">
                2 people
              </option>

              <option value="3">
                3 people
              </option>

              <option value="4">
                4 people
              </option>

              <option value="5">
                5+ people
              </option>


            </select>


          </div>








          <input

            type="text"

            placeholder="Your name"

            value={name}

            onChange={(e)=>
              setName(e.target.value)
            }


            className="
              w-full
              rounded-xl
              bg-neutral-900
              border
              border-neutral-700
              px-4
              py-3
            "

          />






          <input

            type="tel"

            placeholder="+421..."

            value={phone}

            onChange={(e)=>
              setPhone(e.target.value)
            }


            className="
              w-full
              rounded-xl
              bg-neutral-900
              border
              border-neutral-700
              px-4
              py-3
            "

          />







          <input

            type="email"

            placeholder="email@example.com"

            value={email}

            onChange={(e)=>
              setEmail(e.target.value)
            }


            className="
              w-full
              rounded-xl
              bg-neutral-900
              border
              border-neutral-700
              px-4
              py-3
            "

          />








          <button

            onClick={handleSubmit}

            disabled={loading}


            className="
              mt-6
              rounded-full
              bg-yellow-500
              text-black
              py-4
              font-semibold
              hover:scale-105
              transition
              disabled:opacity-50
            "

          >

            {loading
              ? "Sending..."
              : "Continue"
            }


          </button>





        </div>



      </section>


    </main>

  );

}