import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import website from '../../public/Website.png';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import Link from 'next/link';
import { GetServerSideProps, NextApiRequest } from 'next';
import { useState } from 'react';

// 申請承認(管理者)
const fetcher = (
  resource: Request | URL,
  init: RequestInit | undefined
) => fetch(resource, init).then((res) => res.json());

export const getServerSideProps = async (
  context: { query: any; req: NextApiRequest },
  req: NextApiRequest
) => {
  const { query: userId, req: serverRequest } = context;
  // const { userId } = query;

  const cookies = serverRequest.cookies;
  const cookie = cookies.adminId;
  console.log(cookie);

  // idを使用してデータを取得
  // const responseUser = await axios.get(
  //   `http://localhost:8000/api/user/${id}`
  // );
  // const user = responseUser.data;

  // spec.userIdとuser.idを結びつける
  // const responseSpec = await axios.get(
  //   `http://localhost:8080/spec?userId=${user.id}`
  // );
  // const spec = responseSpec.data;

  // const responsePortfolio = await axios.get(
  //   `http://localhost:8080/portfolio`
  // );
  // const portfolio = responsePortfolio.data;

  // const responseSellingPoint = await axios.get(
  //   `http://localhost:8080/sellingPoint`
  // );
  // const sellingPoint = responseSellingPoint.data;

  // const responseQualification = await axios.get(
  //   `http://localhost:8080/qualification`
  // );
  // const qualification = responseQualification.data;

  // createdAtの一番新しい日付のデータを取得
  // const sortedSpec = spec.sort((a: any, b: any) => {
  //   return (
  //     new Date(b.createdAt).getTime() -
  //     new Date(a.createdAt).getTime()
  //   );
  // });

  // スペックシートのデータが一つの時と、複数の時の場合分け
  // let latestSpec: { id: any };
  // if (sortedSpec.length === 1) {
  //   latestSpec = spec[0];
  // } else {
  //   latestSpec = sortedSpec[0];
  // }

  // ログイン中のadminのidを取得

  return {
    props: {
      // user,
      // spec: latestSpec,
      // portfolio,
      // sellingPoint,
      // qualification,
      cookie,
      userId,
    },
  };
};

