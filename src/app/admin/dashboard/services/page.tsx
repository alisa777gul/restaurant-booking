"use client";

import {
useEffect,
useState
} from "react";


type Service={
id:number;
name:string;
description:string|null;
duration:number;
price:number|null;
};



export default function ServicesPage(){


const [services,setServices]=
useState<Service[]>([]);


const [name,setName]=
useState("");

const [duration,setDuration]=
useState(30);

const [price,setPrice]=
useState("");



async function load(){


const res=
await fetch(
"/api/admin/services"
);


const data=
await res.json();


setServices(data);


}



useEffect(() => {

  const controller = new AbortController();


  async function fetchServices(){

    try{

      const res = await fetch(
        "/api/admin/services",
        {
          signal: controller.signal
        }
      );


      const data = await res.json();


      setServices(data);


    }catch(error){

      if(error instanceof Error && error.name !== "AbortError"){
        console.error(error);
      }

    }

  }


  fetchServices();


  return () => {
    controller.abort();
  };


},[]);



async function create(){


await fetch(
"/api/admin/services",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name,

duration,

price

})

}

);


setName("");

setPrice("");

setDuration(30);


load();


}




return (

<div className="p-8 space-y-8">


<h1 className="text-3xl font-bold">
Services
</h1>



<div className="
bg-white
border
rounded-3xl
p-6
space-y-4
">


<input

placeholder="Service name"

value={name}

onChange={
e=>setName(e.target.value)
}

className="border rounded-xl p-3 w-full"

/>



<input

type="number"

placeholder="Duration"

value={duration}

onChange={
e=>setDuration(
Number(e.target.value)
)
}

className="border rounded-xl p-3 w-full"

/>




<input

type="number"

placeholder="Price"

value={price}

onChange={
e=>setPrice(e.target.value)
}

className="border rounded-xl p-3 w-full"

/>



<button

onClick={create}

className="
bg-blue-600
text-white
px-6
py-3
rounded-xl
"

>

Add service

</button>


</div>





<div className="space-y-3">


{
services.map(service=>(

<div

key={service.id}

className="
border
rounded-2xl
p-4
flex
justify-between
"

>


<div>

<p className="font-bold">
{service.name}
</p>

<p className="text-sm text-neutral-500">
{service.duration} min
</p>

</div>


<div>
{service.price ?? 0} €
</div>


</div>


))
}


</div>



</div>

)


}