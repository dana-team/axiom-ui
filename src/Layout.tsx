import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "@/Nav";

export function Layout() {
  const location = useLocation();
  const isNavHidden = location.pathname === "/";

  return (
    <>
      {!isNavHidden && (
        <header className="p-4 border-b">
          <Nav />
        </header>
      )}
      <main className={!isNavHidden ? "p-4" : ""}>
        <Outlet />
      </main>
    </>
  );
}
