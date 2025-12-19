import axios from "../Api/axiosInstance";
import toast from "react-hot-toast";
import { useState } from "react";

export default function SubmitTaskModal({ open, setOpen, contestId }) {
  const [link, setLink] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      await axios.patch(`/contests/submit/${contestId}`, {
        taskLink: link
      });

      toast.success("Task submitted");
      setOpen(false);
      setLink("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-3">Submit Task</h2>

        <textarea
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="textarea textarea-bordered w-full"
          placeholder="Paste your task link"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setOpen(false)} className="btn btn-outline">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}







// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../Api/axiosInstance";
// import toast from "react-hot-toast";

// export default function Submissions() {
//   const { contestId } = useParams();
//   const [submissions, setSubmissions] = useState([]);

//   useEffect(() => {
//     axios.get(`/submissions/${contestId}`).then((res) => {
//       setSubmissions(res.data);
//     });
//   }, [contestId]);

//   const declareWinner = async (id) => {
//     try {
//       await axios.patch(`/submissions/winner/${id}`);
//       toast.success("Winner declared");

//       setSubmissions((prev) =>
//         prev.map((s) =>
//           s._id === id
//             ? { ...s, isWinner: true }
//             : { ...s, isWinner: false }
//         )
//       );
//     } catch {
//       toast.error("Failed to declare winner");
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Submitted Tasks</h1>

//       <div className="grid gap-4">
//         {submissions.map((s) => (
//           <div
//             key={s._id}
//             className={`shadow p-4 rounded ${
//               s.isWinner ? "bg-green-100" : "bg-white"
//             }`}
//           >
//             <p>
//               User Email: <strong>{s.userEmail}</strong>
//             </p>

//             <a
//               href={s.taskLink}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-600 underline"
//             >
//               View Task
//             </a>

//             {!s.isWinner && (
//               <button
//                 onClick={() => declareWinner(s._id)}
//                 className="bg-green-600 text-white px-3 py-1 mt-3 rounded"
//               >
//                 Declare Winner
//               </button>
//             )}

//             {s.isWinner && (
//               <p className="text-green-700 font-semibold mt-2">
//                 Winner
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
