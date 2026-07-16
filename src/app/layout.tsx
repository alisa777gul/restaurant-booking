import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";


const geist = Geist({
  subsets:["latin"],
});


export const metadata: Metadata = {

  title:"BookFlow - Smart Booking System",

  description:
  "Modern booking platform for every business",

};



export default function RootLayout({
children,
}:{
children:React.ReactNode;
}){


return (

<html
lang="en"
suppressHydrationWarning
>

<body
className={`
${geist.className}
min-h-screen
bg-white
text-neutral-900
dark:bg-[#09090b]
dark:text-white
`}
>


<ThemeProvider>

{children}

</ThemeProvider>


</body>


</html>

);


}