import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic"; // ✅ Import here

export const metadata = {
  title: "Aruba Cab Services",
  description: "Customized cab and tourism packages in Sri Lanka",
  openGraph: {
    title: "Aruba Cab Services",
    description: "Customized cab and tourism packages in Sri Lanka",
    url: "https://aruba-cabs.vercel.app",
    siteName: "Aruba Cab Services",
    images: [
      {
        url: "https://aruba-cabs.vercel.app/og-image.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aruba Cab Services",
    description: "Customized cab and tourism packages in Sri Lanka",
    images: ["https://aruba-cabs.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <BackgroundMusic /> {/* ✅ Plays music after first click */}
        <Header />
        <main className="flex-grow container mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
