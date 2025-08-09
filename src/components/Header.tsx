// src/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className=" text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          Aruba
        </Link>
        <div>
          <Link href="/packages" className="mr-4 hover:underline">
            Packages
          </Link>
          <Link href="/custom-trip" className="mr-4 hover:underline">
            Custom Trip
          </Link>
          <Link href="/about" className="mr-4 hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
