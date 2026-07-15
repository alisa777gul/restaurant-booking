import Link from "next/link";


export default function Home() {

  return (

    <main
      className="
      min-h-screen
      bg-[#0b0b0b]
      text-white
      "
    >



      {/* HEADER */}

      <header
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        py-6
        flex
        items-center
        justify-between
        "
      >


        <div
          className="
          text-lg
          sm:text-xl
          font-semibold
          tracking-[0.3em]
          "
        >
          LA CASA
        </div>




        <nav
          className="
          hidden
          md:flex
          items-center
          gap-10
          text-sm
          text-neutral-400
          "
        >

          <a
            href="#menu"
            className="hover:text-white transition"
          >
            Menu
          </a>


          <a
            href="#about"
            className="hover:text-white transition"
          >
            About
          </a>


          <a
            href="#contact"
            className="hover:text-white transition"
          >
            Contact
          </a>


        </nav>




        <Link

          href="/reservation"

          className="
          rounded-full
          border
          border-yellow-500
          px-5
          py-2.5
          text-sm
          text-yellow-500
          hover:bg-yellow-500
          hover:text-black
          transition
          "

        >

          Book

        </Link>



      </header>







      {/* HERO */}


      <section

        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        pt-16
        sm:pt-24
        pb-24
        sm:pb-32
        "

      >


        <div
          className="
          max-w-4xl
          "
        >



          <p
            className="
            uppercase
            tracking-[0.35em]
            sm:tracking-[0.5em]
            text-yellow-500
            text-xs
            sm:text-sm
            mb-6
            sm:mb-8
            "
          >

            Fine Dining Experience

          </p>





          <h1

            className="
            text-5xl
            sm:text-7xl
            lg:text-8xl
            font-bold
            leading-[0.9]
            "

          >

            Taste
            <br />
            The Art

          </h1>





          <p

            className="
            mt-6
            sm:mt-8
            text-base
            sm:text-lg
            text-neutral-400
            max-w-xl
            leading-relaxed
            "

          >

            Discover modern cuisine crafted with passion,
            premium ingredients and unforgettable atmosphere.

          </p>





          <Link

            href="/reservation"

            className="
            inline-flex
            mt-8
            sm:mt-10
            rounded-full
            bg-yellow-500
            px-7
            sm:px-8
            py-4
            text-black
            font-semibold
            hover:bg-yellow-400
            active:scale-95
            transition
            "

          >

            Rezervovať stôl

          </Link>



        </div>


      </section>









      {/* FEATURES */}


      <section

        id="menu"

        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        pb-20
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
        sm:gap-6
        "

      >





        <div

          className="
          group
          border
          border-neutral-800
          rounded-3xl
          p-6
          sm:p-8
          bg-neutral-950
          hover:border-yellow-500/50
          transition
          "

        >

          <h3
            className="
            text-xl
            font-semibold
            "
          >

            Fresh Ingredients

          </h3>


          <p
            className="
            mt-3
            text-neutral-400
            leading-relaxed
            "
          >

            Carefully selected products from local suppliers.

          </p>


        </div>







        <div

          className="
          border
          border-neutral-800
          rounded-3xl
          p-6
          sm:p-8
          bg-neutral-950
          hover:border-yellow-500/50
          transition
          "

        >


          <h3
            className="
            text-xl
            font-semibold
            "
          >

            Private Events

          </h3>



          <p
            className="
            mt-3
            text-neutral-400
            leading-relaxed
            "
          >

            Elegant space for special occasions.

          </p>


        </div>









        <div

          className="
          border
          border-neutral-800
          rounded-3xl
          p-6
          sm:p-8
          bg-neutral-950
          hover:border-yellow-500/50
          transition
          "

        >


          <h3
            className="
            text-xl
            font-semibold
            "
          >

            Reservation

          </h3>



          <p
            className="
            mt-3
            text-neutral-400
            leading-relaxed
            "
          >

            Book your table quickly online.

          </p>


        </div>





      </section>






      {/* FOOTER ADMIN LINK */}


      <footer

        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        pb-8
        text-center
        "

      >


        <Link

          href="/admin/login"

          className="
          text-xs
          text-neutral-700
          hover:text-neutral-400
          transition
          "

        >

          Admin

        </Link>


      </footer>




    </main>

  );

}