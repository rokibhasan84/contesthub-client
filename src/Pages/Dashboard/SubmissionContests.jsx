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

    axios.get(`/submissions/${id}`).then((res) => {
      setSubs(res.data);
    }).catch(() => toast.error("Failed to load submissions"));
  }, [id]);

  const declareWinner = async (sub) => {
    if (!confirm("Declare this user as winner?")) return;

     try {
    await axios.patch(`/contests/winner/${id}`, {
      email: sub.userEmail,
      name: sub.userName,
      photo: sub.userPhoto
    });

    toast.success("Winner declared");
  } catch (err) {
    console.error(err);
    toast.error("Failed to declare winner");
  }
};

  if (!contest) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
      All Submissions — {contest.name}
      </h1>

      {subs.length === 0 && (
        <p className="text-gray-500">No submissions yet</p>
      )}

      {subs.map((sub) => (
        <div key={sub._id} className="p-4 mb-3 rounded bg-base-200">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={sub.userPhoto}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">{sub.userName}</span>
          </div>

          <a
            href={sub.taskLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View Submitted Task
          </a>

          {!contest.winner?.email && (
            <button
              onClick={() => declareWinner(sub)}
              className="btn btn-sm btn-success ml-15 mt-3"
            >
              Declare Winner
            </button>
          )}

          {contest.winner?.email === sub.userEmail && (
            <p className="text-green-600 font-bold mt-3">
              🏆 Winner
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

