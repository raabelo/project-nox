import Link from "next/link";


export default function GamesPage() {
  const dummyGames = [
    { id: "1", name: "Aventura do Herói" },
    { id: "2", name: "O Tesouro Perdido" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Seus Jogos</h1>
      <div className="grid gap-4">
        {dummyGames.map((game) => (
          <Link
            key={game.id}
            href={`/inn/games/${game.id}`}
            className="border rounded-lg p-4 hover:bg-gray-100"
          >
            {game.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
