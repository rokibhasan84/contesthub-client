import { useEffect, useState } from "react";
import axios from "../Api/axiosInstance";
import ContestCard from "../Components/ContestCard";

export default function Home() {
  const [popularContests, setPopularContests] = useState([]);

  useEffect(() => {
    axios.get("/contests/popular").then((res) => {
      setPopularContests(res.data);
    });
  }, []);

  return (
    <div className="mt-10">

      {/* Banner */}
      <div className="bg-blue-600 text-white text-center py-20 px-4">
        <h1 className="text-4xl font-bold">Discover Creative Contests</h1>
        <p className="text-lg mt-3">Show Creativity, Win Rewards</p>
      </div>

      {/* Popular */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl text-center font-bold mb-5">Popular Contests</h2>

        <div className="grid md:grid-cols-3 gap-6">
           {popularContests.map((contest) => (
          <ContestCard key={contest._id} contest={contest} />
          ))}
        </div>
      </div>
    </div>
  );
}