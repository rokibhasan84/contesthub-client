export default function MyWinning() {
  const dummy = [
    { id: 1, name: "Logo Contest", prize: 100 },
    { id: 2, name: "Gaming Review", prize: 50 }
  ];

  return (
    <div className="mt-20">
      <h1 className="text-2xl text-center font-bold mb-4">My Winning Contests</h1>

      <div className="grid gap-4">
        {dummy.map((w) => (
          <div key={w.id} className="shadow p-4 rounded bg-white dark:bg-gray-800">
            <h2 className="font-bold">{w.name}</h2>
            <p>Prize Won: ${w.prize}</p>
          </div>
        ))}
      </div>
    </div>
  );
}