import { prisma } from "@/lib/prisma";


export default async function AdminPage() {


  const reservations =
    await prisma.reservation.findMany({

      orderBy: {
        id: "desc",
      },

    });



  return (

    <main className="
      min-h-screen
      bg-[#0b0b0b]
      text-white
      px-6
      py-20
    ">


      <section className="
        max-w-6xl
        mx-auto
      ">


        <h1 className="
          text-4xl
          font-bold
          mb-10
        ">
          Reservations
        </h1>



        <div className="
          overflow-x-auto
        ">


          <table className="
            w-full
            border-collapse
          ">


            <thead>


              <tr className="
                text-left
                border-b
                border-neutral-700
                text-neutral-400
              ">


                <th className="p-4">
                  Date
                </th>


                <th className="p-4">
                  Time
                </th>


                <th className="p-4">
                  Name
                </th>


                <th className="p-4">
                  Phone
                </th>


                <th className="p-4">
                  Guests
                </th>


              </tr>


            </thead>





            <tbody>


              {reservations.map((reservation)=>(


                <tr

                  key={reservation.id}

                  className="
                    border-b
                    border-neutral-800
                  "

                >


                  <td className="p-4">
                    {reservation.date}
                  </td>


                  <td className="p-4">
                    {reservation.time}
                  </td>


                  <td className="p-4">
                    {reservation.name}
                  </td>


                  <td className="p-4">
                    {reservation.phone}
                  </td>


                  <td className="p-4">
                    {reservation.guests}
                  </td>


                </tr>


              ))}


            </tbody>



          </table>


        </div>



      </section>


    </main>

  );

}