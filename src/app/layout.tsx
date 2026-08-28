import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
    default: "Dreamglade — Small-Group Ayahuasca Retreat near Iquitos, Peru",
    template: "%s — Dreamglade",
  },
  description:
    "A grounded ayahuasca retreat in the Peruvian Amazon. Shipibo-led ceremonies, maximum 10 guests, on 25 hectares of rainforest near Iquitos.",
  keywords: [
    "ayahuasca retreat Iquitos Peru",
    "small group ayahuasca retreat",
    "safe ayahuasca retreat",
    "Shipibo ayahuasca retreat",
    "ayahuasca retreat Peru jungle",
    "Dreamglade",
  ],
  metadataBase: new URL("https://dreamglade.com"),
  openGraph: {
    type: "website",
    siteName: "Dreamglade",
    locale: "en_US",
    images: [{ url: "/images/lake-overview.jpg", alt: "Dreamglade retreat center and lake in the Peruvian Amazon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dreamglade — Small-Group Ayahuasca Retreat near Iquitos, Peru",
    description: "Shipibo-led ceremonies, maximum 10 guests, and a human-led application process near Iquitos, Peru.",
    images: ["/images/lake-overview.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
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
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
