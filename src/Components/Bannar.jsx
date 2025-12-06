import React, { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const popularContests = [
  {
    id: 1,
    name: "Logo Design Challenge",
    image: "https://i.ibb.co/BLGnkKD/design.jpg",
    participants: 134,
    description: "Create an amazing modern logo..."
  },
  {
    id: 2,
    name: "Article Writing",
    image: "https://i.ibb.co/sP2Jf1g/writing.jpg",
    participants: 98,
    description: "Write a powerful article on technology..."
  }
];

  return (
    <div>
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 text-center px-3">
        <h1 className="text-4xl font-bold mb-4">Discover Creative Contests</h1>
        <p className="text-lg mb-6">Show your creativity and win amazing rewards!</p>

        <div className="flex justify-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contests..."
            className="w-1/2 p-3 rounded-l-lg text-black"
          />
          <button className="bg-black px-6 py-3 rounded-r-lg">Search</button>
        </div>
      </div>
      <div>
        {/* Popular Contests */}
<section className="container mx-auto px-3 py-10">
  <div className="flex justify-between mb-5">
    <h2 className="text-2xl font-bold">Popular Contests</h2>
    <button className="text-blue-500">Show All</button>
  </div>

  <div className="grid md:grid-cols-3 gap-6">
    {popularContests.map((c) => (
      <div key={c.id} className="shadow-md rounded-lg p-3">
        <img src={c.image} className="w-full h-48 object-cover rounded" />
        <h3 className="text-xl font-bold mt-2">{c.name}</h3>
        <p className="text-gray-600">{c.description.slice(0, 60)}...</p>
        <p className="mt-2 font-semibold">Participants: {c.participants}</p>
        <button className="bg-blue-500 text-white w-full py-2 mt-3 rounded">
          Details
        </button>
      </div>
    ))}
  </div>
</section>

      </div>
    </div>
  );
}