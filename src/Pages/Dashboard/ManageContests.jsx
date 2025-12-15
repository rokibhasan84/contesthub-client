import { useEffect, useState } from "react";
import axios from "axios";

const ManageContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/contests").then((res) => {
      setContests(res.data);
      setLoading(false);
    });
  }, []);

  const handleStatus = (id, status) => {
    axios
      .patch(`http://localhost:5000/contests/${id}`, { status })
      .then(() => {
        setContests((prev) =>
          prev.map((contest) =>
            contest._id === id
              ? { ...contest, status }
              : contest
          )
        );
      });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Contests</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Title</th>
              <th>Creator</th>
              <th>Prize</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {contests.map((contest) => (
              <tr key={contest._id}>
                <td>{contest.title}</td>
                <td>{contest.creatorEmail}</td>
                <td>৳{contest.prizeMoney}</td>
                <td>
                  <span
                    className={`font-semibold ${
                      contest.status === "approved"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {contest.status}
                  </span>
                </td>
                <td>
                  {contest.status === "pending" && (
                    <button
                      onClick={() =>
                        handleStatus(contest._id, "approved")
                      }
                      className="btn btn-xs btn-success"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContests;