import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  // const  {skillSummary}  = await req.json();
  // console.log(skillSummary)
  const { specData, userId, specDetail } = await req.json();
  // console.log(specDetail);

  // * 1, `api/spec/post/:userId`に新しいspecシートをpost
  const response = await axios.post(
    `http://localhost:8000/api/spec/post/${userId}`,
    specData
  );
  // * 2, postしたスペックシートIdの取得
  const { specId } = await response.data;
  await axios.post(
    `http://localhost:8000/api/spec/postData/${specId}`,
    specDetail
  );

  // * 3, `api/spec/postData/:specId`にスペックシートデータをpost

  // * 4, `api/upload/`に画像データpost

  return NextResponse.json({ message: 'ok' });
}
