import Header from '@/components/header';
import Footer from '@/components/footer';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// 営業DB(検索機能)
export const getServerSideProps: GetServerSideProps = async () => {
  const userData = await axios.get(`http://localhost:8000/user`);
  const userList = userData.data;
  console.log(userList);

  return {
    props: {
      userList,
    },
  };
};

const DbSales = (userList: any) => {
  const users = userList.userList;
  console.log(users);
  const router = useRouter();

  // 絞り込み検索
  const [affiliation, setAffiliation] = useState(null);
  const [businessSituation, setBusinessSituation] = useState('');
  const handleAffiliationChange = (event: any) => {
    setAffiliation(event.target.value);
  };

  const handleChange = (event: any) => {
    const foundUser = users.filter((user: any) => {
      if (
        user.businessSituation === businessSituation &&
        user.affiliation === affiliation
      ) {
        return user;
      } else if (
        user.businessSituation === businessSituation &&
        !affiliation
      ) {
        return user;
      } else if (
        user.affiliation === affiliation &&
        !businessSituation
      ) {
        return user;
      } else {
        return null;
      }
    });
    console.log(foundUser);
    router.push(
      `/searchResult/searchSales?foundUser=${encodeURIComponent(
        JSON.stringify(foundUser)
      )}`
    );
  };

  // エンジニア名で検索
  const [searchUser, setSearchUser] = useState('');
  const handleSearch = () => {
    const foundUser = users.filter((user: any) =>
      user.userName.includes(searchUser)
    );
    console.log(foundUser);
    router.push(
      `/searchResult/searchSales?foundUser=${encodeURIComponent(
        JSON.stringify(foundUser)
      )}`
    );
  };

  return (
    <>
      <Header />
      <div className="text-sky-900 mx-auto px-10 mt-10 py-5 border-blue-200 rounded-md bg-blue-200 shadow-xl max-w-4xl">
        <section className="text-center mt-12">
          <h2 className="text-4xl mb-10 pt-12">エンジニア検索</h2>
          <form className="mb-5">
            <input
              type="text"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="ユーザー名を入力してください"
              className="w-72 rounded-md py-1.5 bg-white shadow-xl border-2 border-slate-300"
            />
          </form>

          <button
            onClick={handleSearch}
            className="text-xl px-3 py-1 shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white"
          >
            検索する
          </button>
        </section>
      </div>

      <div className="text-sky-900 mx-auto px-10 mt-24 py-5 border-blue-200 rounded-md bg-blue-200 shadow-xl max-w-4xl">
        <section className="text-center pb-12">
          <h2 className="text-4xl mb-10 mt-28">スキル検索</h2>

          {/* <form> */}
          <div className="flex mx-auto max-w-7xl">
            <div className="w-1/4 pt-5 text-2xl mb-5 bg-sky-50 shadow-xl border-2 border-slate-300">
              業務状況
            </div>

            <form className="w-3/4 flex justify-center mx-auto max-w-7xl text-xl py-5 p-3 mb-5 bg-white shadow-xl border-2 border-slate-300">
              <div className="mr-32">
                <input
                  type="radio"
                  name="businessSituation"
                  id="待機中"
                  className="hidden peer"
                  value="待機中"
                  checked={businessSituation === '待機中'}
                  onChange={(e) =>
                    setBusinessSituation(e.target.value)
                  }
                />
                <label
                  htmlFor="待機中"
                  className="mx-auto text-center border-2 rounded-2xl border-gray-900 p-2 my-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  待機中
                </label>
              </div>
              <div className="">
                <input
                  type="radio"
                  name="businessSituation"
                  id="アサイン中"
                  className="hidden peer"
                  value="アサイン中"
                  checked={businessSituation === 'アサイン中'}
                  onChange={(e) =>
                    setBusinessSituation(e.target.value)
                  }
                />
                <label
                  htmlFor="アサイン中"
                  className="mx-auto text-center border-2 rounded-2xl border-gray-900 p-2 my-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  アサイン中
                </label>
              </div>
            </form>
          </div>

          <div className="flex">
            <div className="w-1/4 text-2xl pt-5 bg-sky-50 shadow-xl border-2 border-slate-300">
              職種
            </div>
            <form className="w-3/4 mx-auto flex justify-between text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
              <div className="">
                <input
                  type="radio"
                  name="affiliation"
                  value="FR"
                  checked={affiliation === 'FR'}
                  onChange={handleAffiliationChange}
                  id="FR"
                  className="hidden peer"
                />
                <label
                  htmlFor="FR"
                  className="block text-center border-2 rounded-2xl border-gray-900 py-2 px-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  FR
                </label>
              </div>
              <div className="">
                <input
                  type="radio"
                  name="affiliation"
                  value="JAVA"
                  checked={affiliation === 'JAVA'}
                  onChange={handleAffiliationChange}
                  id="JAVA"
                  className="hidden peer"
                />
                <label
                  htmlFor="JAVA"
                  className="block text-center border-2 rounded-2xl border-gray-900 py-2 px-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  JAVA
                </label>
              </div>
              <div className="">
                <input
                  type="radio"
                  name="affiliation"
                  value="QA"
                  checked={affiliation === 'QA'}
                  onChange={handleAffiliationChange}
                  id="QA"
                  className="hidden peer"
                />
                <label
                  htmlFor="QA"
                  className="block text-center border-2 rounded-2xl border-gray-900 py-2 px-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  QA
                </label>
              </div>
              <div className="">
                <input
                  type="radio"
                  name="affiliation"
                  value="ML"
                  checked={affiliation === 'ML'}
                  onChange={handleAffiliationChange}
                  id="ML"
                  className="hidden peer"
                />
                <label
                  htmlFor="ML"
                  className="block text-center border-2 rounded-2xl border-gray-900 py-2 px-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  ML
                </label>
              </div>
              <div className="">
                <input
                  type="radio"
                  name="affiliation"
                  value="CL"
                  checked={affiliation === 'CL'}
                  onChange={handleAffiliationChange}
                  id="CL"
                  className="hidden peer"
                />
                <label
                  htmlFor="CL"
                  className="block text-center border-2 rounded-2xl border-gray-900 py-2 px-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  CL
                </label>
              </div>
              <div className="pr-4">
                <input
                  type="radio"
                  name="affiliation"
                  value="PHP"
                  checked={affiliation === 'PHP'}
                  onChange={handleAffiliationChange}
                  id="PHP"
                  className="hidden peer"
                />
                <label
                  htmlFor="PHP"
                  className="block text-center border-2 rounded-2xl border-gray-900 py-2 px-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  PHP
                </label>
              </div>
            </form>
          </div>

          {affiliation === 'FR' && (
            <div className="flex mt-5">
              <div className="w-1/4 text-2xl pt-6 bg-sky-50 shadow-xl border-2 border-slate-300">
                スキル
              </div>
              <form className="w-3/4 flex justify-center text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
                <div className="grid grid-cols-4">
                  <div className="">
                    <label htmlFor="3" className="pr-8">
                      <input type="checkbox" id="3" />
                      JavaScript
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="4" className="pr-8">
                      <input type="checkbox" id="4" />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="5" className="pr-8">
                      <input type="checkbox" id="5" />
                      Vue
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="6" className="pr-8">
                      <input type="checkbox" id="6" />
                      Angular
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="7" className="pr-8">
                      <input type="checkbox" id="7" />
                      jQuery
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="8" className="pr-8">
                      <input type="checkbox" id="8" />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="9" className="pr-8">
                      <input type="checkbox" id="9" />
                      React
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          {affiliation === 'JAVA' && (
            <div className="flex mt-5">
              <div className="w-1/4 text-2xl pt-6 bg-sky-50 shadow-xl border-2 border-slate-300">
                スキル
              </div>
              <form className="w-3/4 flex justify-center text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
                <div className="grid grid-cols-4">
                  <div className="">
                    <label htmlFor="3" className="pr-8">
                      <input type="checkbox" id="3" />
                      Java
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="4" className="pr-8">
                      <input type="checkbox" id="4" />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="5" className="pr-8">
                      <input type="checkbox" id="5" />
                      Vue
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="6" className="pr-8">
                      <input type="checkbox" id="6" />
                      Angular
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="7" className="pr-8">
                      <input type="checkbox" id="7" />
                      jQuery
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="8" className="pr-8">
                      <input type="checkbox" id="8" />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="9" className="pr-8">
                      <input type="checkbox" id="9" />
                      React
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          {affiliation === 'QA' && (
            <div className="flex mt-5">
              <div className="w-1/4 text-2xl pt-6 bg-sky-50 shadow-xl border-2 border-slate-300">
                スキル
              </div>
              <form className="w-3/4 flex justify-center text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
                <div className="grid grid-cols-4">
                  <div className="">
                    <label htmlFor="3" className="pr-8">
                      <input type="checkbox" id="3" />
                      JavaScript
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="4" className="pr-8">
                      <input type="checkbox" id="4" />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="5" className="pr-8">
                      <input type="checkbox" id="5" />
                      Vue
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="6" className="pr-8">
                      <input type="checkbox" id="6" />
                      Angular
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="7" className="pr-8">
                      <input type="checkbox" id="7" />
                      jQuery
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="8" className="pr-8">
                      <input type="checkbox" id="8" />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="9" className="pr-8">
                      <input type="checkbox" id="9" />
                      React
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          {affiliation === 'ML' && (
            <div className="flex mt-5">
              <div className="w-1/4 text-2xl pt-6 bg-sky-50 shadow-xl border-2 border-slate-300">
                スキル
              </div>
              <form className="w-3/4 flex justify-center text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
                <div className="grid grid-cols-4">
                  <div className="">
                    <label htmlFor="3" className="pr-8">
                      <input type="checkbox" id="3" />
                      Python
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="4" className="pr-8">
                      <input type="checkbox" id="4" />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="5" className="pr-8">
                      <input type="checkbox" id="5" />
                      Vue
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="6" className="pr-8">
                      <input type="checkbox" id="6" />
                      Angular
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="7" className="pr-8">
                      <input type="checkbox" id="7" />
                      jQuery
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="8" className="pr-8">
                      <input type="checkbox" id="8" />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="9" className="pr-8">
                      <input type="checkbox" id="9" />
                      React
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          {affiliation === 'CL' && (
            <div className="flex mt-5">
              <div className="w-1/4 text-2xl pt-6 bg-sky-50 shadow-xl border-2 border-slate-300">
                スキル
              </div>
              <form className="w-3/4 flex justify-center text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
                <div className="grid grid-cols-4">
                  <div className="">
                    <label htmlFor="3" className="pr-8">
                      <input type="checkbox" id="3" />
                      JavaScript
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="4" className="pr-8">
                      <input type="checkbox" id="4" />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="5" className="pr-8">
                      <input type="checkbox" id="5" />
                      Vue
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="6" className="pr-8">
                      <input type="checkbox" id="6" />
                      Angular
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="7" className="pr-8">
                      <input type="checkbox" id="7" />
                      jQuery
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="8" className="pr-8">
                      <input type="checkbox" id="8" />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="9" className="pr-8">
                      <input type="checkbox" id="9" />
                      React
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          {affiliation === 'PHP' && (
            <div className="flex mt-5">
              <div className="w-1/4 text-2xl pt-6 bg-sky-50 shadow-xl border-2 border-slate-300">
                スキル
              </div>
              <form className="w-3/4 flex justify-center text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
                <div className="grid grid-cols-4">
                  <div className="">
                    <label htmlFor="3" className="pr-8">
                      <input type="checkbox" id="3" />
                      PHP
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="4" className="pr-8">
                      <input type="checkbox" id="4" />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="5" className="pr-8">
                      <input type="checkbox" id="5" />
                      Vue
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="6" className="pr-8">
                      <input type="checkbox" id="6" />
                      Angular
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="7" className="pr-8">
                      <input type="checkbox" id="7" />
                      jQuery
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="8" className="pr-8">
                      <input type="checkbox" id="8" />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="9" className="pr-8">
                      <input type="checkbox" id="9" />
                      React
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="mt-5">
            <div className="text-2xl">
              その他
              <input
                type="text"
                className="ml-3 bg-white shadow-xl border-2 border-slate-300"
              />
            </div>
          </div>

          <button
            className="text-xl mt-5 px-3 py-1 shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white"
            onClick={handleChange}
          >
            検索する
          </button>
          {/* </form> */}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default DbSales;
