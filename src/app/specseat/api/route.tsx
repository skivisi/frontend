import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    const  {skillSummary}  = await req.json();
    console.log(skillSummary)
  return NextResponse.json({ message:"ok" });
}


// const formData = {
//     skillSummary: skillSummary,
//     portfolios: portfolios,
//     selling: selling,
//     qls: qls,
//     previousWorks: previousWorks,
//     developmentExperiences: developmentExperiences,
//   };
