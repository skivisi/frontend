/* eslint-disable react-hooks/rules-of-hooks */
/*
① 編集ページ遷移
*/

import Image from 'next/image';
import website from '../../public/Website.png';
import { useState } from 'react';

const specview = ({ userData }: { userData: any }) => {
  const [data, setData] = useState<number>();

  console.log(userData);
  console.log(userData.techResult);

  const os = userData.techResult.filter((p: any) => p.category === 1);
  const lang = userData.techResult.filter(
    (p: any) => p.category === 2
  );
  const framework = userData.techResult.filter(
    (p: any) => p.category === 3
  );
  const library = userData.techResult.filter(
    (p: any) => p.category === 4
  );
  const cloud = userData.techResult.filter(
    (p: any) => p.category === 5
  );
  const tool = userData.techResult.filter(
    (p: any) => p.category === 6
  );
  const assignedDevelopment = userData.techResult.filter(
    (p: any) => p.category === 7
  );

  console.log(os);

  return (
    <>
      {userData ? (
        <>
          <div>
            <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
              <div className="bg-slate-200 block w-1/4 p-1">
                スタッフID
              </div>
              <div className="block w-3/4 p-2 bg-white">
                {`${userData.user.affiliation}-204-${userData.user.employeeNumber}`}
              </div>
            </div>

            <div className="">
              <h3 className="mt-10 text-xl font-bold">
                ポートフォリオ
              </h3>

              <div className="mt-4">
                {userData &&
                  userData.portfolio.map((i: any, index: any) => (
                    <div key={index} className="w-full flex">
                      <div className="w-full flex border-2 border-slate-300 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          {i.heading}
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.url}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* portfolio */}

          <div>
            <h3 className="mt-10 text-xl font-bold">スキル要約</h3>

            <div className="mt-4">
              <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  動作環境（OS）
                </div>
                {/* {value.join(',')} */}
                <div className="flex w-3/4 p-2 bg-white">
                  {os.map((i: any, index: any) => (
                    <div key={i} className=" mr-2">
                      {`${i.skill},`}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  言語
                </div>
                {/* {value.join(',')} */}
                <div className="flex w-3/4 p-2 bg-white">
                  {lang.map((i: any, index: any) => (
                    <div key={i} className=" mr-2">
                      {`${i.skill},`}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  フレームワーク
                </div>
                {/* {value.join(',')} */}
                <div className="flex w-3/4 p-2 bg-white">
                  {framework.map((i: any, index: any) => (
                    <div key={i} className=" mr-2">
                      {`${i.skill},`}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  ライブラリ
                </div>
                {/* {value.join(',')} */}
                <div className="flex w-3/4 p-2 bg-white">
                  {library.map((i: any, index: any) => (
                    <div key={i} className=" mr-2">
                      {`${i.skill},`}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  クラウド
                </div>
                {/* {value.join(',')} */}
                <div className="flex w-3/4 p-2 bg-white">
                  {cloud.map((i: any, index: any) => (
                    <div key={i} className=" mr-2">
                      {`${i.skill},`}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  ツール・その他
                </div>
                {/* {value.join(',')} */}
                <div className="flex w-3/4 p-2 bg-white">
                  {tool.map((i: any, index: any) => (
                    <div key={i} className=" mr-2">
                      {`${i.skill},`}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  担当開発工程
                </div>
                {/* {value.join(',')} */}
                <div className="flex w-3/4 p-2 bg-white">
                  {assignedDevelopment.map((i: any, index: any) => (
                    <div key={i} className=" mr-2">
                      {`${i.skill},`}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* skillSummary */}

          <div>
            <h3 className="mt-10 text-xl font-bold">
              アピールポイント
            </h3>
            <div className="mt-4">
              <div>
                {userData &&
                  userData.sellingPoint.map(
                    (point: any, index: any) => (
                      <div key={index} className="w-full flex">
                        <div className="w-full flex border-2 border-slate-300 shadow-md">
                          <div className="bg-slate-200 block w-1/4 p-1">
                            {point.title}
                          </div>
                          <div className="block w-3/4 p-2 bg-white">
                            {point.content
                              .split('\n')
                              .map((line: any, index: any) => (
                                <p key={index}>{line}</p>
                              ))}
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
          {/* sellingPoint */}

          <div>
            <h3 className="mt-10 text-xl font-bold">
              業務外で取り組んでいること
            </h3>
            <div className="flex mt-2">
              <div className="block w-full p-2 bg-white border-2 border-slate-300 shadow-md">
                {userData.spec.offHours.split('\n')}
              </div>
            </div>
          </div>
          {/* 業務外 */}

          {/* qualification資格 */}
          <div>
            <h3 className="mt-10 text-xl font-bold">資格</h3>

            <div className=" flex">
              {/* 繰り返し処理入れる */}
              {userData.qualification.map((i: any) => (
                <div className=" w-full" key={i.specId}>
                  <div className="flex border-2 border-slate-300 mt-2 h-10 shadow-md">
                    <div className="bg-slate-200 block w-1/4 p-1">
                      取得年月
                    </div>
                    <div className="block w-3/4 p-2 bg-white">
                      {i.acquisitionDate}
                    </div>
                  </div>

                  <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                    <div className="bg-slate-200 block w-1/4 p-1">
                      資格
                    </div>
                    <div className="block w-3/4 p-2 bg-white">
                      {i.credential}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* qualification資格 */}

          {/* previousWork */}
          <div>
            <h3 className="mt-10 text-xl font-bold">前職</h3>

            {userData.previousWork.map((i: any, index: any) => (
              <div className=" flex mt-2" key={i.specId}>
                <div>
                  <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                    <div className="bg-slate-200 block w-1/4 p-1">
                      業界
                    </div>
                    <div className="block w-3/4 p-2 bg-white">
                      {i.industry}
                    </div>
                  </div>
                  <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                    <div className="bg-slate-200 block w-1/4 p-1">
                      業種
                    </div>
                    <div className="block w-3/4 p-2 bg-white">
                      {i.occupation}
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
                      {i.JobDuties.split('\n')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* previousWork */}

          <div>
            <h3 className="mt-10 text-xl font-bold">開発経験</h3>

            {/* 繰り返し処理入れる */}
            {userData.developmentExperience.map(
              (i: any, index: any) => (
                <div className="" key={i.specId}>
                  <div className="flex">
                    <div className=" w-full">
                      <div className="flex border-2 border-slate-300 mt-2 h-10 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          開始年月
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.startDate}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          担当役割
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.assignedTask}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          チーム人数
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.teamSize}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          PJ全体人数
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.totalProjectHeadcount}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          プロジェクト名
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.projectName}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          動作環境
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {'js, java'}
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

                      <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          ツール・その他
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

                  <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                    <div className="bg-slate-200 block w-1/4 p-1">
                      業務内容
                    </div>
                    <div className="block w-3/4 p-2 bg-white">
                      {i.jobDuties}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          {/* developmentExperience */}
        </>
      ) : (
        <p>no data</p>
      )}
    </>
  );
};

export default specview;

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
