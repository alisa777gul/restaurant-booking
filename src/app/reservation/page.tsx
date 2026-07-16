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

<main
className="
min-h-screen

bg-linear-to-br
from-neutral-50
via-white
to-blue-50

dark:from-[#050505]
dark:via-[#09090b]
dark:to-[#111827]

text-neutral-900
dark:text-white

px-4
sm:px-6
py-12
sm:py-20
"
>


<section
className="
max-w-3xl
mx-auto
"
>



<div
className="
text-center
"
>


<div
className="
inline-flex
px-4
py-2
rounded-full

bg-blue-500/10

text-blue-600
dark:text-blue-400

text-sm
font-medium
"
>

✨ Online booking

</div>



<h1
className="
mt-6

text-4xl
sm:text-6xl

font-bold

tracking-tight

"
>

Book your appointment

</h1>



<p
className="
mt-4

text-neutral-500
dark:text-neutral-400

max-w-xl
mx-auto

"
>

Choose a convenient time and reserve your
appointment in seconds.

</p>


</div>









{
success && (

<div
className="
mt-10

rounded-3xl

bg-green-500/10

border
border-green-500/30

p-6

backdrop-blur-xl
"
>

<p
className="
text-green-600
dark:text-green-400

font-semibold
text-lg
"
>
Reservation successful 🎉
</p>


<p
className="
mt-2
text-neutral-600
dark:text-neutral-400
"
>
We will contact you shortly.
</p>


</div>

)

}







{
error && (

<div
className="
mt-10

rounded-3xl

bg-red-500/10

border
border-red-500/30

p-6

text-red-500

"
>

{error}

</div>


)

}










<div
className="
mt-12

rounded-4xl

border

border-neutral-200
dark:border-neutral-800


bg-white/70
dark:bg-neutral-950/70


backdrop-blur-xl


shadow-2xl


p-5
sm:p-8

"
>



<div
className="
grid
gap-6
"
>








<div>

<label
className="
block
mb-3

text-sm
font-medium

text-neutral-700
dark:text-neutral-300

"
>

Select date

</label>


<div
className="
rounded-2xl

border
border-neutral-200
dark:border-neutral-800

p-3

bg-neutral-50
dark:bg-neutral-900

"
>

<Calendar

value={selectedDate}

onChange={handleDateChange}

/>

</div>


</div>









<div>


<label
className="
block
mb-3

text-sm
font-medium

text-neutral-700
dark:text-neutral-300
"
>

Available time

</label>




<div
className="
grid

grid-cols-2
sm:grid-cols-4

gap-3

"
>


{
times.map(item=>(


<button

key={item}

type="button"

disabled={
reservedTimes.includes(item)
}


onClick={()=>
setTime(item)
}


className={`

h-12

rounded-2xl

border

text-sm

font-medium

transition-all


${
time===item

?

"bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20 scale-105"

:

"bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-blue-500"

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


))

}


</div>


</div>










<select

value={guests}

onChange={(e)=>
setGuests(e.target.value)
}


className="
w-full

rounded-2xl

bg-neutral-100
dark:bg-neutral-900

border

border-neutral-200
dark:border-neutral-800

px-5

py-4

outline-none

focus:border-blue-500

transition

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










<input

type="text"

placeholder="Your name"

value={name}

onChange={(e)=>
setName(e.target.value)
}


className="
booking-input
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
booking-input
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
booking-input
"

/>










<button

onClick={handleSubmit}

disabled={loading}


className="
mt-4

w-full

rounded-2xl

bg-blue-600

text-white

py-4

font-semibold

shadow-xl

shadow-blue-500/20

hover:bg-blue-700

hover:scale-[1.02]

transition-all

disabled:opacity-50

"

>

{
loading

?

"Creating booking..."

:

"Confirm appointment"

}


</button>





</div>



</div>





</section>


</main>


);

}