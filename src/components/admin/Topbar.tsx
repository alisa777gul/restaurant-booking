export default function Topbar() {
  return (
    <header className="h-20 border-b border-neutral-800 flex items-center justify-between px-10">
      <div>
        <h2 className="text-2xl font-bold">
          Restaurant Dashboard
        </h2>

        <p className="text-neutral-500">
          Manage reservations
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
          A
        </div>

        <div>
          <p className="font-semibold">
            Administrator
          </p>

          <p className="text-sm text-neutral-500">
            Online
          </p>
        </div>
      </div>
    </header>
  );
}