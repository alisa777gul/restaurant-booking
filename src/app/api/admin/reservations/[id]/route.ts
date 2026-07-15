/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function PATCH(
 request:Request,
 {params}:{params:{id:string}}
){

try{


const body =
await request.json();


const reservation =
await prisma.reservation.update({

where:{
 id:Number(params.id)
},


data:{
 status:body.status
}

});


return NextResponse.json(reservation);


}catch(error){

console.error(error);


return NextResponse.json(
{
error:"Update failed"
},
{
status:500
}
);


}

}




export async function DELETE(
request:Request,
{params}:{params:{id:string}}
){


try{


await prisma.reservation.delete({

where:{
id:Number(params.id)
}

});


return NextResponse.json({
success:true
});


}catch(error){


return NextResponse.json(
{
error:"Delete failed"
},
{
status:500
}
);


}


}