type Props = {
  title: string;
  value: number;
  icon?: React.ReactNode;
};


export default function StatCard({
  title,
  value,
  icon,
}: Props) {


  return (

    <div

      className="
      group

      relative
      overflow-hidden

      rounded-3xl

      border
      border-neutral-200
      dark:border-neutral-800

      bg-white
      dark:bg-neutral-950

      p-5
      sm:p-6

      shadow-sm
      hover:shadow-xl

      transition-all
      duration-300

      hover:-translate-y-1

      "

    >


      {/* glow */}


      <div
        className="
        absolute

        -top-10
        -right-10

        w-32
        h-32

        rounded-full

        bg-blue-500/10

        blur-3xl

        group-hover:bg-blue-500/20

        transition
        "
      />





      <div
        className="
        relative

        flex
        items-start
        justify-between

        "
      >



        <div>


          <p

            className="
            text-sm

            text-neutral-500

            font-medium

            "

          >

            {title}

          </p>




          <p

            className="
            mt-3

            text-4xl
            sm:text-5xl

            font-bold

            tracking-tight

            text-neutral-900
            dark:text-white

            "

          >

            {value}

          </p>



        </div>





        {
          icon && (

            <div

              className="
              w-12
              h-12

              rounded-2xl

              flex
              items-center
              justify-center


              bg-blue-500/10

              text-blue-500


              group-hover:scale-110

              transition

              "

            >

              {icon}

            </div>

          )
        }



      </div>






      {/* bottom line */}


      <div

        className="
        mt-6

        flex
        items-center
        gap-2

        text-xs

        text-neutral-500

        "

      >

        <span
          className="
          w-2
          h-2

          rounded-full

          bg-green-500
          "
        />

        Updated live


      </div>




    </div>

  );

}