export default function MyParticipated() {
  const dummy = [
    { id: 1, name: "Logo Contest", status: "Paid", deadline: "2025-01-10" },
    { id: 2, name: "Article Contest", status: "Paid", deadline: "2025-02-15" }
  ];

  return (
    <div className="mt-20">
      <h1 className="text-2xl text-center font-bold mb-4">My Participated Contests</h1>

      <div className="grid gap-4">
        {dummy.map((c) => (
          <div key={c.id} className="shadow p-4 rounded bg-white dark:bg-gray-800">
            <h2 className="font-bold">{c.name}</h2>
            <p>Status: {c.status}</p>
            <p>Deadline: {c.deadline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}