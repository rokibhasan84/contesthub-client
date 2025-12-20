import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function ContestCard({ contest }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDetails = () => {
    // If not logged in → redirect to login
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/contest/${contest._id}`);
    }
  };

  return (
    <div className="card bg-base-200 shadow">
       <figure>
        <img src={contest.image} alt={contest.name} className="h-40 w-full object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{contest.name}</h2>

        <p>
          {contest.description.slice(0, 80)}...
        </p>

        <p className="font-semibold">
          Participants: {contest.participants.length}
        </p>

        <div className="card-actions justify-end">
          <button
          onClick={handleDetails}
          className="btn btn-accent btn-outline"
        >
          Details
        </button>
        </div>
        
      </div>
    </div>
  );
}
