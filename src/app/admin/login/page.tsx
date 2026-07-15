"use client";


import {
useState
} from "react";

import {
useRouter
} from "next/navigation";



export default function AdminLogin(){


const router = useRouter();


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const [error,setError]=useState("");

const [loading,setLoading]=useState(false);




async function login(){


setLoading(true);
setError("");



const response =
await fetch(
"/api/admin/login",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email,
password

})

}
);



const data =
await response.json();



if(!response.ok){

setError(
data.error
);

setLoading(false);

return;

}



router.push(
"/admin/dashboard"
);



}





return (

<main
className="
min-h-screen
bg-[#0b0b0b]
text-white
flex
items-center
justify-center
px-6
"
>


<div
className="
w-full
max-w-md
bg-[#111]
border
border-neutral-800
rounded-3xl
p-8
"
>


<h1
className="
text-3xl
font-bold
mb-2
"
>
Restaurant Admin
</h1>


<p
className="
text-neutral-500
mb-8
"
>
Sign in to dashboard
</p>



{error && (

<div
className="
bg-red-900/30
border
border-red-700
rounded-xl
p-4
mb-5
text-red-400
"
>

{error}

</div>

)}




<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
w-full
mb-4
rounded-xl
bg-neutral-900
border
border-neutral-700
px-4
py-3
"

/>




<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
w-full
mb-6
rounded-xl
bg-neutral-900
border
border-neutral-700
px-4
py-3
"

/>




<button

onClick={login}

disabled={loading}

className="
w-full
rounded-xl
bg-yellow-500
text-black
py-3
font-semibold
hover:scale-105
transition
"

>

{
loading
?
"Loading..."
:
"Login"
}


</button>



</div>


</main>

);


}