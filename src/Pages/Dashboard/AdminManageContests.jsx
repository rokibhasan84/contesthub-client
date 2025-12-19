import { useEffect, useState } from "react";
import axios from "../../Api/axiosInstance";
import toast from "react-hot-toast";

export default function AdminManageContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/contests")
      .then((res) => setContests(res.data))
      .catch(() => toast.error("Failed to load contests"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this contest?")) return;

    try {
      await axios.delete(`/contests/${id}`);
      setContests((prev) => prev.filter((c) => c._id !== id));
      toast.success("Contest deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Contests (Admin)</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Creator</th>
              <th>Status</th>
              <th>Participants</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {contests.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.creatorEmail}</td>
                <td className="capitalize">{c.status}</td>
                <td>{c.participants.length}</td>
                <td>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {contests.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No contests found
          </p>
        )}
      </div>
    </div>
  );
}
