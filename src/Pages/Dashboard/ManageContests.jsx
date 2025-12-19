import { useEffect, useState } from "react";
import axios from "../../Api/axiosInstance";
import toast from "react-hot-toast";

const ManageContests = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    axios
      .get("/contests/pending/all")
      .then((res) => setContests(res.data))
      .catch(() => toast.error("Failed to load contests"));
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`/contests/${id}/approve`);
      setContests((prev) => prev.filter((c) => c._id !== id));
      toast.success("Contest approved");
    } catch {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`/contests/reject/${id}`);
      setContests((prev) => prev.filter((c) => c._id !== id));
      toast.success("Contest rejected");
    } catch {
      toast.error("Reject failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center font-bold mb-4">Pending Contests</h2>

      {contests.length === 0 ? (
      <div>
        <table className="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Prize</th>
                <th>Actions</th>
              </tr>
            </thead>
            </table>
        <p className="text-center mt-10 text-gray-500">No pending contests</p>
      </div>
        
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Prize</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {contests.map((contest) => (
                <tr key={contest._id}>
                  <td>{contest.name}</td>
                  <td>{contest.type}</td>
                  <td>${contest.prize}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleApprove(contest._id)}
                      className="btn btn-xs btn-success"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(contest._id)}
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageContests;







