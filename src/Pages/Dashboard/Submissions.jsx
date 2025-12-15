export default function Submissions() {
  const dummy = [
    { id: 1, user: "Rahim", task: "https://link.com/a1" },
    { id: 2, user: "Karim", task: "https://link.com/a2" }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Submitted Tasks</h1>

      <div className="grid gap-4">
        {dummy.map((s) => (
          <div key={s.id} className="shadow p-4 rounded bg-white dark:bg-gray-800">
            <p>Name: <strong>{s.user}</strong></p>
            <p>Task Link: {s.task}</p>
            <button className="bg-green-600 text-white px-3 py-1 mt-3 rounded">
              Declare Winner
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}