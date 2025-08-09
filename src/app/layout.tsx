// src/app/layout.tsx
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';



export const metadata = {
  title: 'Aruba Cab Services',
  description: 'Customized cab and tourism packages in Sri Lanka',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
