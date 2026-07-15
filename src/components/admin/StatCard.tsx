type Props = {
  title:string;
  value:number;
};


export default function StatCard({
  title,
  value,
}:Props){

return (

<div
className="
bg-[#111]
border
border-neutral-800
rounded-2xl
p-6
hover:border-yellow-500
transition
"
>

<p className="text-neutral-400">
{title}
</p>


<p className="
text-4xl
font-bold
mt-3
">
{value}
</p>


</div>

);

}