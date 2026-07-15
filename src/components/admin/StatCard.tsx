type Props = {
  title: string;
  value: number;
};


export default function StatCard({
  title,
  value,
}: Props) {


  return (

    <div

      className="
      bg-[#111]

      border
      border-neutral-800

      rounded-xl
      sm:rounded-2xl

      p-4
      sm:p-6

      transition

      hover:border-yellow-500

      "

    >


      <p

        className="
        text-neutral-400

        text-sm
        sm:text-base

        "

      >

        {title}

      </p>



      <p

        className="
        text-3xl
        sm:text-4xl

        font-bold

        mt-2
        sm:mt-3

        "

      >

        {value}

      </p>



    </div>

  );

}