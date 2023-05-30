'use client';

import SkillScores from '@/components/mypage/skilledit/SkillScores';
import styles from './style.module.css';

const skillItems = Array(21).fill(null);
const skillEdit = () => {
  return (
    <div className="max-w-4xl p-10 my-10 shadow-xl">
      {/* スキルポイント */}
      <section>
        <div className="bg-teal-800 py-5 border-4 border-slate-300 shadow-md">
          <h3 className="text-xl font-bold text-teal-50 ml-5">
            スキルスコア
          </h3>
          <SkillScores skillTag="fr" skillName="フロントエンド" />
          <SkillScores skillTag="bk" skillName="バックエンド" />
          <SkillScores skillTag="db" skillName="データベース" />
          <SkillScores skillTag="sbr" skillName="サーバーレス" />
          <SkillScores skillTag="ar" skillName="設計" />
          <SkillScores skillTag="ts" skillName="テスト" />
          <SkillScores
            skillTag="com"
            skillName="コミュニケーション"
          />
        </div>

        <div className="clock">
          <div className="h-hand"></div>
          <div className="m-hand"></div>
          <div className="s-hand"></div>
        </div>
      </section>

      {/* 特有スキル */}
      <section className=" mt-5 p-5 shadow-md text-teal-800">
        <h3 className="text-xl font-bold">特有スキル</h3>
        <div className="w-full flex border-2 border-slate-300 mt-3 h-10 shadow-md">
          <label
            className=" block w-1/4 p-1 bg-teal-800 text-teal-50"
            htmlFor=""
          >
            タイトル
          </label>
          <input
            className={`${styles.focus} block w-3/4 p-2 bg-white`}
            type="text"
            name=""
            id=""
            defaultValue={'mock'}
          />
        </div>
        <div className="w-full flex border-2 border-slate-300 shadow-md">
          <label
            className="block w-1/4 p-1 bg-teal-800 text-teal-50"
            htmlFor=""
          >
            内容
          </label>
          <textarea
            name=""
            id=""
            className={`${styles.focus} p-2`}
            cols={65}
            rows={5}
            defaultValue={'mock'}
          ></textarea>
        </div>
      </section>
      {/* スペシャルアビリティ */}
      <section className=" mt-5 p-5 shadow-md text-teal-800 bg-white">
        <h3 className="text-xl font-bold">スペシャルスキル</h3>
        <div className="flex flex-wrap justify-center mt-3">
          {/* 配列の要素を繰り返し処理して描画 */}
          {skillItems.map((item, index) => (
            <div
              key={index}
              className="w-32 text-center m-1 bg-rose-300 border-4 border-rose-400 rounded-xl p-1 font-bold text-rose-800 shadow-md"
            >
              スキル名 {index}
            </div>
          ))}
        </div>
      </section>

      <div className="text-center">
        <button
          // onClick={mock}
          type="button"
          className="shadow-md mt-10 h-16 px-10 text-2xl cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-4 border-white"
        >
          <span className="text-white font-bold m-5">登録</span>
        </button>
      </div>
    </div>
  );
};

export default skillEdit;
