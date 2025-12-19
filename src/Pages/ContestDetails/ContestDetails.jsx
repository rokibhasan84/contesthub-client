import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "../../Api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import SubmitTaskModal from "../../Components/SubmitTaskModal";

export default function ContestDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [contest, setContest] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get(`/contests/${id}`).then(res => setContest(res.data));
  }, [id]);

  if (!contest) return null;

  const isEnded = new Date(contest.deadline) < new Date();
  const isRegistered = contest.participants.includes(user?.email);

  return (
    <div className="mt-20 max-w-4xl mx-auto">
      <img src={contest.image} className="w-full rounded mb-6" />

      <h1 className="text-3xl font-bold">{contest.name}</h1>
      <p className="mt-2">{contest.description}</p>

      <p className="mt-4">
        Participants: {contest.participants.length}
      </p>

      <p className="mt-2 font-semibold">
        Prize: ${contest.prize}
      </p>

      {contest.winner?.email && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p>🏆 Winner: {contest.winner.name}</p>
          <img src={contest.winner.photo} className="w-16 rounded-full mt-2" />
        </div>
      )}

      <div className="mt-6 flex gap-3">
        {!user && (
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary"
          >
            Login to Participate
          </button>
        )}

        {user && !isRegistered && (
          <button
            disabled={isEnded}
            onClick={() => navigate(`/payment/${contest._id}`)}
            className="btn btn-primary"
          >
            Register / Pay
          </button>
        )}

        {user && isRegistered && (
          <button
            disabled={isEnded}
            onClick={() => setOpen(true)}
            className="btn btn-success"
          >
            Submit Task
          </button>
        )}
      </div>

      {isEnded && (
        <p className="mt-4 text-red-500 font-semibold">
          Contest Ended
        </p>
      )}

      <SubmitTaskModal
        open={open}
        setOpen={setOpen}
        contestId={contest._id}
      />
    </div>
  );
}
