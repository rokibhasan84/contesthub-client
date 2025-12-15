import React, { useState } from "react";

export default function SubmissionModal({ onClose, onSubmit }) {
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!link) return alert("Submission link required");
    onSubmit({ submissionLink: link, notes });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Submit Your Task</h2>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input type="url" placeholder="Submission link" value={link} onChange={(e) => setLink(e.target.value)} className="border p-2 rounded" required />
          <textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} className="border p-2 rounded" rows={4} />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}