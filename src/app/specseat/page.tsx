'use client';
import Image from 'next/image';
import '../globals.css';
import styles from './style.module.css';
import Button from '@/components/specseat/button';

function mock() {}
function handleBlur() {
  // ここでバリデーションチェックしたらサブミット前にクライアントに入力の誤りわかるからいいよね
  alert('フォーカスが外れました');
}

function Home() {
  return (
    <section className="bg-blue-200 text-sky-900 max-w-4xl p-10 my-10 shadow-xl">
      <h2 className="text-3xl font-bold mb-5">スペックシート登録</h2>
      <form action="/">
        <div>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="stuff">
              スタッフID
            </label>
            {/* className={`${Noto_Sans_JP_normal.className} flex justify-center`} */}
            <input
              className={`${styles.focus} block w-3/4 p-2`}
              id="stuff"
              type="text"
              readOnly
              defaultValue={`${`職種`}-204-${'社員番号'}`}
            />
          </div>
          <div className="">
            <h3 className="mt-10 text-xl font-bold">
              ポートフォリオ
            </h3>
            <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
              <label
                className="bg-slate-200 block w-1/4 p-1"
                htmlFor="portfolio"
              >
                {'github'}
              </label>
              <input
                className={`${styles.focus} block w-3/4 p-2`}
                type="text"
                name=""
                id="portfolio"
                onBlur={handleBlur}
              />
            </div>
            <Button name="ポートフォリオ" />
          </div>
        </div>
        {/* portfolio */}

        <div>
          <h3 className="mt-10 text-xl font-bold">スキル要約</h3>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              動作環境(OS)
            </label>
            <input
              className={`${styles.focus} block w-3/4 p-2`}
              type="text"
              defaultValue={`mock`}
            />
          </div>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              言語
            </label>
            <input
              className={`${styles.focus} block w-3/4 p-2`}
              type="text"
              defaultValue={`mock`}
            />
          </div>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              フレームワーク
            </label>
            <input
              className={`${styles.focus} block w-3/4 p-2`}
              type="text"
              defaultValue={`mock`}
            />
          </div>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              ライブラリ
            </label>
            <input
              className={`${styles.focus} block w-3/4 p-2`}
              type="text"
              defaultValue={`mock`}
            />
          </div>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              クラウド
            </label>
            <input
              className={`${styles.focus} block w-3/4 p-2`}
              type="text"
              defaultValue={`mock`}
            />
          </div>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              ツール･その他
            </label>
            <input
              className={`${styles.focus} block w-3/4 p-2`}
              type="text"
              defaultValue={`mock`}
            />
          </div>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              担当開発工程
            </label>
            <input
              className={`${styles.focus} block w-3/4 p-2`}
              type="text"
              defaultValue={`mock`}
            />
          </div>
        </div>
        {/* skillSummary */}

        <div>
          <h3 className="mt-10 text-xl font-bold">
            アピールポイント
          </h3>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              タイトル
            </label>
            <input
              className={`${styles.focus} block w-3/4 p-2`}
              type="text"
              name=""
              id=""
              defaultValue={'mock'}
            />
          </div>
          <div className="w-full flex border-2 border-slate-300 mt-2 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              内容
            </label>
            <textarea
              name=""
              id=""
              className={`${styles.focus} p-2`}
              cols={42}
              rows={10}
              defaultValue={'mock'}
            ></textarea>
          </div>
          <Button name="アピールポイント" />
        </div>
        {/* sellingPoint */}

        <div>
          <h3 className="mt-10 text-xl font-bold">
            業務外で取り組んでいること
          </h3>
          <textarea
            name=""
            id=""
            className={`${styles.focus} border-2 border-slate-300 p-2`}
            cols={56}
            rows={10}
            defaultValue={'mock'}
          ></textarea>
        </div>
        {/* 業務外 */}

        <div>
          <h3 className="mt-10 text-xl font-bold">資格</h3>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              取得年
            </label>
            <select name="" id="" className={`${styles.focus} w-1/4 text-center`}>
              <option defaultValue="2000">2000</option>
              <option defaultValue="2001">2001</option>
            </select>
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              取得月
            </label>
            <select name="" id="" className={`${styles.focus} w-1/4 text-center`}>
              <option defaultValue="1">1</option>
              <option defaultValue="2">2</option>
            </select>
          </div>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              資格
            </label>
            <input className={`${styles.focus} block w-3/4 p-2`} type="text" />
          </div>
          <Button name="資格" />
        </div>
        {/* qualification資格 */}

        <div>
          <h3 className="mt-10 text-xl font-bold">前職</h3>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              業界
            </label>
            <input className={`${styles.focus} block w-3/4 p-2`} type="text" />
          </div>
          <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              業種
            </label>
            <input className={`${styles.focus} block w-3/4 p-2`} type="text" />
          </div>
          <div className="w-full flex border-2 border-slate-300 mt-2 shadow-md">
            <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
              業務内容
            </label>
            <textarea
              name=""
              id=""
              className={`${styles.focus} p-2`}
              cols={42}
              rows={10}
              defaultValue={'mock'}
            ></textarea>
          </div>
          <Button name="前職" />
        </div>
        {/* previousWork */}

        <div>
          <h3 className="mt-10 text-xl font-bold">開発経験</h3>
          <div className="">
            <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
              <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
                開始年
              </label>
              <select name="" id="" className={`${styles.focus} w-1/4 text-center`}>
                <option defaultValue="2000">2000</option>
                <option defaultValue="2001">2001</option>
              </select>
              <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
                開始月
              </label>
              <select name="" id="" className={`${styles.focus} w-1/4 text-center`}>
                <option defaultValue="1">1</option>
                <option defaultValue="2">2</option>
              </select>
            </div>
            <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
              <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
                期間
              </label>
              <input className={`${styles.focus} block w-3/4 p-2`} type="text" />
            </div>
            <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
              <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
                担当役割
              </label>
              <input className={`${styles.focus} block w-3/4 p-2`} type="text" />
            </div>
            <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
              <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
                チーム人数
              </label>
              <input className={`${styles.focus} block w-3/4 p-2`} type="text" />
            </div>
            <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
              <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
                PJ全体人数
              </label>
              <input className={`${styles.focus} block w-3/4 p-2`} type="text" />
            </div>
            <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
              <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
                プロジェクト名
              </label>
              <input className={`${styles.focus} block w-3/4 p-2`} type="text" />
            </div>
            <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
              <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
                動作環境
              </label>
              <input className={`${styles.focus} block w-3/4 p-2`} type="text" />
            </div>
            <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
              <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
                言語
              </label>
              <input className={`${styles.focus} block w-3/4 p-2`} type="text" />
            </div>
            <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
              <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
                フレームワーク
              </label>
              <input className={`${styles.focus} block w-3/4 p-2`} type="text" />
            </div>
            <div className="w-full flex border-2 border-slate-300 mt-2 h-10 shadow-md">
              <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
                ツール･その他
              </label>
              <input className={`${styles.focus} block w-3/4 p-2`} type="text" />
            </div>
            <div className="w-full flex mt-2 h-10 ">
              <label className="bg-slate-200 block w-1/4 pt-2 px-1 text-sm border-2 border-slate-300 shadow-md" htmlFor="">
                アーキテクチャ
              </label>
              <input className=" block w-3/4 mt-1 ml-2" type="file" />
            </div>
            <div className="w-full flex border-2 border-slate-300 mt-2 shadow-md">
              <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
                業務内容
              </label>
              <textarea
                name=""
                id=""
                className={`${styles.focus} p-2`}
                cols={42}
                rows={10}
                defaultValue={'mock'}
              ></textarea>
            </div>
          </div>

          <Button name="開発経験" />
        </div>
        {/* developmentExperience */}
        <div className="text-center">
          <button
            onClick={mock}
            type="button"
            className="shadow-md mt-10 h-12  cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid"
          >
            <span className="text-white font-bold m-5">
              確認画面へ
            </span>
          </button>
        </div>
      </form>
    </section>
  );
}

export default Home;
