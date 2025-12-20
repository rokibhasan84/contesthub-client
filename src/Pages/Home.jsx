import { useEffect, useState } from "react";
import axios from "../Api/axiosInstance";
import ContestCard from "../Components/ContestCard";
import Banner from "../Components/Banner";
import ExtraStaticSection from "../Components/ExtraStaticSection";
import WinnerAdvertisement from "../Components/WinnerAdvertisement";

export default function Home() {
  const [popularContests, setPopularContests] = useState([]);

  useEffect(() => {
    axios.get("/contests/popular").then((res) => {
      setPopularContests(res.data); //
    });
  }, []);

  return (
    <div className="mt-18">
      <Banner />

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl text-center font-bold mb-5">
          Popular Contests
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {popularContests.map((contest) => (
            <ContestCard key={contest._id} contest={contest} />
          ))}
        </div>
      </div>
      <ExtraStaticSection></ExtraStaticSection>
      <WinnerAdvertisement></WinnerAdvertisement>
    </div>
  );
}
