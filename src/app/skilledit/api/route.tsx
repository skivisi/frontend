import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    const  skills = await req.json();
    console.log(skills.skill)
    console.log(skills.skillPoint)
  return NextResponse.json({ message:"ok" });
}


// postの形
// {
//   "InherentName": "スキル",
//   "InherentDescription":"スキルが高い",
//   "FR": 5,
//   "BK":4,
//   "DB":4,
//   "SBR":4,
//   "AR":2,
//   "TS":2,
//   "COM":3,
//   "abilities": [
//     { "property": "予知能力", "value": true, "color":1 },
//     { "property": "テックリード", "value": false, "color":3 },
//     { "property": "vim職人", "value": false, "color":4 },
//     { "property": "shell芸人", "value": true, "color":2 },
//     { "property": "超ポジティブ", "value": false, "color":3 }
//   ]
// }
