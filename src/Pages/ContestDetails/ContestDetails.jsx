import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../Api/axiosInstance";
import { AuthContext } from "../../Context/AuthContext";
import SubmitTaskModal from "../../Components/SubmitTaskModal";


export default function ContestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [contest, setContest] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get(`/contests/${id}`).then(res => {
      setContest(res.data);
    });
  }, [id]);

  if (!contest) return <p>Loading...</p>;

  const isRegistered = contest.participants.includes(user?.email);
  const isEnded = new Date(contest.deadline) < new Date();

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4">
      <img src={contest.image} className="w-full h-72 object-cover rounded" />

      <h1 className="text-3xl font-bold mt-4">{contest.name}</h1>

      <p className="mt-3">{contest.description}</p>

      <p className="mt-2 font-semibold">
        Participants: {contest.participants.length}
      </p>

      <p className="mt-2 font-semibold">
        Prize: ${contest.prize}
      </p>

      {/* REGISTER / PAY */}
      {!isRegistered && (
        <button
          disabled={isEnded}
          onClick={() => navigate(`/payment/${contest._id}`)}
          className="btn btn-primary mt-4"
        >
          {isEnded ? "Contest Ended" : "Register / Pay"}
        </button>
      )}

      {/* SUBMIT TASK */}
      {isRegistered && !isEnded && (
        <button
          onClick={() => setOpen(true)}
          className="btn btn-secondary mt-4 ml-3"
        >
          Submit Task
        </button>
      )}

      {open && (
        <SubmitTaskModal
          contestId={contest._id}
          close={() => setOpen(false)}
        />
      )}
    </div>
  );
}






// import { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../../Api/axiosInstance";
// import { AuthContext } from "../../Context/AuthContext";
// import toast from "react-hot-toast";

// const ContestDetails = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const [contest, setContest] = useState(null);
//   const [ended, setEnded] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const isRegistered = contest.participants.includes(user.email);
// const isEnded = new Date(contest.deadline) < new Date();


//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/contests/${id}`)
//       .then((res) => {
//         setContest(res.data);
//         if (new Date(res.data.deadline) < new Date()) {
//         setEnded(true);
//       }
//         setLoading(false);
//       });
//   }, [id]);

//     const timeLeft = () => {
//     const diff = new Date(contest.deadline) - new Date();
//     if (diff <= 0) return "Contest Ended";

//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//     return `${days}d ${hours}h left`;
//   };

//   const handlePaymentSuccess = async () => {
//   await axios.patch(`/contests/register/${id}`);
//   toast.success("Payment successful!");
//   navigate(`/contests/${id}`);
// };

//     const handlePay = async () => {
//     try {
//       await axios.patch(`/contests/participate/${contest._id}`);
//       toast.success("Registered successfully!");
//       setContest(prev => ({
//         ...prev,
//         participants: [...prev.participants, user.email]
//       }));
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed");
//     }
//   };

//   // const handleParticipate = async () => {
//   //   try {
//   //     await axios.patch(
//   //       `/contests/participate/${contest._id}`,
//   //       {},
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //         },
//   //       }
//   //     );
//   //     toast("Successfully participated!");
//   //   } catch (error) {
//   //     toast(error.response?.data?.message || "Error");
//   //   }
//   // };

//   if (loading) return <p className="text-center">Loading...</p>;

//   return (
//   <div className="max-w-5xl mx-auto p-6">
//     <h1 className="text-3xl font-bold mb-4">{contest.name}</h1>

//     <img
//       src={contest.image}
//       className="w-full h-96 object-cover rounded mb-6"
//     />

//     <p className="mb-2"><strong>Prize:</strong> ৳{contest.prize}</p>
//     <p className="mb-2">
//       <strong>Participants:</strong> {contest.participants.length}
//     </p>

//     <p className="mb-4">{contest.description}</p>

//     <p className="font-semibold text-red-500 mb-4">
//       {timeLeft()}
//     </p>

//     {contest.winner?.name && (
//       <div className="bg-green-100 p-4 rounded mb-4">
//         <h3 className="font-bold">Winner</h3>
//         <img src={contest.winner.photo} className="w-20 rounded-full" />
//         <p>{contest.winner.name}</p>
//       </div>
//     )}

//     <button
//   disabled={isEnded}
//   onClick={() => navigate(`/payment/${contest._id}`)}
//   className="btn btn-primary"
// >
//   {isEnded ? "Contest Ended" : "Register / Pay"}
// </button>

//   </div>
// );
// }


// export default ContestDetails;
















// // import { useParams, useNavigate } from "react-router";
// // import { useEffect, useState } from "react";
// // import axios from "../../Api/axiosInstance";


// // export default function ContestDetails() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [contest, setContest] = useState(null);
// //   const [timeLeft, setTimeLeft] = useState("");
// //   const [ended, setEnded] = useState(false);

// //   useEffect(() => {
// //     axios.get(`/contests/${id}`).then((res) => {
// //       setContest(res.data);
// //     });
// //   }, [id]);

// //   // ⏳ Countdown
// //   useEffect(() => {
// //     if (!contest) return;

// //     const interval = setInterval(() => {
// //       const now = new Date();
// //       const deadline = new Date(contest.deadline);
// //       const diff = deadline - now;

// //       if (diff <= 0) {
// //         setEnded(true);
// //         setTimeLeft("Contest Ended");
// //         clearInterval(interval);
// //       } else {
// //         const days = Math.floor(diff / (1000 * 60 * 60 * 24));
// //         const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
// //         const minutes = Math.floor((diff / (1000 * 60)) % 60);
// //         setTimeLeft(`${days}d ${hours}h ${minutes}m`);
// //       }
// //     }, 1000);

// //     return () => clearInterval(interval);
// //   }, [contest]);

// //   if (!contest) return <p>Loading...</p>;

// //   return (
// //     <div className="max-w-5xl mx-auto p-4">
// //       <img
// //         src={contest.image}
// //         alt={contest.name}
// //         className="w-full h-64 object-cover rounded-lg mb-6"
// //       />

// //       <h1 className="text-3xl font-bold mb-2">{contest.name}</h1>
// //       <p className="text-gray-600 mb-4">{contest.description}</p>

// //       <div className="grid md:grid-cols-2 gap-4 mb-6">
// //         <p><strong>Prize:</strong> ${contest.prize}</p>
// //         <p><strong>Entry Fee:</strong> ${contest.price}</p>
// //         <p><strong>Participants:</strong> {contest.participantsCount}</p>
// //         <p><strong>Deadline:</strong> {timeLeft}</p>
// //       </div>

// //       {/* Winner Section */}
// //       {contest.winner && (
// //         <div className="bg-green-100 p-4 rounded mb-6">
// //           <h3 className="font-bold">🏆 Winner</h3>
// //           <p>{contest.winner.name}</p>
// //         </div>
// //       )}

// //       <button
// //         disabled={ended}
// //         onClick={() => navigate(`/payment/${contest._id}`)}
// //         className={`btn btn-primary ${ended && "btn-disabled"}`}
// //       >
// //         {ended ? "Contest Ended" : "Register / Pay"}
// //       </button>
// //     </div>
// //   );
// // }
