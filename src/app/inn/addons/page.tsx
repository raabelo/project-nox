// import { prisma } from "@/lib/prisma";

// async function getAddons() {
//   return [];
//   // return prisma.addon.findMany();
// }

export default async function AddonsPage() {
  // const addons = await getAddons();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Addons</h1>
      <div className="grid gap-4">
        {/* {addons.map((addon) => (
          <div key={addon.id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <h2 className="font-bold">{addon.name}</h2>
              <p>{addon.description}</p>
              <p className="text-sm text-gray-500">v{addon.version}</p>
            </div>
            <button className="bg-green-600 text-white px-4 py-1 rounded">
              {addon.enabled ? "Desabilitar" : "Habilitar"}
            </button>
          </div>
        ))} */}
      </div>
    </div>
  );
}
