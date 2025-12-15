import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.displayName}
      </h1>

      <p className="text-lg">
        This is your dashboard home.
      </p>
    </div>
  );
};

export default DashboardHome;