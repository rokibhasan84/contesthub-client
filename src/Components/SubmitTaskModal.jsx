
import axios from "../Api/axiosInstance";
import toast from "react-hot-toast";
import { useState } from "react";

export default function SubmitTaskModal({ open, setOpen, contestId }) {
  const [link, setLink] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      await axios.post(`/submissions/${contestId}`, {
        taskLink: link,
      });

      toast.success("Task submitted successfully!");
      setLink("");
      setOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-3">Submit Task</h2>

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Paste task link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
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







// import axios from "../Api/axiosInstance";
// import toast from "react-hot-toast";
// import { useState } from "react";

// export default function SubmitTaskModal({ open, setOpen, contestId }) {
//   const [link, setLink] = useState("");

//   if (!open) return null;

//   const handleSubmit = async () => {
//     try {
//       await axios.patch(`/contests/submit/${contestId}`, {
//         taskLink: link
//       });

//       toast.success("Task submitted");
//       setOpen(false);
//       setLink("");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Submission failed");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded w-96">
//         <h2 className="text-xl font-bold mb-3">Submit Task</h2>

//         <textarea
//           value={link}
//           onChange={(e) => setLink(e.target.value)}
//           className="textarea textarea-bordered w-full"
//           placeholder="Paste your task link"
//         />

//         <div className="flex justify-end gap-3 mt-4">
//           <button onClick={() => setOpen(false)} className="btn btn-outline">
//             Cancel
//           </button>
//           <button onClick={handleSubmit} className="btn btn-primary">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




