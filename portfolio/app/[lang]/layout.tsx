import { Locale } from "@/i18n-config";
import clsx from "clsx";
import { Inter, Noto_Sans_SC, Poppins } from "next/font/google";
import "@/styles/globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { Suspense } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const zhFont = Noto_Sans_SC({
  weight: ["100", "400"],
  subsets: ["latin"],
  variable: "--font-zh",
  display: "swap",
});
export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={clsx(
        lang === "zh"
          ? zhFont.variable
          : `font-sans ${poppins.variable} ${inter.variable} antialiased`
      )}
      style={{
        fontFamily: lang === "zh" ? "var(--font-zh)" : "var(--font-eng)",
      }}
    >
      <body className="min-h-screen flex flex-col">
        <ClientWrapper>
          <Suspense fallback={null}>{children}</Suspense>
        </ClientWrapper>
        <div id="modal-root" />
      </body>
    </html>
  );
}
