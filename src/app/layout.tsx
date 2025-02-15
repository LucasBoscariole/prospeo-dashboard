import type { Metadata } from "next";
import "../styles/globals.css";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Prospeo Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="flex h-screen">
        <Toaster position="top-center" reverseOrder={false} />
        <Sidebar />
        <div className="w-full">
          <TopBar />
          <main className="h-[calc(100vh_-_88px)] overscroll-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
