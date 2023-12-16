import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/utils/theme";

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
    <html lang="en">
      <body className="bg-light dark:bg-dark text-light dark:text-dark">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
