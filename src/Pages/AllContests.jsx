import { useEffect, useState } from "react";
import axios from "../Api/axiosInstance";

export default function AllContests() {
  const [contests, setContests] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchContests = () => {
    axios
      .get("/contests/approved", {
        params: {
          status: "approved",
          search,
          type,
          sort,
          page,
          limit:6
        }
      })
      .then(res => {
        setContests(res.data.contests || []);
        setTotalPages(res.data.totalPages || 1);
      });
  };

  useEffect(() => {
    fetchContests();
  }, [search,type,sort, page]);

  return (
    <div className="p-4 mt-20 max-w-[1140px] mx-auto">

      {/* 🔍 Filters */}
      <div className="grid md:grid-cols-4 gap-3 mb-6 pl-10 md:pl-45">

        <input
          type="text"
          placeholder="Search contest..."
          className="input input-bordered"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Image Design">Image Design</option>
          <option value="Article Writing">Article Writing</option>
          <option value="Video Editing">Video Editing</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="price_asc">Low → High</option>
          <option value="price_desc">High → Low</option>
        </select>
      </div>

      {/* 📦 Contest Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {contests.map(contest => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
  {[...Array(totalPages).keys()].map(num => (
    <button
      key={num}
      onClick={() => setPage(num + 1)}
      className={`btn btn-sm ${
        page === num + 1 ? "btn-primary" : "btn-outline"
      }`}
    >
      {num + 1}
    </button>
  ))}
</div>

    </div>
  );
}
