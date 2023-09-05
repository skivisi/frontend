import Image from 'next/image';
import {
  UserData,
  Portfolio,
  SellingPoint,
  Qualification,
  PreviousWork,
  DevelopmentExperience,
} from '../../../types/types';
import { useState, useEffect } from 'react';

const PdfSpecView = ({ userData }: { userData: UserData }) => {
  const encodedNoimage =
    'data:image/png;base64,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';
  const [encodedImages, setEncodedImages] = useState<string[]>([]);

  useEffect(() => {
    // 初期状態を設定
    setEncodedImages([]);

    userData.developmentExperience.forEach((item) => {
      encode(item.img);
    });
  }, [userData.developmentExperience]);

  function encode(img: string) {
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STRAGE_URL}/${img}`;
    // const imageUrl = `https://axjhbffzfuoqnocmlavs.supabase.co/storage/v1/object/public/skivisi/${img}`;
    const image = new window.Image();
    image.crossOrigin = 'Anonymous';

    image.onload = function (event) {
      const imgElement = event.target as HTMLImageElement;
      const canvas = document.createElement('canvas');
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(imgElement, 0, 0);
        const base64Image = canvas.toDataURL('image/png');
        // Base64エンコードされた画像を状態の配列に追加
        setEncodedImages((prevImages) => [
          ...prevImages,
          base64Image,
        ]);
      }
    };

    image.src = imageUrl;
  }

  return (
    <>
      {userData.spec?.github.length > 0 ||
      userData.spec?.offHours.length > 0 ||
      userData.portfolio.length > 0 ||
      userData.skillSummaries.specId !== 0 ||
      userData.sellingPoint.length > 0 ||
      userData.qualification.length > 0 ||
      userData.previousWork.length > 0 ||
      userData.developmentExperience.length > 0 ? (
        <>
          <div id="pdf-id" className=" m-auto">
            <div>
              <h3 className="mt-10 text-xl font-bold">スタッフID</h3>
              <div className="w-full flex border-2 border-slate-300 mt-2 shadow-md">
                <div className="bg-slate-200 block w-1/4 p-1">
                  スタッフID
                </div>
                <div className="block w-3/4 p-2 bg-white">
                  {`${userData.user.affiliation}-204-${userData.user.employeeNumber}`}
                </div>
              </div>

              <div className="">
                <h3 className="mt-10 text-xl font-bold">Github</h3>

                <div className="mt-4">
                  <div className="w-full flex">
                    <div className="w-full flex border-2 border-slate-300 shadow-md">
                      <div className="bg-slate-200 block w-1/4 p-1">
                        Github
                      </div>
                      <div
                        className="block w-3/4 p-2 bg-white"
                        data-testid="github"
                      >
                        {userData.spec?.github}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* github */}
              <div className="">
                <h3 className="mt-10 text-xl font-bold">
                  ポートフォリオ
                </h3>

                <div className="mt-4">
                  {userData &&
                    userData.portfolio.map(
                      (i: Portfolio, index: number) => (
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
                      )
                    )}
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
                    {userData.skillSummaries.environment.join(',')}
                  </div>
                </div>
                <div className="w-full flex border-2 border-slate-300 shadow-md">
                  <div className="bg-slate-200 block w-1/4 p-1">
                    言語
                  </div>
                  <div className="flex w-3/4 p-2 bg-white">
                    {userData.skillSummaries.programmingLanguage.join(
                      ','
                    )}
                  </div>
                </div>
                <div className="w-full flex border-2 border-slate-300 shadow-md">
                  <div className="bg-slate-200 block w-1/4 p-1">
                    フレームワーク
                  </div>
                  <div className="flex w-3/4 p-2 bg-white">
                    {userData.skillSummaries.framework.join(',')}
                  </div>
                </div>
                <div className="w-full flex border-2 border-slate-300 shadow-md">
                  <div className="bg-slate-200 block w-1/4 p-1">
                    ライブラリ
                  </div>
                  <div className="flex w-3/4 p-2 bg-white">
                    {userData.skillSummaries.library.join(',')}
                  </div>
                </div>
                <div className="w-full flex border-2 border-slate-300 shadow-md">
                  <div className="bg-slate-200 block w-1/4 p-1">
                    クラウド
                  </div>
                  <div className="flex w-3/4 p-2 bg-white">
                    {userData.skillSummaries.cloud.join(',')}
                  </div>
                </div>
                <div className="w-full flex border-2 border-slate-300 shadow-md">
                  <div className="bg-slate-200 block w-1/4 p-1">
                    ツール・その他
                  </div>
                  <div className="flex w-3/4 p-2 bg-white">
                    {userData.skillSummaries.tool.join(',')}
                  </div>
                </div>
                <div className="w-full flex border-2 border-slate-300 shadow-md">
                  <div className="bg-slate-200 block w-1/4 p-1">
                    担当開発工程
                  </div>
                  <div className="flex w-3/4 p-2 bg-white">
                    {userData.skillSummaries.developmentDomain.join(
                      ','
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
                                .map(
                                  (line: string, index: number) => (
                                    <p key={index}>{line}</p>
                                  )
                                )}
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

              {userData.previousWork.map(
                (i: PreviousWork, index: number) => (
                  <div className="mt-2" key={i.specId}>
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
                )
              )}
            </div>
            {/* previousWork */}

            <div>
              <h3 className="mt-10 text-xl font-bold">開発経験</h3>

              {/* 繰り返し処理入れる */}
              {userData.developmentExperience.map(
                (i: DevelopmentExperience, index: number) => (
                  <div className="" key={i.specId}>
                    <div className=" w-full">
                      <div className="flex border-2 border-slate-300 mt-2 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          開始年月
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.startYear}年{i.startDate}月
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          期間
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.duration}
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
                          {i.environments.join(',')}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          言語
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.programmingLanguages.join(',')}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          フレームワーク
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.frameworks.join(',')}
                        </div>
                      </div>

                      <div className=" flex border-2 border-slate-300 shadow-md">
                        <div className="bg-slate-200 block w-1/4 p-1">
                          ツール・その他
                        </div>
                        <div className="block w-3/4 p-2 bg-white">
                          {i.tools.join(',')}
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
                      <div className="m-3 flex justify-center">
                        <Image
                          src={
                            i.img
                              ? encodedImages[index]
                              : encodedNoimage
                          }
                          width={800}
                          height={400}
                          alt="Picture of the architecture"
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
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

export default PdfSpecView;
