import { Outlet } from "react-router-dom";
import { Nav } from "@/Nav";

export function Layout() {
  return (
    <>
      <header className="p-4 border-b">
        <Nav />
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
