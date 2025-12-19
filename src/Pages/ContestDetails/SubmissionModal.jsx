import { useState } from "react";
import axios from "../Api/axiosInstance";
import toast from "react-hot-toast";

export default function SubmitTaskModal({ contestId, close }) {
  const [taskLink, setTaskLink] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("/contests/submit-task", {
        contestId,
        taskLink,
      });

      toast.success("Task submitted!");
      close();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Submit Task</h3>

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Paste task link"
          value={taskLink}
          onChange={(e) => setTaskLink(e.target.value)}
        />

        <div className="modal-action">
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
          <button onClick={close} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
