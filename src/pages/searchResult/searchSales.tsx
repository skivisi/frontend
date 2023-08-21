import Header from '@/components/header';
import Footer from '@/components/footer';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextApiRequest } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../../../types/types';
import Cookies from 'js-cookie';



// 検索結果(営業)

type Query = {
  foundUser: string;
};

type cookies = {
  userId?: string;
  affiliation?: string;
};

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const { query, req } = context;
  const cookies = req.cookies;
  return {
    props: {
      query,
      cookies
    },
  };
};

const SearchSales = ({
  query,
  cookies
}: {
  query: Query;
  cookies: cookies;
}) => {
  const router = useRouter();
  const [users, setUsers] = useState(JSON.parse(query.foundUser));
  const [businessSituation, setBusinessSituation] = useState('');

  const affiliationCookie = cookies.affiliation;
  const affiliation = affiliationCookie ? affiliationCookie : null;

  // const getCookie = (Name: string) => {
  //   return Cookies.get(Name);
  // };
  // const affiliationCookie = getCookie('affiliation')
  // const adminIdCookie = getCookie('adminId')
  // const adminId = Number(adminIdCookie)


  // if (!affiliation) {
  //   window.location.reload();
  //   return <div>Loading...</div>;
  // }

  const redirectToMyPage = (userId:number) => {
    // /mypage/page へリダイレクトし、クエリパラメーターとして userId を付加
    router.push(`/mypage?userId=${userId}`);
  }

  const handleChange = async (user: User) => {
    try {
      const changedBusinessSituation =
        user.businessSituation === 'アサイン中'
          ? '待機中'
          : 'アサイン中';
      const requestBody = {
        businessSituation: changedBusinessSituation,
      };
      const userId = user.userId;
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/businessSituation/${userId}`,
        requestBody
      );

      setBusinessSituation(changedBusinessSituation);

      // users配列内のユーザーのbusinessSituationを更新する
      const updatedUsers = users.map((u: User) => {
        if (u.userId === user.userId) {
          return {
            ...u,
            businessSituation: changedBusinessSituation,
          };
        }
        return u;
      });

      // 更新されたusers配列をセットする
      setUsers(updatedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="text-sky-900 flex-grow">
        <div className="ml-24 my-14 text-2xl flex">
          <div>検索結果&nbsp;&nbsp;&nbsp;</div>
          <div>{users.length}</div>
          <div>件</div>
        </div>
        <div
          className="border-blue-200 rounded-md bg-blue-200 mx-auto max-w-6xl"
          style={{ borderWidth: '100px' }}
        >
          <div className="text-center">
            <div className="">
              <div className="flex justify-center text-xl space-x-32">
                <div className="w-24">社員番号</div>
                <div className="w-24">入社年月</div>
                <div className="w-24">名前</div>
                <div className="w-24">所属</div>
                <div className="w-24">業務状況</div>
              </div>
            </div>

            {affiliation !== null ? (
              <div>
                {users.map((user: User, index: number) => (
                  <a
                    key={index}
                    href="#"
                    className="flex justify-center mt-14 text-lg space-x-32 border-b-2 border-light-blue-500 pb-2"
                    onClick={() =>redirectToMyPage(user.userId)}
                  >
                    <div className="w-24">{user.employeeNumber}</div>
                    <div className="w-24 pl-4">{user.joinDate}</div>
                    <div className="w-32 pl-3">{user.userName}</div>
                    <div className="w-24">{user.affiliation}</div>
                    <div className="w-28">
                      {user.businessSituation}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div>
                {users.map((user: User, index: number) => (
                  <div
                    key={index}
                    className="mt-14 text-lg border-b-2 border-light-blue-500 pb-2"
                  >
                    <a
                      href="#"
                      className="relative flex justify-center space-x-32 mr-10 mb-2"
                      onClick={() =>redirectToMyPage(user.userId)}
                    >
                      <div
                        className="absolute"
                        style={{ left: '2%' }}
                      >
                        {user.employeeNumber}
                      </div>
                      <div
                        className="absolute"
                        style={{ left: '9%' }}
                      >
                        {user.joinDate}
                      </div>
                      <div
                        className="absolute"
                        style={{ left: '35%' }}
                      >
                        {user.userName}
                      </div>
                      <div
                        className="relative"
                        style={{ left: '26%' }}
                      >
                        {user.affiliation}
                      </div>
                      <div></div>
                    </a>
                    <div className="relative">
                      <button
                        className="absolute mb-2 w-28 text-center shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white"
                        style={{ bottom: '70%', left: '90%' }}
                        onClick={() => handleChange(user)}
                      >
                        <div>
                          {user.businessSituation === 'アサイン中'
                            ? 'アサイン中'
                            : '待機中'}
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
};

export default SearchSales;
