/* eslint-disable react-hooks/rules-of-hooks */
/*
① 編集ページ遷移
*/

import Image from 'next/image';
import { UserData,Portfolio ,SellingPoint,Qualification, PreviousWork, DevelopmentExperience  } from '../../../types/types';
import website from '../../public/Website.png';

const specview = ({ userData }: { userData: UserData }) => {

  return (
    <>
      {userData.portfolio.length > 0 ? (
        <>
          <div>
            <div className="w-full flex border-2 border-slate-300 mt-2 shadow-md">
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
                  userData.portfolio.map((i:Portfolio, index: number) => (
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
              <div className="w-full flex border-2 border-slate-300 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  動作環境（OS）
                </div>
                <div className="flex w-3/4 p-2 bg-white">
                  {userData.skillSummaries.environment.map(
                    (i: string, index: number) => (
                      <div key={index} className=" mr-2">
                        {`${i},`}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  言語
                </div>
                <div className="flex w-3/4 p-2 bg-white">
                  {userData.skillSummaries.programmingLanguage.map(
                    (i: string, index: number) => (
                      <div key={index} className=" mr-2">
                        {`${i},`}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  フレームワーク
                </div>
                <div className="flex w-3/4 p-2 bg-white">
                  {userData.skillSummaries.framework.map(
                    (i: string, index: number) => (
                      <div key={index} className=" mr-2">
                        {`${i},`}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  ライブラリ
                </div>
                <div className="flex w-3/4 p-2 bg-white">
                  {userData.skillSummaries.library.map(
                    (i: string, index: number) => (
                      <div key={index} className=" mr-2">
                        {`${i},`}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  クラウド
                </div>
                <div className="flex w-3/4 p-2 bg-white">
                  {userData.skillSummaries.cloud.map(
                    (i: string, index: number) => (
                      <div key={index} className=" mr-2">
                        {`${i},`}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  ツール・その他
                </div>
                <div className="flex w-3/4 p-2 bg-white">
                  {userData.skillSummaries.tool.map(
                    (i: string, index: number) => (
                      <div key={index} className=" mr-2">
                        {`${i},`}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  担当開発工程
                </div>
                <div className="flex w-3/4 p-2 bg-white">
                  {userData.skillSummaries.developmentDomain.map(
                    (i: string, index: number) => (
                      <div key={index} className=" mr-2">
                        {`${i},`}
                      </div>
                    )
                  )}
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
                    (point: SellingPoint, index: number) => (
                      <div key={index} className="w-full flex">
                        <div className="w-full flex border-2 border-slate-300 shadow-md">
                          <div className="bg-slate-200 block w-1/4 p-1">
                            {point.title}
                          </div>
                          <div className="block w-3/4 p-2 bg-white">
                            {point.content
                              .split('\n')
                              .map((line: string, index: number) => (
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
                {userData?.spec?.offHours.split('\n')}
              </div>
            </div>
          </div>
          {/* 業務外 */}

          {/* qualification資格 */}
          <div>
            <h3 className="mt-10 text-xl font-bold">資格</h3>

            <div className=" flex">
              {/* 繰り返し処理入れる */}
              {userData.qualification.map((i: Qualification) => (
                <div className=" w-full" key={i.specId}>
                  <div className="flex border-2 border-slate-300 mt-2 shadow-md">
                    <div className="bg-slate-200 block w-1/4 p-1">
                      取得年月
                    </div>
                    <div className="block w-3/4 p-2 bg-white">
                      {i.acquisitionDate}
                    </div>
                  </div>

                  <div className=" flex border-2 border-slate-300 shadow-md">
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

            {userData.previousWork.map((i: PreviousWork, index: number) => (
              <div className=" flex mt-2" key={i.specId}>
                <div>
                  <div className="w-full flex border-2 border-slate-300 shadow-md">
                    <div className="bg-slate-200 block w-1/4 p-1">
                      業界
                    </div>
                    <div className="block w-3/4 p-2 bg-white">
                      {i.industry}
                    </div>
                  </div>
                  <div className="w-full flex border-2 border-slate-300 shadow-md">
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
              (i: DevelopmentExperience, index: number) => (
                <div className="" key={i.specId}>
                  <div className="flex">
                    <div className=" w-full">
                      <div className="flex border-2 border-slate-300 mt-2 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          開始年月
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.startDate}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          担当役割
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.assignedTask}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          チーム人数
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.teamSize}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          PJ全体人数
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.totalProjectHeadcount}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          プロジェクト名
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.projectName}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          動作環境
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {'js, java'}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          言語
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {'js, java'}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          フレームワーク
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {'react, vue'}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 shadow-md">
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

                  <div className=" flex border-2 border-slate-300 shadow-md">
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
        <div className="flex justify-center items-center h-60 font-bold text-2xl">
          スペックシートが登録されてないよ！
        </div>
      )}
    </>
  );
};

export default specview;