const Approval = ({
  // user,
  // spec,
  // portfolio,
  // sellingPoint,
  // qualification,
  userId,
  cookie,
}: {
  // user: any;
  // spec: any;
  // portfolio: any;
  // sellingPoint: any;
  // qualification: any;
  userId: any;
  cookie: number | null;
}) => {
  const [adminComment, setAdminComment] = useState('');
  // requestのデータ取得
  // const { data, error } = useSWR(`/api/request/`, fetcher);
  // const data = axios.get(`http://localhost:8000/api/request/:applicationId`)
  // console.log(data);
  console.log(userId.id);
  let queryId = Number(userId.id);

  const { data, error } = useSWR(`/api/request/`, fetcher);
  console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  const filteredrequest = data.filter(
    (item: any) => item.userId === queryId
  );
  console.log(filteredrequest);
  console.log(filteredrequest[0].applicationId);

  // const data = await axios.get(`/api/request/`)
  // console.log(data)

  // 承認の処理
  const approvalSubmit = async (e: any) => {
    try {
      const requestBody = {
        adminId: Number(cookie), // 現在のログイン中のcookieの
        // status: 3, // 変更後のstatusの値
        // resultedAt: new Date(), // 現在の日時を設定
      };
      const response = await axios.put(
        `http://localhost:8000/api/request/approval/${filteredrequest[0].applicationId}`,
        requestBody
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 差し戻しの処理
  
  const sendBackSubmit = async (e:any) => {
    try {
      const requestBody = {
        adminId: Number(cookie), // 現在のログイン中のcookieのid
        // status: 2, // 変更後のstatusの値
        // resultedAt: new Date(), // 現在の日時を設定
        adminComment: adminComment, // 差し戻しコメント
      };
      const response = await axios.put(
        `http://localhost:8000/api/request/denial/${filteredrequest[0].applicationId}`,
        requestBody
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      console.log(cookie);
    }
  };
  const handleAdminComment = (event: any) => {
    setAdminComment(event.target.value);
  };

  // console.log(user);
  // console.log(spec);
  // console.log(portfolio);
  // console.log(sellingPoint);
  // console.log(qualification);

  const skillSummary = {
    os: ['Linux(CentOS)', 'macOS'],
    lang: [
      'JavaScript',
      'TypeScript',
      'SQL',
      'HTML',
      'CSS',
      'シェルスクリプト',
    ],
    flame: ['Next.js(13)', 'Jest'],
    lib: ['React(18)', 'jQuery'],
    tool: ['Git', 'Vim', 'PostgreSQL14', 'VisualStudioCode'],
    detail: [
      '詳細設計',
      '実装',
      'デバッグ',
      'テスト(ブラックボックステスト仕様書作成)',
    ],
  };

  return (
    <>
      <Header />
      <div className="text-sky-900 mt-10 ml-96 text-xl font-bold">
        {/* {user.userName}さんのスキルシート */}
      </div>
      <div className="text-sky-900 flex justify-center">
        <form className="bg-blue-200 text-sky-900 max-w-4xl p-10 my-10 shadow-xl">
          <div>
            <div className="w-1/2 flex border-2 border-slate-300 mt-2 ml-2 h-10 shadow-md">
              <div className="bg-slate-200 block w-1/2 p-1">
                スタッフID
              </div>
              <div className="block w-1/2 p-2 bg-white">
                {/* {`${user.affiliation}-204-${user.employeeNumber}`} */}
              </div>
            </div>
            <div className="">
              <h3 className="mt-10 text-xl font-bold">
                ポートフォリオ
              </h3>

              <div className="mt-4">
                {/* {portfolio
                  .filter((item: any) => item.id === spec.id) // 同じidのportfolioだけをフィルタリングする
                  .map((item: any, index: any) => (
                    <div key={index} className="w-full flex">
                      <div className="w-full flex border-2 border-slate-300  h-10 ml-2 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          {item.heading}
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {item.url}
                        </div>
                      </div>
                    </div>
                  ))} */}
              </div>
            </div>
          </div>
          {/* portfolio */}

          <div>
            <h3 className="mt-10 text-xl font-bold">スキル要約</h3>

            <div className="mt-4 ml-2">
              {/* {Object.entries(skillSummary).map(([key, value]) => (
                <div
                  key={key}
                  className="w-full flex border-2 border-slate-300 h-10 shadow-md"
                >
                  <div className="bg-slate-200 block w-1/4 p-1">
                    {key}:
                  </div>
                  <div className="block w-3/4 p-2 bg-white">
                    {value.join(',')}
                  </div>
                </div>
              ))} */}
            </div>
          </div>
          {/* skillSummary */}

          <div>
            <h3 className="mt-10 text-xl font-bold">
              アピールポイント
            </h3>
            <div className="mt-4">
              <div>
                {/* {sellingPoint
                  .filter((item: any) => item.id === spec.id) // 同じidのportfolioだけをフィルタリングする
                  .map((item: any, index: number) => (
                    <div key={index} className="w-full flex">
                      <div className="w-full flex border-2 border-slate-300  ml-2 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          {item.title}
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {item.content
                            .split('\n')
                            .map((line: any, idx: number) => (
                              <p key={idx}>{line}</p>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))} */}
              </div>
            </div>
          </div>
          {/* sellingPoint */}

          <div>
            <h3 className="mt-10 text-xl font-bold">
              業務外で取り組んでいること
            </h3>
            <div className="flex mt-2">
              <div className="block w-3/4 p-2 bg-white border-2 border-slate-300 ml-2 shadow-md">
                {/* {spec.offHours.split('\n')} */}
              </div>
            </div>
          </div>
          {/* 業務外 */}

          {/* qualification資格 */}
          <div>
            <h3 className="mt-10 text-xl font-bold">資格</h3>

            <div className=" flex">
              {/* {qualification
                .filter((item: any) => item.id === spec.id)
                .map((item: any, index: number) => (
                  <div className=" w-full ml-2" key={index}>
                    <div className="flex border-2 border-slate-300 mt-2 h-10 shadow-md">
                      <div className="bg-slate-200 block w-1/4 p-1">
                        取得年月
                      </div>
                      <div className="block w-3/4 p-2 bg-white">
                        {item.acquisitionDate}
                      </div>
                    </div>

                    <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                      <div className="bg-slate-200 block w-1/4 p-1">
                        資格
                      </div>
                      <div className="block w-3/4 p-2 bg-white">
                        {item.credential}
                      </div>
                    </div>
                  </div>
                ))} */}
            </div>
          </div>
          {/* qualification資格 */}

          {/* previousWork */}
          <div>
            <h3 className="mt-10 text-xl font-bold">前職</h3>

            {/* 繰り返し処理入れる */}
            <div className=" flex mt-2">
              <div className="ml-2">
                <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                  <div className="bg-slate-200 block w-1/4 p-1">
                    業界
                  </div>
                  <div className="block w-3/4 p-2 bg-white">
                    {'金融'}
                  </div>
                </div>
                <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                  <div className="bg-slate-200 block w-1/4 p-1">
                    業種
                  </div>
                  <div className="block w-3/4 p-2 bg-white">
                    {'営業'}
                  </div>
                </div>
                <div className="w-full flex border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    業務内容
                  </label>
                  <div className="block w-3/4 p-2 bg-white ">
                    {/* {offHours.split('\n')} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* previousWork */}

          <div>
            <h3 className="mt-10 text-xl font-bold">開発経験</h3>

            {/* 繰り返し処理入れる */}
            <div className="flex">
              <div className=" w-full ml-2">
                <div className="flex border-2 border-slate-300 mt-2 h-10 shadow-md">
                  <div className="bg-slate-200 block w-1/4 p-1">
                    取得年月
                  </div>
                  <div className="block w-3/4 p-2 bg-white">
                    {'YY-MM'}
                  </div>
                </div>

                <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                  <div className="bg-slate-200 block w-1/4 p-1">
                    プロジェクト名
                  </div>
                  <div className="block w-3/4 p-2 bg-white">
                    {'ECサイト'}
                  </div>
                </div>

                <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                  <div className="bg-slate-200 block w-1/4 p-1">
                    言語
                  </div>
                  <div className="block w-3/4 p-2 bg-white">
                    {'js, java'}
                  </div>
                </div>

                <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                  <div className="bg-slate-200 block w-1/4 p-1">
                    フレームワーク
                  </div>
                  <div className="block w-3/4 p-2 bg-white">
                    {'react, vue'}
                  </div>
                </div>
              </div>
              <div className=" items-center">
                <Image
                  src={website}
                  width={500}
                  height={100}
                  alt="Picture of the author"
                />
              </div>
            </div>
          </div>
          {/* developmentExperience */}

          <div className="text-center">
            <button
              onClick={(e) => approvalSubmit(e)}
              type="button"
              className="shadow-md mt-10 h-12  cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid"
            >
              <Link href="/dashboard/dbAdmin">
                <span className="text-white font-bold m-5">
                  承認する
                </span>
              </Link>
            </button>
          </div>

          <div className="border-t-2 mt-10">
            <section className="bg-blue-200 text-sky-900">
              <div>
                <h3 className="mt-10 text-xl font-bold">
                  コメントする
                </h3>
                <textarea
                  name=""
                  id=""
                  className={`border-2 border-slate-300 p-2 m-2 w-full shadow-md`}
                  cols={70}
                  rows={10}
                  placeholder="差し戻しの理由を記入してください"
                  onChange={handleAdminComment}
                ></textarea>
              </div>
            </section>
          </div>
          <div className="text-center">
            <button
              onClick={(e) => sendBackSubmit(e)}
              type="button"
              className="shadow-md mt-10 h-12 cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid"
            >
              <Link href="/dashboard/dbAdmin">
                <span className="text-white font-bold m-5">
                  差し戻す
                </span>
              </Link>
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Approval;
