import React from "react";

export default function ContestInfo({ contest }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
      <img
        src={contest.image}
        alt={contest.name}
        className="w-full h-60 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">{contest.name}</h1>

      <p className="text-gray-600 dark:text-gray-300 mt-3">
        {contest.description}
      </p>

      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
        <h2 className="text-xl font-semibold mb-2">Task Instructions</h2>
        <p>{contest.task}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded">
          <p className="text-xl font-bold">${contest.prize}</p>
          <p className="text-sm text-gray-500">Prize</p>
        </div>
        <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded">
          <p className="text-xl font-bold">{contest.participants}</p>
          <p className="text-sm text-gray-500">Participants</p>
        </div>
        <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded">
          <p className="text-xl font-bold">${contest.entryFee}</p>
          <p className="text-sm text-gray-500">Entry Fee</p>
        </div>
      </div>
    </div>
  );
}