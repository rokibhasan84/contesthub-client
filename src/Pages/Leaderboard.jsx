import { useEffect, useState } from "react";
import axios from "../Api/axiosInstance";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get("/contests/leaderboard").then(res => {
      setLeaders(res.data);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-20 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        🏆 Contest Winners Leaderboard
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Winner</th>
              <th>Contest</th>
              <th>Prize</th>
            </tr>
          </thead>

          <tbody>
            {leaders.map((c, index) => (
              <tr key={c._id}>
                <td>{index + 1}</td>

                <td className="flex items-center gap-3">
                  <img
                    src={c.winner.photo}
                    alt="winner"
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{c.winner.name}</span>
                </td>

                <td>{c.name}</td>
                <td className="font-semibold">${c.prize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

