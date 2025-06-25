export default function Navbar() {
  return (
    <header className="w-full bg-second p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">HR Dashboard</h1>
      <div>
        <button className="bg-first px-4 py-2 rounded-xl hover:bg-third text-white transition">
          Dark/Light
        </button>
      </div>
    </header>
  );
}
