import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import AppProvider from "../components/AppContext"
import {  Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Next",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-6xl mx-auto p-4">
          <AppProvider>
            <Toaster></Toaster>
          <Header />
          {children}
          <footer className="border-t p-8 text-center text-gray-500">
            &copy; 2023 All rights reserved
          </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
