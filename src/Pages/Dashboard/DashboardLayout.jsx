import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const DashboardLayout = () => {
  const { role } = useContext(AuthContext);

  const activeStyle = ({ isActive }) =>
    isActive
      ? "bg-primary text-white rounded-md"
      : "hover:bg-base-300 rounded-md";

  return (
    <div className="min-h-screen grid grid-cols-12 mt-18">
      
      {/* ===== Sidebar ===== */}
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-base-200 p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <ul className="menu gap-2">

          {/* Common */}
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

          {/* ===== USER ===== */}
          {role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/participated" className={activeStyle}>
                  My Participated
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/winning" className={activeStyle}>
                  My Winning
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile" className={activeStyle}>
                  My Profile
                </NavLink>
              </li>
            </>
          )}

          {/* ===== CREATOR ===== */}
          {(role === "creator" || role === "admin") && (
            <>
              <li className="mt-4 font-semibold text-sm text-gray-500">
                Creator Panel
              </li>

              <li>
                <NavLink to="/dashboard/add-contest" className={activeStyle}>
                  Add Contest
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-contests" className={activeStyle}>
                  My Contests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/submissions" className={activeStyle}>
                  Submissions
                </NavLink>
              </li>
            </>
          )}

          {/* ===== ADMIN ===== */}
          {role === "admin" && (
            <>
              <li className="mt-4 font-semibold text-sm text-gray-500">
                Admin Panel
              </li>

              <li>
                <NavLink to="/dashboard/manage-users" className={activeStyle}>
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-contests" className={activeStyle}>
                  Manage Contests
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;