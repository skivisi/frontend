import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  // const  {skillSummary}  = await req.json();
  // console.log(skillSummary)
  const { specData, userId, specDetail, request } = await req.json();

  // * 1, `api/spec/post/:userId`に新しいspecシートをpost
  const response = await axios.post(
    `${process.env.API_SECRET_URL}/spec/post/${userId}`,
    specData
  );
  // * 2, postしたスペックシートIdの取得
  const { specId } = await response.data;

  // * 3, `api/spec/postData/:specId`にスペックシートデータをpost
  await axios.post(
    `${process.env.API_SECRET_URL}/spec/postData/${specId}`,
    specDetail
  );

  // * 5, `api/request/post`にリクエスト作成
  await axios.post(
    `${process.env.API_SECRET_URL}/request/post`,
    request
  );

  const newSpecDetail = {
    skillSummaries: specDetail.skillSummaries,
    developmentExperiences:specDetail.developmentExperiences
  };
  await axios.post(
    `${process.env.API_SECRET_URL}/spec/autoCalibration`,
    newSpecDetail
  );

  return NextResponse.json({ message: 'ok' });
}
