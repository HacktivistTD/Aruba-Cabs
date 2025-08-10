"use client";

import { useSearchParams } from "next/navigation";

const packages = [
  {
    id: "secret-shores",
    title: "Secret Shores of Sri Lanka",
    description:
      "Discover the untouched beaches and hidden coves of Sri Lanka’s stunning coastline. Perfect for travelers seeking tranquility away from the crowds.",
    places: ["Nilaveli Beach", "Kalpitiya", "Hiriketiya"],
    nightStops: ["Nilaveli Resort", "Kalpitiya Lagoon Villa"],
  },
  {
    id: "yala-wildlife-safari",
    title: "Wildlife Safari at Yala",
    description:
      "Embark on an unforgettable wildlife safari at Yala National Park. Spot leopards, elephants, and exotic birds in their natural habitat.",
    places: ["Yala National Park", "Kataragama"],
    nightStops: ["Yala Safari Camp"],
  },
];

export default function SpecialPackagesPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (id) {
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return <p className="text-center mt-10">Package not found</p>;

    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{pkg.title}</h1>
        <p className="mb-6">{pkg.description}</p>

        <h2 className="text-xl font-semibold mt-4">Places to Visit</h2>
        <ul className="list-disc pl-6 mb-4">
          {pkg.places.map((place, i) => (
            <li key={i}>{place}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-4">Night Stops</h2>
        <ul className="list-disc pl-6 mb-6">
          {pkg.nightStops.map((stop, i) => (
            <li key={i}>{stop}</li>
          ))}
        </ul>

        <div className="flex gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            Book Now
          </button>
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded">
            Contact for More Details
          </button>
        </div>
      </div>
    );
  }

  // Default view — all packages list
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Special Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <a
            key={pkg.id}
            href={`/special-packages?id=${pkg.id}`}
            className="block border rounded-lg p-4 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">{pkg.title}</h2>
            <p>{pkg.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
