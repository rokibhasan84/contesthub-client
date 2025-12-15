import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const AddContest = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const contestData = {
      title: form.title.value,
      description: form.description.value,
      prizeMoney: Number(form.prize.value),
      deadline: form.deadline.value,
      image: form.image.value,
      creatorEmail: user.email,
    };

    try {
      await axios.post("http://localhost:5000/contests", contestData);
      Swal.fire("Success!", "Contest added (Pending)", "success");
      form.reset();
    } catch (err) {
      Swal.fire("Error!", "Failed to add contest", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-base-200 p-6 rounded-lg mt-20">
      <h2 className="text-2xl text-center font-bold mb-4">Add New Contest</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Contest Title"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />

        <input
          name="prize"
          type="number"
          placeholder="Prize Money"
          className="input input-bordered w-full"
          required
        />

        <input
          name="deadline"
          type="date"
          className="input input-bordered w-full"
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />

        <button className="btn btn-primary btn-outline w-full">
          Add Contest
        </button>
      </form>
    </div>
  );
};

export default AddContest;