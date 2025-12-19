import { useEffect, useState } from "react";
import axios from "../../Api/axiosInstance";

export default function WinnerContests() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    axios.get("/contests/winner/my").then(res => setContests(res.data));
  }, []);

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">
        My Winning Contests
      </h1>

      {contests.map(c => (
        <div key={c._id} className="p-4 shadow rounded mb-3">
          <h2 className="font-bold">{c.name}</h2>
          <p>Prize: ${c.prize}</p>
        </div>
      ))}
    </div>
  );
}
