import React, { useState } from "react";

export default function ContestSidebar({ contest }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded shadow h-fit">

      <h3 className="text-xl font-bold mb-3">Contest Summary</h3>

      {/* Deadline placeholder */}
      <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
        <p className="text-sm text-gray-500">Deadline</p>
        <p className="font-semibold">
          {new Date(contest.deadline).toLocaleString()}
        </p>
      </div>

      {/* Register button */}
      <button
        onClick={() => alert("Later we add payment!")}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Register Now
      </button>

      {/* Submit button triggers modal */}
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-green-600 text-white py-2 rounded mt-3"
      >
        Submit Task
      </button>

      {/* Pass open flag globally (next step: Context/Portal) */}
      {open && window.dispatchEvent(new CustomEvent("openSubmissionModal"))}
    </div>
  );
}