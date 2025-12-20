import { useEffect, useState } from "react";
import axios from "../Api/axiosInstance";
import { Trophy } from "lucide-react";

export default function WinnerAdvertisement() {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/contests/winners/recent")
      .then(res => {
        setWinners(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading winners...</p>;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            🏆 Recent Contest Winners
          </h2>
          <p className="text-gray-300">
            Real people. Real skills. Real rewards.
          </p>
        </div>

        {/* Winners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {winners.map((contest) => (
  <div
    key={contest._id}
    className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden"
  >
    <img
  src={contest.userPhoto}
  alt={contest.userEmail}
  className="h-52 w-full object-cover"
/>

<h3 className="text-xl font-bold">
  {contest.winner.name}
</h3>

<div className="flex justify-center items-center gap-2 mt-3 text-indigo-600 font-semibold">
  <Trophy size={18} />
  ৳ {contest.winner.prize}
</div>

<p className="text-xs text-gray-400 mt-2">
  Winner Date:
  {new Date(contest.winner.date).toLocaleDateString()}
</p>
  </div>
))}

        </div>
      </div>
    </section>
  );
}