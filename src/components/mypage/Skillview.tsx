import styles from './style.module.css';
import { Chart } from './Chart';
import { UserData,transformedObject } from '../../../types/types';

const skillview = ({ userData }: { userData: UserData }) => {

  const skillScore = {
    フロントエンド: userData.skillPoint?.FR,
    バック: userData.skillPoint?.BK,
    'データ\nベース': userData.skillPoint?.DB,
    サーバーレス: userData.skillPoint?.SBR,
    設計: userData.skillPoint?.AR,
    テスト: userData.skillPoint?.TS,
    コミュ力: userData.skillPoint?.COM,
  };

  // 数字をA~Gランクに変換
  const convertValueToRank = (value: number) => {
    if (value >= 9) {
      return 'S';
    } else if (value < 9 && value >= 8) {
      return 'A';
    } else if (value < 8 && value >= 6) {
      return 'B';
    } else if (value < 6 && value >= 5) {
      return 'C';
    } else if (value < 5 && value >= 4) {
      return 'D';
    } else if (value < 4 && value >= 3) {
      return 'E';
    } else if (value === 2) {
      return 'F';
    } else {
      return 'G';
    }
  };

  const transformedObject: transformedObject = {};

  for (const [name, value] of Object.entries(skillScore)) {
    const rank = convertValueToRank(value);
    transformedObject[name as keyof transformedObject] = rank;
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
      {userData.specialAbility.length > 0 ? (
        <>
          <section className="flex justify-around">
            <div className="">
              <div className="bg-sky-50 p-5 shadow-md text-lg">
                <div className="mb-3">
                  {/* 出しわけ */}
                  {userData.user.businessSituation ===
                  'アサイン中' ? (
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
                    <div>{userData.user?.employeeNumber}</div>
                    <div>{userData.user?.userName}</div>
                    <div>{userData.user?.affiliation}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* レーダーチャートコンポーネント */}
              <Chart skill={userData.skillPoint} />
          </section>

          <section className="flex justify-center mt-10">
            {Object.entries(transformedObject).map(
              ([key, value]:[string,string]) => (
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
                  {userData.skill?.InherentName}
                </div>
              </div>
              <div className="ml-3">
                {userData.skill?.InherentDescription}
              </div>
            </div>

            <div className="flex flex-wrap justify-center mt-5">
              {/* 配列の要素を繰り返し処理して描画 */}
              {userData.specialAbility &&
                userData.specialAbility.map(
                  (
                    ability: {
                      skillList: string;
                      skillSelection: boolean;
                      tagColor: number;
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className={
                        ability.skillSelection === false
                          ? unselected
                          : ability.tagColor === 1
                          ? selected_1
                          : ability.tagColor === 2
                          ? selected_2
                          : selected_3
                      }
                    >
                      {ability.skillList}
                    </div>
                  )
                )}
            </div>
          </section>
        </>
      ) : (
        <div className="flex justify-center items-center h-60 font-bold text-2xl">
          スキルが登録されてないよ！
        </div>
      )}
    </>
  );
};

export default skillview;
