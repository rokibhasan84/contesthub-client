export const DashboardSidebar = ({ close }) => {
  return (
    <ul className="menu p-4">
      <li>
        <NavLink to="/dashboard" onClick={close}>
          Dashboard Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/profile" onClick={close}>
          My Profile
        </NavLink>
      </li>
    </ul>
  );
};