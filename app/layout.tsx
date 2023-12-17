import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/utils/theme";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aza - Home",
  description: "Aza's web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-light dark:bg-dark text-light dark:text-dark min-h-screen relative pt-20">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
