// wrapper component to put other components in (copied for other pages)

import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-4">
        <nav className="mx-auto max-w-6x1 px-4 py-3 flex gap-4">
          <NavLink to="submit-review" className="hover:underline">
            Submit Review
          </NavLink>
          <NavLink to="reviews" className="hover:underline">
            See Reviews
          </NavLink>
        </nav>
      </header>

      <main className="min-h-dvh grid place-items-center bg-slate-900">
        <section className="w-fit gap-20 mx-auto rounded 2x1 border p-6 shadow bg-slate-700">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
