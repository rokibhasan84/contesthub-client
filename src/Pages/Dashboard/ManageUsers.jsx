import { useEffect, useState } from "react";
import axios from "../../Api/axiosInstance";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all users
  useEffect(() => {
    axios
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load users");
      })
      .finally(() => setLoading(false));
  }, []);

  // update role
  const updateRole = async (email, role) => {
    try {
      await axios.put(`/users/${encodeURIComponent(email)}/role`, { role });
      
      // update UI instantly
      setUsers((prev) =>
        prev.map((u) =>
          u.email === email ? { ...u, role } : u
        )
      );

      toast.success(`Role updated to ${role}`);
    } catch (err) {
      toast.error("Role update failed");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th className="pl-18">Email</th>
              <th>Role</th>
              <th className="pl-18">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, index) => (
              <tr key={u._id}>
                <td>{index +1}</td>
                <td>{u.name || "N/A"}</td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => updateRole(u.email, "user")}
                    className="btn btn-xs"
                  >
                    User
                  </button>
                  <button
                    onClick={() => updateRole(u.email, "creator")}
                    className="btn btn-xs btn-success"
                  >
                    Creator
                  </button>
                  <button
                    onClick={() => updateRole(u.email, "admin")}
                    className="btn btn-xs btn-warning"
                  >
                    Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
