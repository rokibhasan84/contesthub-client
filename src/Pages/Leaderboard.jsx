import { useEffect, useState } from "react";
import axios from "../Api/axiosInstance";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/winners/leaderboard")
      .then((res) => setLeaders(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-20 px-4 ">
      <h2 className="text-3xl font-bold text-center mb-6">
        🏆 Leaderboard
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Total Prize</th>
            </tr>
          </thead>

          <tbody>
            {leaders.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.wins}</td>
                <td>৳{user.totalPrize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;