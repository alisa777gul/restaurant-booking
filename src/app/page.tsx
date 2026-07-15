export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">

        <div className="text-xl font-semibold tracking-widest">
          LA CASA
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-neutral-300">
          <a href="#">Menu</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>

        <button className="rounded-full border border-yellow-500 px-5 py-2 text-sm text-yellow-500 hover:bg-yellow-500 hover:text-black transition">
          Book
        </button>

      </header>


      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32">

        <div className="max-w-3xl">

          <p className="uppercase tracking-[0.5em] text-yellow-500 text-sm mb-8">
            Fine Dining Experience
          </p>

          <h1 className="text-6xl md:text-8xl font-bold leading-none">
            Taste
            <br />
            The Art
          </h1>

          <p className="mt-8 text-lg text-neutral-400 max-w-xl">
            Discover modern cuisine crafted with passion,
            premium ingredients and unforgettable atmosphere.
          </p>


          <button className="mt-10 rounded-full bg-yellow-500 px-8 py-4 text-black font-semibold hover:scale-105 transition">
            Rezervovať stôl
          </button>

        </div>

      </section>


      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">

        <div className="border border-neutral-800 rounded-2xl p-8">
          <h3 className="text-xl font-semibold">
            Fresh Ingredients
          </h3>

          <p className="mt-3 text-neutral-400">
            Carefully selected products from local suppliers.
          </p>
        </div>


        <div className="border border-neutral-800 rounded-2xl p-8">
          <h3 className="text-xl font-semibold">
            Private Events
          </h3>

          <p className="mt-3 text-neutral-400">
            Elegant space for special occasions.
          </p>
        </div>


        <div className="border border-neutral-800 rounded-2xl p-8">
          <h3 className="text-xl font-semibold">
            Reservation
          </h3>

          <p className="mt-3 text-neutral-400">
            Book your table quickly online.
          </p>
        </div>

      </section>

    </main>
  );
}