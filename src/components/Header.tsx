// src/components/Header.tsx

export default function Header() {
  return (
    <header className=" text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="/" className="font-bold text-xl">
          Aruba
        </a>
        <div>
          <a href="/packages" className="mr-4 hover:underline">
            Packages
          </a>
          <a href="/custom-trip" className="mr-4 hover:underline">
            Custom Trip
          </a>
          <a href="/about" className="mr-4 hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
