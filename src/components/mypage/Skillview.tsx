'use client';

import styles from './style.module.css';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const skills = [
  'フロントエンド',
  'バックエンド',
  'データベース',
  'サーバーレス',
  '設計',
  'テスト',
  'コミュニケーション',
];
const chartData: ChartData<'radar'> = {
  labels: skills,
  datasets: [
    {
      label: '成熟度',
      data: [5, 7, 6, 2, 5, 6, 5],
      backgroundColor: 'rgba(19, 224, 145, 0.6)',
      borderColor: 'rgba(19, 224, 145, 1)',
      borderWidth: 1,
    },
  ],
};

const chartOptions: ChartOptions<'radar'> = {
  scales: {
    r: {
      min: 1,
      max: 10,
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const skillview = () => {
  const skillScore = Array(7).fill(null);
  const skillItems = Array(21).fill(null);

  return (
    <>
      <div className="flex">
        <h2 className="text-3xl font-bold mb-5 drop-shadow-white">
          スキルシート
        </h2>
        <div className="text-center">
          <button
            // onClick={mock}
            type="button"
            className="shadow-md h-12 ml-2 relative bottom-2 cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid"
          >
            <span className="text-white font-bold m-5 text-lg">
              編集
            </span>
          </button>
        </div>
      </div>

      <section className="flex justify-around">
        <div className="">
          <div className="bg-sky-50 p-5 shadow-md text-lg">
            <div className="mb-3">
              {/* 出しわけ */}
              <span className="bg-rose-300 border-2 border-rose-400 rounded-xl p-1 font-bold text-rose-800">
                待機中
              </span>
              <span className="bg-sky-300 border-2 border-sky-400 rounded-xl p-1 font-bold text-sky-800">
                エントリー
              </span>
            </div>
            <div className="flex leading-8">
              <div className={`${styles.skillview_profile}`}>
                <div className="">社員番号 :</div>
                <p className="">名前:</p>
                <div className="">所属:</div>
              </div>
              <div className="ml-2 font-bold">
                <div>{2312}</div>
                <div>{'葉加瀬 太郎'}</div>
                <div>{'フロントエンドエンジニア'}</div>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-white shadow-md">
          <div
            className=" bg-sky-50"
            style={{ width: '400px', height: '400px' }}
          >
            <Radar data={chartData} options={chartOptions} />
          </div>
        </div>
      </section>

      <section className="flex justify-center mt-10">
        {skillScore.map((i, index) => (
          <div
            key={index}
            className=" text-center bg-sky-50 p-2 rounded-t-xl border-2 shadow-md m-1"
          >
            <p className="font-bold">コミュニケーション</p>
            <p className="text-4xl font-black drop-shadow-xl text-rose-500">
              A
            </p>
          </div>
        ))}
      </section>

      <section className=" mt-10 bg-sky-50 p-5 shadow-md">
        <div className=" flex justify-center">
          <div className=" text-center">
            <p className=" text-yellow-700 font-bold">特有スキル</p>
            <div className="mt-2 text-center text-yellow-800 bg-yellow-200 border-yellow-400 border-4 rounded-xl p-2 font-bold">
              自分だけのスキル
            </div>
          </div>
          <div className="">自分だけのスキルを書いてね</div>
        </div>

        <div className="flex flex-wrap justify-center mt-5">
          {/* 配列の要素を繰り返し処理して描画 */}
          {skillItems.map((item, index) => (
            <div
              key={index}
              className="w-32 text-center m-1 bg-rose-300 border-4 border-rose-400 rounded-xl p-1 font-bold text-rose-800"
            >
              スキル名 {index}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default skillview;

// userId	userのID
// email	メールアドレス
// employeeNumber	社員番号
// joinDate	入社年月日
// userName	ユーザーの名前
// affiliation	所属
// businessSituation	待機かアサインしているか（業務形態）
