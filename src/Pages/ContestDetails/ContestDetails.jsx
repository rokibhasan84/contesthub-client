import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "../../Api/axiosInstance";


export default function ContestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    axios.get(`/contests/${id}`).then((res) => {
      setContest(res.data);
    });
  }, [id]);

  // ⏳ Countdown
  useEffect(() => {
    if (!contest) return;

    const interval = setInterval(() => {
      const now = new Date();
      const deadline = new Date(contest.deadline);
      const diff = deadline - now;

      if (diff <= 0) {
        setEnded(true);
        setTimeLeft("Contest Ended");
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  if (!contest) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <img
        src={contest.image}
        alt={contest.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{contest.name}</h1>
      <p className="text-gray-600 mb-4">{contest.description}</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <p><strong>Prize:</strong> ${contest.prize}</p>
        <p><strong>Entry Fee:</strong> ${contest.price}</p>
        <p><strong>Participants:</strong> {contest.participantsCount}</p>
        <p><strong>Deadline:</strong> {timeLeft}</p>
      </div>

      {/* Winner Section */}
      {contest.winner && (
        <div className="bg-green-100 p-4 rounded mb-6">
          <h3 className="font-bold">🏆 Winner</h3>
          <p>{contest.winner.name}</p>
        </div>
      )}

      <button
        disabled={ended}
        onClick={() => navigate(`/payment/${contest._id}`)}
        className={`btn btn-primary ${ended && "btn-disabled"}`}
      >
        {ended ? "Contest Ended" : "Register / Pay"}
      </button>
    </div>
  );
}
