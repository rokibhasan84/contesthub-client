import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "../../Api/axiosInstance";
import toast from "react-hot-toast";

export default function AddContest() {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const contest = {
      name: form.name.value,
      image: form.image.value,
      description: form.description.value,
      type: form.type.value,
      fee: Number(form.fee.value),
      prize: Number(form.prize.value),
      deadline: form.deadline.value,
      creatorEmail: user.email
    };

    if (!contest.creatorEmail) {
      return toast.error("You must be logged in");
    }

    try {
  await axios.post("/contests", contest);
  toast.success("Contest submitted for approval!");
  e.target.reset();
} catch (err) {
  console.error(err);
  toast.error(err.response?.data?.message || "Failed to add contest");
}

if (!contest.name || !contest.image || !contest.type) {
  return toast.error("All fields are required");
}


  };

  return (
    <div className="max-w-xl mx-auto bg-base-200 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Contest</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input name="name" placeholder="Contest Name" className="input input-bordered w-full" required />

        <input name="image" placeholder="Image URL" className="input input-bordered w-full" required />

        <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" required />

        <select name="type" className="select select-bordered w-full" required>
          <option value="">Select Type</option>
          <option value="Image Design">Image Design</option>
          <option value="Article Writing">Article Writing</option>
          <option value="Video Editing">Video Editing</option>
        </select>

        <input name="price" type="number" placeholder="Entry Fee" className="input input-bordered w-full" required />

        <input name="prize" type="number" placeholder="Prize Money" className="input input-bordered w-full" required />

        <input name="deadline" type="date" className="input input-bordered w-full" required />

        <button className="btn btn-primary w-full">Submit Contest</button>
      </form>
    </div>
  );
}
