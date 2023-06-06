import styles from './style.module.css';
import { Chart } from './Chart';
import { Suspense } from 'react';

const skillview = ({ userData }: { userData: any }) => {
  const skillScore = {
    フロントエンド: userData.skillPoint.FR,
    バック: userData.skillPoint.BK,
    'データ\nベース': userData.skillPoint.DB,
    サーバーレス: userData.skillPoint.SBR,
    設計: userData.skillPoint.AR,
    テスト: userData.skillPoint.TS,
    コミュ力: userData.skillPoint.COM,
  };

  // 数字をA~Gランクに変換
  const convertValueToRank = (value: number) => {
    if (value >= 95) {
      return 'S';
    } else if (value < 95 && value >= 80) {
      return 'A';
    } else if (value < 80 && value >= 65) {
      return 'B';
    } else if (value < 65 && value >= 50) {
      return 'C';
    } else if (value < 50 && value >= 40) {
      return 'D';
    } else if (value < 40 && value >= 25) {
      return 'E';
    } else if (value < 25 && value >= 10) {
      return 'F';
    } else {
      return 'G';
    }
  };

  const transformedObject: any = {};
  for (const [name, value] of Object.entries(skillScore)) {
    const rank = convertValueToRank(value);
    transformedObject[name] = rank;
  }

  const unselected =
    'w-32 text-center m-1 bg-zinc-300 border-4 border-zinc-400 rounded-xl p-1 font-bold text-zinc-400';
  const selected_1 =
    'w-32 text-center m-1 bg-rose-300 border-4 border-rose-400 rounded-xl p-1 font-bold text-rose-800';
  const selected_2 =
    'w-32 text-center m-1 bg-sky-300 border-4 border-sky-400 rounded-xl p-1 font-bold text-sky-800';
  const selected_3 =
    'w-32 text-center m-1 bg-green-300 border-4 border-green-400 rounded-xl p-1 font-bold text-green-800';

  return (
    <>
      {userData ? (
        <>
          <section className="flex justify-around">
            <div className="">
              <div className="bg-sky-50 p-5 shadow-md text-lg">
                <div className="mb-3">
                  {/* 出しわけ */}
                  {userData.user.businessSituation ? (
                    <span className="bg-sky-300 border-2 border-sky-400 rounded-xl p-1 font-bold text-sky-800">
                      エントリー
                    </span>
                  ) : (
                    <span className="bg-rose-300 border-2 border-rose-400 rounded-xl p-1 font-bold text-rose-800">
                      待機中
                    </span>
                  )}
                </div>

                <div className="flex leading-8">
                  <div className={`${styles.skillview_profile}`}>
                    <div className="">社員番号 :</div>
                    <p className="">名前:</p>
                    <div className="">所属:</div>
                  </div>
                  <div className="ml-2 font-bold">
                    <div>{userData.user.employeeNumber}</div>
                    <div>{userData.user.userName}</div>
                    <div>{userData.user.affiliation}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* レーダーチャートコンポーネント */}
            <Suspense fallback={<div>ローディング中</div>}>
              <Chart skill={userData.skillPoint} />
            </Suspense>
          </section>

          <section className="flex justify-center mt-10">
            {Object.entries(transformedObject).map(
              ([key, value]: any) => (
                <div
                  key={key}
                  className=" text-center bg-sky-50 p-2 rounded-t-xl border-2 shadow-md m-1"
                >
                  <p className="font-bold w-16 h-12 flex items-center justify-center">
                    {key}
                  </p>
                  <p className="text-4xl font-black drop-shadow-xl text-rose-500">
                    {value}
                  </p>
                </div>
              )
            )}
          </section>

          <section className=" mt-10 bg-sky-50 p-5 shadow-md">
            <div className=" flex justify-center">
              <div className=" text-center">
                <p className=" text-yellow-700 font-bold">
                  特有スキル
                </p>
                <div className="mt-2 text-center text-yellow-800 bg-yellow-200 border-yellow-400 border-4 rounded-xl p-2 font-bold">
                  {userData.skill.InherentName}
                </div>
              </div>
              <div className="ml-3">
                {userData.skill.InherentDescription}
              </div>
            </div>

            <div className="flex flex-wrap justify-center mt-5">
              {/* 配列の要素を繰り返し処理して描画 */}
              {userData.skillPoint.abilities &&
                userData.skillPoint.abilities.map(
                  (
                    ability: {
                      property: string;
                      value: any;
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className={
                        ability.value === 0
                          ? unselected
                          : ability.value === 1
                          ? selected_1
                          : ability.value === 2
                          ? selected_2
                          : selected_3
                      }
                    >
                      {ability.property}
                    </div>
                  )
                )}
            </div>
          </section>
        </>
      ) : (
        <p>no data</p>
      )}
    </>
  );
};

export default skillview;
