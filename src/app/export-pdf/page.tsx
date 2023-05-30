'use client';
import '../globals.css';
import Image from 'next/image';
import website from '../../public/Website.png';

function mock() {}
function handleBlur() {
  // ここでバリデーションチェックしたらサブミット前にクライアントに入力の誤りわかるからいいよね
  alert('フォーカスが外れました');
}

const portfolio = [
  {
    github: 'url...',
  },
  {
    qiita: 'url...',
  },
];
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
const sellingPoint = [
  {
    title: 'タイトル',
    content:
      'ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト\nダミーテキストダミーテキストダミーテキストダミーテキスト\nダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト',
  },
  {
    title: 'タイトル',
    content:
      'ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト\nダミーテキストダミーテキストダミーテキストダミーテキスト\nダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト',
  },
];
const offHours =
  'ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト\nダミーテキストダミーテキストダミーテキストダミーテキスト\nダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト';

function Home() {
  return (
    <section className="bg-blue-200 text-sky-900 max-w-4xl p-10 my-10 shadow-xl">
      <h2 className="text-3xl font-bold mb-5 drop-shadow-white">
        スペックシートをエクスポート(PDF化)
      </h2>
      <p className="mb-3">
        スペックシートに記載したい内容にチェックを入れて、「PDF化」ボタンをクリックしてください
      </p>
      <form action="/">
        <div>
          <div className="w-1/2 flex border-2 border-slate-300 mt-2 ml-5 h-10 shadow-md">
            <div className="bg-slate-200 block w-1/2 p-1">
              スタッフID
            </div>
            <div className="block w-1/2 p-2 bg-white">
              {`${`職種`}-204-${'社員番号'}`}
            </div>
          </div>
          <div className="">
            <h3 className="mt-10 text-xl font-bold">
              ポートフォリオ
            </h3>

            <div className="mt-4">
              {portfolio.map((item, index) =>
                Object.entries(item).map(([name, value]) => (
                  <div key={index} className="w-full flex">
                    <input type="checkbox" />
                    <div className="w-full flex border-2 border-slate-300  h-10 ml-2 shadow-md">
                      <div className="bg-slate-200 block w-1/4 p-1">
                        {name}
                      </div>
                      <div className="block w-3/4 p-2 bg-white">
                        {value}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* portfolio */}

        <div>
          <h3 className="mt-10 text-xl font-bold">スキル要約</h3>

          <div className="mt-4 ml-5">
            {Object.entries(skillSummary).map(([key, value]) => (
              <div
                key={key}
                className="w-full flex border-2 border-slate-300 h-10 shadow-md"
              >
                <div className="bg-slate-200 block w-1/4 p-1">
                  {key}:
                </div>
                <div className="block w-3/4 p-2 bg-white">
                  {value.join(',')}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* skillSummary */}

        <div>
          <h3 className="mt-10 text-xl font-bold">
            アピールポイント
          </h3>
          <div className="mt-4">
            <div>
              {sellingPoint.map((point, index) => (
                <div key={index} className="w-full flex">
                  <input type="checkbox" />
                  <div className="w-full flex border-2 border-slate-300  ml-2 shadow-md">
                    <div className="bg-slate-200 block w-1/4 p-1">
                      {point.title}
                    </div>
                    <div className="block w-3/4 p-2 bg-white">
                      {point.content.split('\n').map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* sellingPoint */}

        <div>
          <h3 className="mt-10 text-xl font-bold">
            業務外で取り組んでいること
          </h3>
          <div className="flex mt-2">
            <input type="checkbox" />
            <div className="block w-3/4 p-2 bg-white border-2 border-slate-300 ml-2 shadow-md">
              {offHours.split('\n')}
            </div>
          </div>
        </div>
        {/* 業務外 */}

        {/* qualification資格 */}
        <div>
          <h3 className="mt-10 text-xl font-bold">資格</h3>

          <div className=" flex">
            {/* 繰り返し処理入れる */}
            <input type="checkbox" />
            <div className=" w-full ml-2">
              <div className="flex border-2 border-slate-300 mt-2 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  取得年月
                </div>
                <div className="block w-3/4 p-2 bg-white">
                  {'YY-MM'}
                </div>
              </div>

              <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  資格
                </div>
                <div className="block w-3/4 p-2 bg-white">
                  {'なんか免許'}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* qualification資格 */}

        {/* previousWork */}
        <div>
          <h3 className="mt-10 text-xl font-bold">前職</h3>

          {/* 繰り返し処理入れる */}
          <div className=" flex mt-2">
            <input type="checkbox" />
            <div className="ml-2">
              <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  業界
                </div>
                <div className="block w-3/4 p-2 bg-white">
                  {'金融'}
                </div>
              </div>
              <div className="w-full flex border-2 border-slate-300 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  業種
                </div>
                <div className="block w-3/4 p-2 bg-white">
                  {'営業'}
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
                  {offHours.split('\n')}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* previousWork */}

        <div>
          <h3 className="mt-10 text-xl font-bold">開発経験</h3>

          {/* 繰り返し処理入れる */}
          <div className="flex">
            <input type="checkbox" />

            <div className=" w-full ml-2">
              <div className="flex border-2 border-slate-300 mt-2 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  取得年月
                </div>
                <div className="block w-3/4 p-2 bg-white">
                  {'YY-MM'}
                </div>
              </div>

              <div className=" flex border-2 border-slate-300 h-10 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  プロジェクト名
                </div>
                <div className="block w-3/4 p-2 bg-white">
                  {'ECサイト'}
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
        </div>
        {/* developmentExperience */}

        <div className="text-center">
          <button
            onClick={mock}
            type="button"
            className="shadow-md mt-10 h-12  cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid"
          >
            <span className="text-white font-bold m-5">PDF化</span>
          </button>
        </div>
      </form>
    </section>
  );
}

export default Home;
