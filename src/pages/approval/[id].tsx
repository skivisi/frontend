import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import useSWR from 'swr';
import Link from 'next/link';
import { GetServerSideProps, NextApiRequest } from 'next';
import { useEffect, useState } from 'react';
import { userFetch } from '../../app/mypage/_lib/userFetch';
import Specview from '@/components/mypage/Specview';
import { Request } from '../../../types/types';

// 申請承認(管理者)
const fetcher = (
  resource: RequestInfo,
  init: RequestInit | undefined
) => fetch(resource, init).then((res) => res.json());

type Query = {
  QueryId: number;
};

export const getServerSideProps = async (context: {
  query: Query;
  req: NextApiRequest;
}) => {
  const { query: userId, req: serverRequest } = context;
  const cookies = serverRequest.cookies;
  const cookie = cookies.userId;
  const adminId = cookies.adminId;

  return {
    props: {
      cookie: cookie || null,
      userId,
      adminId,
    },
  };
};

const Approval = ({
  userId,
  cookie,
  adminId,
}: {
  userId: { id: number };
  cookie: number | null;
  adminId: number | null;
}) => {
  let argId = Number(userId.id);

  const userData = userFetch(true, argId);
  const [adminComment, setAdminComment] = useState('');

  const { data, error } = useSWR(`/api/request/`, fetcher);

  if (!data) {
    return <div>Loading...</div>;
  }

  const filteredRequest = data.filter(
    (item: Request) => item.userId === argId
  );

  // 承認の処理
  const approvalSubmit = async () => {
    try {
      const requestBody = {
        adminId: Number(adminId), // 現在のログイン中のcookie
      };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/request/approval/${filteredRequest[0].applicationId}`,
        requestBody
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 差し戻しの処理
  const sendBackSubmit = async () => {
    try {
      const requestBody = {
        adminId: Number(adminId), // 現在のログイン中のcookieのid
        // status: 2, // 変更後のstatusの値
        // resultedAt: new Date(), // 現在の日時を設定
        adminComment: adminComment, // 差し戻しコメント
      };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/request/denial/${filteredRequest[0].applicationId}`,
        requestBody
      );
    } catch (error) {
      console.log(cookie);
    }
  };
  const handleAdminComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAdminComment(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="text-sky-900 mt-10 ml-96 text-xl font-bold">
        {/* {user.userName}さんのスキルシート */}
      </div>
      <div className="text-sky-900 flex justify-center">
        <form className="bg-blue-200 text-sky-900 max-w-4xl p-10 my-10 shadow-xl">
          <Specview userData={userData} />

          <div className="text-center">
            <button
              onClick={(e) => approvalSubmit()}
              type="button"
              className="shadow-md mt-10 h-12  cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid"
              data-testid="approvalButton"
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
              data-testid="sendBackButton"
              onClick={(e) => sendBackSubmit()}
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
