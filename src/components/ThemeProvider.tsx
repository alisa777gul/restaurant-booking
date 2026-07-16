"use client";

import {
  createContext,
  useEffect,
  useState,
} from "react";


type Theme = "light" | "dark";


type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};


export const ThemeContext =
createContext<ThemeContextType>({
  theme:"light",
  toggleTheme:()=>{},
});



export default function ThemeProvider({
  children,
}:{
  children:React.ReactNode;
}) {


const [theme,setTheme] =
useState<Theme>("light");



useEffect(()=>{


const saved =
localStorage.getItem("theme");


if(saved === "dark"){

document.documentElement.classList.add("dark");

}


},[]);





function toggleTheme(){


const next =
theme === "dark"
? "light"
: "dark";



setTheme(next);



localStorage.setItem(
"theme",
next
);



if(next === "dark"){

document.documentElement.classList.add("dark");

}
else{

document.documentElement.classList.remove("dark");

}


}



return (

<ThemeContext.Provider
value={{
theme,
toggleTheme,
}}
>

{children}

</ThemeContext.Provider>

);


}