import React from "react";
import { useNavigate } from "react-router-dom";

export default function ContestCard({ contest }) {
  const navigate = useNavigate();

  return (
    <div className="shadow rounded-lg p-3 bg-white dark:bg-gray-800">
      <img src={contest.image} className="w-full h-48 object-cover rounded" />

      <h3 className="text-xl font-bold mt-2">{contest.name}</h3>
      <p className="text-gray-600 dark:text-gray-300">
        {contest.description.slice(0, 60)}...
      </p>

      <p className="mt-2 font-semibold text-blue-500">
        Participants: {contest.participants}
      </p>

      <button
        onClick={() => navigate(`/contest/${contest.id}`)}
        className="bg-blue-500 text-white w-full py-2 mt-3 rounded"
      >
        Details
      </button>
    </div>
  );
}