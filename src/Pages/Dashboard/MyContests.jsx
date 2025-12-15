import { useEffect, useState } from "react";
import axios from "../../Api/axiosInstance";
import toast from "react-hot-toast";

export default function ManageContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/contests")
      .then((res) => setContests(res.data))
      .catch(() => toast.error("Failed to load contests"))
      .finally(() => setLoading(false));
  }, []);

  const approveContest = async (id) => {
    try {
      await axios.patch(`/contests/${id}/approve`);
      setContests((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: "approved" } : c
        )
      );
      toast.success("Contest approved");
    } catch {
      toast.error("Approval failed");
    }
  };

  const deleteContest = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      await axios.delete(`/contests/${id}`);
      setContests((prev) => prev.filter((c) => c._id !== id));
      toast.success("Contest deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p>Loading contests...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Contests</h1>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Creator</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contests.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.creatorEmail}</td>
              <td className="capitalize">{c.status}</td>
              <td className="flex gap-2">
                {c.status === "pending" && (
                  <button
                    onClick={() => approveContest(c._id)}
                    className="btn btn-xs btn-success"
                  >
                    Confirm
                  </button>
                )}
                <button
                  onClick={() => deleteContest(c._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
