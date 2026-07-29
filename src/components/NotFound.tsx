import { Link } from "wouter";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-16 pb-8 select-none">
      <div className="text-center">
        <h2 className="text-6xl text-danger font-extrabold">404</h2>
        <p className="text-lg text-danger-soft-foreground">No Encontrado</p>
      </div>

      <Link href="/" className="link">
        👉🏽 Volver a inicio
      </Link>
    </div>
  );
}
