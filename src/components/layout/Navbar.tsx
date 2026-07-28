import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="w-full bg-linear-to-b from-background via-background/60 not-md:bg-background not-md:shadow ">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto p-4">
        <Link
          href="/"
          className="group flex items-center justify-between gap-2 select-none"
          draggable={false}
        >
          <img
            src="/logo.svg"
            alt="Pacorux"
            className="w-5 md:w-5.5 aspect-square group-hover:scale-105 group-active:scale-90 transition-transform duration-200"
            draggable={false}
            height={22}
            width={22}
          />
          <h2 className="text-lg md:text-xl font-semibold tracking-tight transition-colors duration-200 bg-linear-to-r from-accent to-accent-hover bg-clip-text group-hover:text-transparent">
            Transfer
          </h2>
        </Link>
      </div>
    </nav>
  );
}
