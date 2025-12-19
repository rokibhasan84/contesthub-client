import { useEffect, useState } from "react";
import axios from "../../Api/axiosInstance";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function SubmissionContests() {
  const { id } = useParams(); // contest id
  const [subs, setSubs] = useState([]);
  const [contest, setContest] = useState(null);

  useEffect(() => {
    axios.get(`/contests/${id}`).then(res => setContest(res.data));

    axios
      .get(`/contests/submissions/${id}`)
      .then(res => setSubs(res.data))
      .catch(() => toast.error("Failed to load submissions"));
  }, [id]);

  const declareWinner = async (sub) => {
    if (!confirm("Declare this user as winner?")) return;

    try {
      await axios.patch(`/contests/winner/${id}`, {
        email: sub.userEmail,
        name: sub.userEmail.split("@")[0], // simple fallback
        photo: "https://i.ibb.co/ZmYz7jF/avatar.png"
      });

      toast.success("Winner declared");
    } catch {
      toast.error("Failed to declare winner");
    }
  };

  if (!contest) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Submissions — {contest.name}
      </h1>

      {subs.length === 0 && (
        <p className="text-gray-500">No submissions yet</p>
      )}

      {subs.map((s, i) => (
        <div
          key={i}
          className="p-4 mb-3 shadow rounded bg-white dark:bg-gray-800"
        >
          <p><strong>User Name:</strong> {s.userEmail.split("@")[0]}</p>
          <p><strong>User Email:</strong> {s.userEmail}</p>

          <a
            href={s.taskLink}
            target="_blank"
            className="text-blue-600 underline"
          >
            View Task
          </a>

          {!contest.winner?.email && (
            <button
              onClick={() => declareWinner(s)}
              className="btn btn-sm btn-success ml-15 mt-3"
            >
              Declare Winner
            </button>
          )}

          {contest.winner?.email === s.userEmail && (
            <p className="text-green-600 font-bold mt-3">
              🏆 Winner
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

