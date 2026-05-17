import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DreamGlade — Small-Group Ayahuasca Retreat near Iquitos, Peru",
    template: "%s — DreamGlade",
  },
  description:
    "A grounded ayahuasca retreat in the Peruvian Amazon. Shipibo-led ceremonies, maximum 10 guests, on 20 hectares of rainforest near Iquitos.",
  keywords: [
    "ayahuasca retreat Iquitos Peru",
    "small group ayahuasca retreat",
    "safe ayahuasca retreat",
    "Shipibo ayahuasca retreat",
    "ayahuasca retreat Peru jungle",
    "DreamGlade",
  ],
  metadataBase: new URL("https://dreamglade.com"),
  openGraph: {
    type: "website",
    siteName: "DreamGlade",
    locale: "en_US",
    images: [{ url: "/images/lake-overview.jpg" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable}`}
    >
      <body className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
