import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    
    navigate(`/all-contests?search=${search}&type=${type}`);
  };

  return (
    <section className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
      <div className="max-w-[1140px] mx-auto px-6 py-24 text-center">
        
        {/* Heading */}
        <h1 className="text-2xl md:text-6xl font-extrabold leading-tight">
          Discover & Join <span className="text-yellow-300">Amazing Contests</span>
        </h1>

        <p className="mt-5 text-lg md:text-xl text-gray-200">
          Participate, showcase your talent & win exciting rewards
        </p>

        {/* Search Box */}
        <div className="mt-10  rounded-md p-4 flex flex-col md:flex-row gap-3 items-center shadow-lg max-w-3xl mx-auto">
          
          <input
            type="text"
            placeholder="Search contest..."
            className="input input-bordered w-full text-[#b021cc]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered w-full md:w-48 text-[#b021cc]"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Image Design">Image Design</option>
          <option value="Article Writing">Article Writing</option>
          <option value="Video Editing">Video Editing</option>
          <option value="Mobile Apps">Mobile Apps</option>
          <option value="UI/UX Design">UI/UX Design</option>
          </select>

          <button
            onClick={handleSearch}
            className="btn btn-primary w-full md:w-auto"
          >
            Search
          </button>
        </div>

      </div>

      {/* Decorative blur */}
      <div className="absolute -bottom-20 md:left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-400 opacity-30 blur-3xl rounded-full"></div>
    </section>
  );
};

export default Banner;