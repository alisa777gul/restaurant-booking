"use client";


import { useRouter } from "next/navigation";


export default function LogoutButton(){


const router = useRouter();



async function logout(){


await fetch(
"/api/admin/logout",
{
method:"POST"
}
);



router.push(
"/admin/login"
);



router.refresh();


}



return (

<button

onClick={logout}

className="
rounded-xl
bg-red-600
text-white
px-5
py-3
font-semibold
hover:bg-red-700
transition
"

>

Logout

</button>

);


}