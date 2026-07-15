import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {

  title: "La Casa | Fine Dining Restaurant",

  description:
    "Experience modern cuisine, premium ingredients and unforgettable atmosphere at La Casa restaurant.",


  keywords: [
    "restaurant",
    "fine dining",
    "reservation",
    "booking",
    "La Casa",
  ],


  icons: {
    icon: "/favicon.ico",
  },

};



export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {


  return (

    <html

      lang="en"

      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}

    >


      <body

        className="
        min-h-screen
        bg-[#0b0b0b]
        text-white
        flex
        flex-col
        "

      >

        {children}


      </body>


    </html>

  );

}