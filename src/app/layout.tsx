import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/set/Navbar";

export const metadata: Metadata = {
  title: "Home • KYMOVIES",
  description: "Movie Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-950">
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
