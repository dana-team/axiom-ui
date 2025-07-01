import { Outlet } from "react-router-dom";
import { Nav } from "@/Nav";

export function Layout() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
