import { Outlet } from "react-router-dom";
import { Nav } from "@/Nav";

export function Layout() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="min-h-screen p-4 bg-gradient-to-br dark:from-primary/30 via-primary-dark/10 dark:to-primary-light/20">
        <Outlet />
      </main>
    </>
  );
}
