import { useEffect, useState } from "react";
import axios from "../../Api/axiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ManageContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/contests/my")
      .then((res) => setContests(res.data))
      .catch(() => toast.error("Failed to load contests"))
      .finally(() => setLoading(false));
  }, []);

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

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="px-2 md:px-0">
      <h1 className="text-2xl text-center font-bold mb-4">
        Manage Contests
      </h1>

      {/* 🖥 Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
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
                  <Link
                    to={`/dashboard/submissions/${c._id}`}
                    className="btn btn-xs btn-outline"
                  >
                    Submissions
                  </Link>
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

      {/* 📱 Mobile Cards */}
      <div className="md:hidden space-y-4">
        {contests.map((c) => (
          <div
            key={c._id}
            className="bg-base-200 p-4 rounded shadow"
          >
            <p className="font-bold text-lg">{c.name}</p>
            <p className="text-sm">Creator: {c.creatorEmail}</p>
            <p className="capitalize">Status: {c.status}</p>

            <div className="flex gap-2 mt-3">
              <Link
                to={`/dashboard/submissions/${c._id}`}
                className="btn btn-sm btn-outline flex-1"
              >
                Submissions
              </Link>
              <button
                onClick={() => deleteContest(c._id)}
                className="btn btn-sm btn-error flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


