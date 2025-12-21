import { useEffect, useState } from "react";
import axios from "../Api/axiosInstance";
import { Trophy, Sparkles } from "lucide-react";

export default function WinnerAdvertisement() {
  const [winners, setWinners] = useState([]);
  const [totalWinners, setTotalWinners] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/contests/winners/recent")
      .then((res) => {
        setWinners(res.data.winners || []);
        setTotalWinners(res.data.totalWinners || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading winners...</p>;
  }

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold mb-4 flex justify-center items-center gap-2">
            <Trophy className="text-yellow-400" />
            Recent Contest Winners
          </h2>

          <p className="text-gray-300">
            Real people. Real skills. Real rewards.
          </p>

          <p className="mt-3 text-yellow-300 font-semibold">
            🎉 Total Winners: {totalWinners}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {winners.map((contest) => (
            <div
              key={contest._id}
              className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={contest.winner?.photo}
                alt={contest.winner?.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">
                  {contest.winner?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Winner of {contest.name}
                </p>

                <div className="flex justify-center items-center gap-2 mt-3 text-indigo-600 font-bold">
                  <Sparkles size={18} />
                  ৳ {contest.winner?.prize}
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  {contest.winner?.date
                    ? new Date(contest.winner.date).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
