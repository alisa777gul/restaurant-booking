"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Sparkles } from "lucide-react";


export default function AdminLogin(){

const router = useRouter();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const [error,setError]=useState("");
const [loading,setLoading]=useState(false);



async function login(){

setLoading(true);
setError("");

const response = await fetch(
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


const data = await response.json();


if(!response.ok){

setError(data.error);

setLoading(false);

return;

}


router.push("/admin/dashboard");

}




return (

<main

className="
min-h-screen

bg-linear-to-b
from-white
to-neutral-100

dark:from-[#09090b]
dark:to-[#111]

flex
items-center
justify-center

px-6

relative
overflow-hidden

"

>


<div

className="
absolute
top-20
right-20

w-96
h-96

bg-blue-500/20

blur-3xl

rounded-full

"

/>



<div

className="
relative

w-full
max-w-md

"

>



<div

className="
bg-white/80

dark:bg-neutral-950/80

backdrop-blur-xl

border

border-neutral-200
dark:border-neutral-800

rounded-3xl

shadow-2xl

p-8

"

>



<div

className="
flex
justify-center
mb-6

"

>


<div

className="
w-16
h-16

rounded-2xl

bg-blue-500/10

text-blue-600

dark:text-blue-400

flex
items-center
justify-center

"

>

<Sparkles size={32}/>

</div>


</div>





<h1

className="
text-3xl

font-bold

text-center

tracking-tight

"

>

BookFlow Admin

</h1>



<p

className="
text-neutral-500

text-center

mt-2
mb-8

"

>

Manage your bookings easily

</p>





{
error && (

<div

className="
mb-5

rounded-xl

bg-red-500/10

border

border-red-500/20

p-4

text-red-500

text-sm

"

>

{error}

</div>

)

}





<div className="space-y-4">



<div className="relative">


<Mail

size={18}

className="
absolute
left-4
top-1/2
-translate-y-1/2

text-neutral-400

"

/>


<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
w-full

rounded-xl

bg-neutral-100

dark:bg-neutral-900

border

border-neutral-200
dark:border-neutral-800

pl-12
pr-4

py-3.5

outline-none

focus:border-blue-500

transition

"

/>


</div>






<div className="relative">


<Lock

size={18}

className="
absolute
left-4
top-1/2
-translate-y-1/2

text-neutral-400

"

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
w-full

rounded-xl

bg-neutral-100

dark:bg-neutral-900

border

border-neutral-200
dark:border-neutral-800

pl-12
pr-4

py-3.5

outline-none

focus:border-blue-500

transition

"

/>


</div>



</div>







<button

onClick={login}

disabled={loading}

className="
w-full

mt-6

rounded-xl

bg-blue-600

text-white

py-3.5

font-semibold

shadow-lg

shadow-blue-500/20

hover:bg-blue-500

hover:scale-[1.02]

transition

disabled:opacity-50

"

>

{

loading
?
"Signing in..."
:
"Login"

}


</button>




</div>




<p

className="
text-center

text-sm

text-neutral-500

mt-6

"

>

BookFlow booking platform

</p>



</div>



</main>

);

}