'use client';

import { motion } from 'framer-motion';


export default function ScaleIn({
  children,
}:{
  children:React.ReactNode;
}){

return (

<motion.div

initial={{
opacity:0,
scale:0.9,
}}

whileInView={{
opacity:1,
scale:1,
}}

viewport={{
once:true,
amount:0.2,
}}

transition={{
duration:0.6,
ease:'easeOut',
}}

>

{children}

</motion.div>

);

}