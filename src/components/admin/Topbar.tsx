export default function Topbar() {
  return (

    <header

      className="
      min-h-16
      sm:min-h-20

      border-b
      border-neutral-800

      flex
      items-center
      justify-between

      px-4
      sm:px-6
      lg:px-10

      gap-4

      "

    >


      {/* TITLE */}

      <div className="min-w-0">


        <h2

          className="
          text-lg
          sm:text-2xl

          font-bold

          truncate

          "

        >

          Restaurant Dashboard

        </h2>



        <p

          className="
          text-neutral-500

          text-sm

          hidden
          sm:block

          "

        >

          Manage reservations

        </p>


      </div>









      {/* USER */}


      <div

        className="
        flex
        items-center
        gap-3

        "

      >



        <div

          className="
          w-10
          h-10

          sm:w-11
          sm:h-11

          rounded-full

          bg-yellow-500

          flex
          items-center
          justify-center

          text-black

          font-bold

          shrink-0

          "

        >

          A

        </div>





        <div

          className="
          hidden
          sm:block

          "

        >


          <p

            className="
            font-semibold
            text-sm
            "

          >

            Administrator

          </p>



          <p

            className="
            text-sm
            text-neutral-500

            "

          >

            Online

          </p>



        </div>



      </div>




    </header>

  );
}