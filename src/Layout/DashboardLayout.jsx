import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const activeStyle = ({ isActive }) =>
    isActive
      ? "bg-primary text-white"
      : "hover:bg-base-300";

  return (
    <div className="min-h-screen grid grid-cols-12">
      
      {/* Sidebar */}
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-base-200 p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <ul className="menu gap-2">
          <li>
            <NavLink to="/dashboard" className={activeStyle}>
              Dashboard Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile" className={activeStyle}>
              My Profile
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/my-contests" className={activeStyle}>
              My Contests
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/submit" className={activeStyle}>
              Submit Contest
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;