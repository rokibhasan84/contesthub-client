import { useEffect, useState } from "react";
import axios from "../../Api/axiosInstance";
import toast from "react-hot-toast";

export default function MyParticipated() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/contests/participated/my")
      .then((res) => setContests(res.data))
      .catch(() => toast.error("Failed to load participated contests"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (contests.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-500">
        You have not participated in any contest yet.
      </p>
    );
  }

  return (
    <div className="mt-20 max-w-3xl mx-auto">
      <h1 className="text-2xl text-center font-bold mb-6">
        My Participated Contests
      </h1>

      <div className="grid gap-4">
        {contests.map((c) => (
          <div
            key={c._id}
            className="shadow p-4 rounded bg-white dark:bg-gray-800 flex gap-4"
          >
            <img
              src={c.image}
              alt={c.name}
              className="w-24 h-24 object-cover rounded"
            />

            <div>
              <h2 className="font-bold text-lg">{c.name}</h2>
              <p>Status: <span className="capitalize">{c.status}</span></p>
              <p>Deadline: {new Date(c.deadline).toLocaleDateString()}</p>
              <p>Prize: ${c.prize}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
