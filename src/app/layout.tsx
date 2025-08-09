// src/app/layout.tsx
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Parkinsans } from 'next/font/google';

// Load the font from Google Fonts
const parkinsans = Parkinsans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // you can add more weights if needed
  display: 'swap',
});

export const metadata = {
  title: 'Aruba Cab Services',
  description: 'Customized cab and tourism packages in Sri Lanka',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={parkinsans.className}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
