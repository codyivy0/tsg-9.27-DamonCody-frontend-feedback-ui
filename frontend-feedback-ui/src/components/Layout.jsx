// wrapper component to put other components in (copied for other pages)

import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b border-slate-600 bg-slate-800">
        <nav className="mx-auto max-w-7xl px-6 py-4 flex gap-6">
          <NavLink
            to="submit-review"
            className="text-white hover:text-blue-400 hover:underline transition-colors"
          >
            Submit Review
          </NavLink>
          <NavLink
            to="reviews"
            className="text-white hover:text-blue-400 hover:underline transition-colors"
          >
            See Reviews
          </NavLink>
        </nav>
      </header>

      <main className="flex-1 bg-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
