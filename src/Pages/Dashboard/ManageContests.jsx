import { useEffect, useState } from "react";
import axios from "axios";

const ManageContests = () => {
  const [contests, setContests] = useState([]);

  const token = localStorage.getItem("access-token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contests/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setContests(res.data));
  }, []);

  const handleApprove = async (id) => {
    await axios.patch(
      `http://localhost:5000/api/contests/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setContests(contests.filter((c) => c._id !== id));
  };

  const handleReject = async (id) => {
    await axios.patch(
      `http://localhost:5000/api/contests/reject/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setContests(contests.filter((c) => c._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Contests</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Prize</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contests.map((contest) => (
              <tr key={contest._id}>
                <td>{contest.title}</td>
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

        {contests.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No pending contests
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageContests;









// import { useEffect, useState } from "react";
// import axios from "axios";

// const ManageContests = () => {
//   const [contests, setContests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("/contests").then((res) => {
//       setContests(res.data);
//       setLoading(false);
//     });
//   }, []);

//   const handleStatus = (id, status) => {
//     axios
//       .patch(`/contests/${id}`, { status })
//       .then(() => {
//         setContests((prev) =>
//           prev.map((contest) =>
//             contest._id === id
//               ? { ...contest, status }
//               : contest
//           )
//         );
//       });
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Manage Contests</h2>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Creator</th>
//               <th>Prize</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {contests.map((contest) => (
//               <tr key={contest._id}>
//                 <td>{contest.title}</td>
//                 <td>{contest.creatorEmail}</td>
//                 <td>৳{contest.prizeMoney}</td>
//                 <td>
//                   <span
//                     className={`font-semibold ${
//                       contest.status === "approved"
//                         ? "text-green-600"
//                         : "text-orange-500"
//                     }`}
//                   >
//                     {contest.status}
//                   </span>
//                 </td>
//                 <td>
//                   {contest.status === "pending" && (
//                     <button
//                       onClick={() =>
//                         handleStatus(contest._id, "approved")
//                       }
//                       className="btn btn-xs btn-success"
//                     >
//                       Approve
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageContests;