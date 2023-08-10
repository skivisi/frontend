/* eslint-disable react/jsx-key */
'use client';

import '../globals.css';
import styles from './style.module.css';
import { useState, useEffect } from 'react';
import { userFetch } from '../mypage/_lib/userFetch';
import { autoComplete } from './_lib/autoComplete';
import { recreateFiles } from './_lib/recreateFiles';
import RequestButton from './components/RequestButton';
import {
  DefaultUser,
  InputData,
  Qualification,
} from '../types/t';
import AddFormButton from './components/AddFormButton';
import SellingPoints from './components/SellingPoints';
import Portfolios from './components/Portfolios';
import Qualifications from './components/Qualifications';
import PreviousWorks from './components/PreviousWorks';
import DevelopmentExperiences from './components/DevelopmentExperiences/DevelopmentExperiences';
import SkillSummary from './components/SkillSummary/SkillSummary';

function handleBlur() {
  // ここでバリデーションチェックしたらサブミット前にクライアントに入力の誤りわかるからいいよね
  alert('フォーカスが外れました');
}

function Home() {
  const userData = userFetch(false, 0);
  const autocomplete = autoComplete();
  console.log(autocomplete)

  // 既存データ
  const [defaultData, setDefaultData] = useState<DefaultUser>({
    spec: {
      github: '',
      offHours: '',
    },
    portfolios: [],
    skillSummaries: {
      cloud: [],
      developmentDomain: [],
      environment: [],
      framework: [],
      library: [],
      programmingLanguage: [],
      skillSummaryId: null,
      specId: null,
      tool: [],
    },
    sellingPoints: [],
    qualifications: [],
    previousWorks: [],
    developmentExperiences: [],
  });
  // console.log(userData);
  // console.log(defaultData);

  // アップロード画像POST用データ
  const [uploadFiles, setUploadFiles] = useState<InputData>([]);
  // アップロード画像表示用データ
  const [renderFiles, setRenderFiles] = useState<any>([]);
  // console.log(renderFiles);

  // リクエストコメント
  const [requestComment, setRequestComment] = useState<string>('');

  useEffect(() => {
    setDefaultData((p: DefaultUser) => ({
      ...p,
      spec: {
        github: userData?.spec?.github,
        offHours: userData?.spec?.offHours,
      },
      portfolios: userData.portfolio,
      skillSummaries: userData.skillSummaries,
      sellingPoints: userData.sellingPoint,
      qualifications: userData.qualification,
      previousWorks: userData.previousWork,
      developmentExperiences: userData.developmentExperience,
    }));
  }, [userData]);

  useEffect(() => {
    if (userData.developmentExperience) {
      for (
        let i = 0;
        i < defaultData?.developmentExperiences?.length;
        i++
      ) {
        setUploadFiles((prevFiles: InputData) => [
          ...prevFiles,
          null,
        ]);
        setRenderFiles((prevFiles: any) => [...prevFiles, null]);
      }
    }
  }, [defaultData?.developmentExperiences?.length, userData.developmentExperience]);


  // qualification日付の形式変換
  let tentative: Qualification[] = [];
  const processQualifications = () => {
    for (let i = 0; i < defaultData?.qualifications?.length; i++) {
      const date: any = defaultData.qualifications[i].acquisitionDate;
      const yearAndMonth = date.split('年'); // ["2022", "10月"]
      const year = yearAndMonth[0]; // "2022"
      const month = yearAndMonth[1].replace('月', ''); // "10"
      tentative = [...tentative, { year: year, month: month }];
    }
  };
  processQualifications();

  // 既存データの編集 =================================================================
  const handleEditDefaultData = (
    e: any,
    category: string,
    detail: string,
    setIndex: number
  ) => {
    // ~の追加がないフォーム
    if (setIndex == 999) {
      setDefaultData((prev: DefaultUser) => {
        return {
          ...prev,
          [category]: {
            ...prev[category as keyof DefaultUser],
            [detail]: e.target.value,
          },
        };
      });
      // qualification日付データの入力
    } else if (detail === 'year' || detail === 'month') {
      tentative[setIndex][detail] = e.target.value;
      setDefaultData((prev: any) => {
        const updatedDefaultData = [...prev[category]];
        updatedDefaultData[setIndex] = {
          ...updatedDefaultData[setIndex],
          acquisitionDate: `${tentative[setIndex].year}年${tentative[setIndex].month}月`,
        };
        return {
          ...prev,
          [category]: updatedDefaultData,
        };
      });
      // 開発経験のアーキ画像ファイル
    } else if (detail === 'img') {
      const newFile = recreateFiles(e);

      setUploadFiles((prevFiles: InputData) => {
        const newFiles = [...prevFiles];
        newFiles[setIndex] = newFile;
        return newFiles;
      });

      // =====
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setRenderFiles((prevFiles: any) => {
            const newFiles = [...prevFiles];
            newFiles[setIndex] = reader.result;
            return newFiles;
          });
        };
        reader.readAsDataURL(file);
      }
      // =====

      setDefaultData((prev: any) => {
        const updatedDefaultData = [...prev[category]];
        updatedDefaultData[setIndex] = {
          ...updatedDefaultData[setIndex],
          [detail]: newFile.name,
        };
        return {
          ...prev,
          [category]: updatedDefaultData,
        };
      });
    } else {
      // ~の追加があるフォーム
      setDefaultData((prev: any) => {
        const updatedDefaultData = [...prev[category]];
        updatedDefaultData[setIndex] = {
          ...updatedDefaultData[setIndex],
          [detail]: e.target.value,
        };
        return {
          ...prev,
          [category]: updatedDefaultData,
        };
      });
    }
  };

  // 新規追加データ  =======================================================================
  const [addData, setAddData] = useState<any>({});
  // console.log(addData);
  // qualifications日付変換前仮置きデータ
  const [ql, setQl] = useState<any>([]);

  // // 追加データの入れ物を作る関数
  const newItemsMap: any = {
    portfolios: { heading: '', url: '' },
    sellingPoints: { title: '', content: '' },
    qualifications: { credential: '', acquisitionDate: '' },
    previousWorks: { industry: '', occupation: '', JobDuties: '' },
    developmentExperiences: {
      startYear: "2010",
      startDate: "1",
      duration: '',
      assignedTask: '',
      teamSize: '',
      totalProjectHeadcount: '',
      projectName: '',
      jobDuties: '',
      img: '',
      environments: [],
      programmingLanguages: [],
      frameworks: [],
      tools: [],
    },
  };
  const handleAddDataForm = (category: string) => {
    const newItem = newItemsMap[category];
    if (!newItem) return; // Invalid category.

    const currentItems = addData[category] || [];
    setAddData({
      ...addData,
      [category]: [...currentItems, newItem],
    });

    if (category === 'qualifications') {
      setQl([...ql, { year: '2010', month: '1' }]);
    }

    if (category === 'developmentExperiences') {
      setUploadFiles((prevFiles: InputData) => [...prevFiles, null]);
      setRenderFiles((prevFiles: any) => [...prevFiles, null]);
    }
  };

  // 増やした入れ物の削除 ===============================================================
  const handleRemoveDataForm = (
    e: any,
    category: string,
    setIndex: number
  ) => {
    e.preventDefault();
    const newAddData = [...addData[category]];
    newAddData.splice(setIndex, 1);
    setAddData({
      ...addData,
      [category]: newAddData,
    });
    if (category == 'qualifications') {
      const newQl = [...ql];
      newQl.splice(setIndex, 1);
      setQl(newQl);
    }
    if (category == 'developmentExperiences') {
      const newUf = [...uploadFiles];
      newUf.splice(
        setIndex + userData.developmentExperience.length,
        1
      );
      setUploadFiles(newUf);
    }
  };

  // 入力された値を格納 ==================================================================
  const handleChangeDataForm = (
    e: any,
    category: string,
    detail: string,
    setIndex: number
  ) => {
    // qualification日付データの入力
    if (detail === 'year' || detail === 'month') {
      const newQl = [...ql];
      newQl[setIndex] = {
        ...ql[setIndex],
        [detail]: e.target.value,
      };
      setQl(newQl);

      setAddData((prev: any) => {
        const updatedDefaultData = [...prev[category]];
        updatedDefaultData[setIndex] = {
          ...updatedDefaultData[setIndex],
          acquisitionDate: `${newQl[setIndex].year}年${newQl[setIndex].month}月`,
        };
        return {
          ...prev,
          [category]: updatedDefaultData,
        };
      });
      // 開発経験のアーキ画像ファイル
    } else if (detail === 'img') {
      const newFile = recreateFiles(e);
      //サーバーに保存する画像ファイル
      setUploadFiles((prevFiles: InputData) => {
        const newFiles = [...prevFiles];
        newFiles[setIndex + userData.developmentExperience.length] =
          newFile;
        return newFiles;
      });

      // アップロード画像を適切に表示できるようにする
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setRenderFiles((prevFiles: any) => {
            const newFiles = [...prevFiles];
            newFiles[
              setIndex + userData.developmentExperience.length
            ] = reader.result;
            return newFiles;
          });
        };
        reader.readAsDataURL(file);
      }
      // データベースに画像の名前を保存
      setAddData((prev: any) => {
        const updatedDefaultData = [...prev[category]];
        updatedDefaultData[setIndex] = {
          ...updatedDefaultData[setIndex],
          [detail]: newFile.name,
        };
        return {
          ...prev,
          [category]: updatedDefaultData,
        };
      });
    } else {
      // ~の追加があるフォーム
      setAddData((prev: any) => {
        const updatedDefaultData = [...prev[category]];
        updatedDefaultData[setIndex] = {
          ...updatedDefaultData[setIndex],
          [detail]: e.target.value,
        };
        return {
          ...prev,
          [category]: updatedDefaultData,
        };
      });
    }
  };

  return (
    <section className="w-full bg-blue-200 text-sky-900 max-w-4xl p-10 shadow-xl my-10 border-4 border-sky-800">
      <h2 className="drop-shadow-white text-3xl font-bold mb-5">
        スペックシート登録
      </h2>
      <form>
        {/* ポートフォリオ */}
        <div>
          <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
            <label
              className="bg-slate-200 block w-1/4 p-1"
              htmlFor="stuff"
            >
              スタッフID
            </label>
            <input
              className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
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
            <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
              <label
                className="bg-slate-200 block w-1/4 p-1"
                htmlFor="portfolio"
              >
                github
              </label>
              <input
                className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                type="text"
                name=""
                id="portfolio"
                data-testid="portfolio"
                // onBlur={handleBlur}
                value={
                  defaultData?.spec.github
                    ? defaultData.spec.github
                    : ''
                }
                onChange={(e) =>
                  handleEditDefaultData(e, 'spec', 'github', 999)
                }
              />
            </div>

            {/* 既存ポートフォリオデータ描画 */}
            {defaultData.portfolios &&
              defaultData.portfolios.map(
                (portfolio: any, index: number) => (
                  <Portfolios
                    portfolio={portfolio}
                    index={index}
                    handleEdit={handleEditDefaultData}
                  />
                )
              )}
            {/* 追加ポートフォリオデータ描画 */}
            {addData?.portfolios?.map(
              (portfolio: any, index: number) => (
                <Portfolios
                  portfolio={portfolio}
                  index={index}
                  handleRemove={handleRemoveDataForm}
                  handleChange={handleChangeDataForm}
                />
              )
            )}
            {/* フォーム追加ボタン */}
            <AddFormButton
              onClick={() => handleAddDataForm('portfolios')}
              buttonText="ポートフォリオ"
            />
          </div>
        </div>
        {/* portfolio */}

        <div>
          <h3 className="mt-10 text-xl font-bold">スキル要約</h3>
          <SkillSummary
            autocomplete={autocomplete}
            defaultData={defaultData}
            setDefaultData={setDefaultData}
          />
        </div>
        {/* skillSummary */}

        <div>
          <h3 className="mt-10 text-xl font-bold">
            アピールポイント
          </h3>
          {/* 既存アピールポイントデータ描画 */}
          {defaultData.sellingPoints &&
            defaultData.sellingPoints.map(
              (sellingPoint: any, index: number) => (
                <SellingPoints
                  sellingPoint={sellingPoint}
                  index={index}
                  handleEdit={handleEditDefaultData}
                />
              )
            )}
          {/* 追加アピールポイントデータ描画 */}
          {addData?.sellingPoints?.map(
            (sellingPoint: any, index: number) => (
              <SellingPoints
                sellingPoint={sellingPoint}
                index={index}
                handleRemove={handleRemoveDataForm}
                handleChange={handleChangeDataForm}
              />
            )
          )}
          {/* フォーム追加ボタン */}
          <AddFormButton
            onClick={() => handleAddDataForm('sellingPoints')}
            buttonText="アピールポイント"
          />
        </div>
        {/* sellingPoint */}

        <div>
          <h3 className="mt-10 text-xl font-bold">
            業務外で取り組んでいること
          </h3>
          <textarea
            name=""
            id=""
            className={`${styles.focus} border-2 border-slate-300 shadow-md p-2 w-full`}
            rows={8}
            value={
              defaultData?.spec.offHours
                ? defaultData.spec.offHours
                : ''
            }
            onChange={(e) =>
              handleEditDefaultData(e, 'spec', 'offHours', 999)
            }
          ></textarea>
        </div>
        {/* 業務外 */}

        <div>
          <h3 className="mt-10 text-xl font-bold">資格</h3>
          {/* 既存資格データ描画 */}
          {defaultData.qualifications &&
            defaultData.qualifications.map(
              (qualification: any, index: number) => (
                <Qualifications
                  qualification={qualification}
                  index={index}
                  handleEdit={handleEditDefaultData}
                />
              )
            )}
          {/* 追加資格データ描画 */}
          {addData?.qualifications?.map(
            (qualification: any, index: number) => (
              <Qualifications
                qualification={qualification}
                index={index}
                handleRemove={handleRemoveDataForm}
                handleChange={handleChangeDataForm}
              />
            )
          )}
          {/* フォーム追加ボタン */}
          <AddFormButton
            onClick={() => handleAddDataForm('qualifications')}
            buttonText="資格"
          />
        </div>
        {/* qualification資格 */}

        <div>
          <h3 className="mt-10 text-xl font-bold">前職</h3>
          {/* 既存前職データ描画 */}
          {defaultData.previousWorks &&
            defaultData.previousWorks.map(
              (previousWork: any, index: number) => (
                <PreviousWorks
                  previousWork={previousWork}
                  index={index}
                  handleEdit={handleEditDefaultData}
                />
              )
            )}
          {/* 追加前職データ描画 */}
          {addData?.previousWorks?.map(
            (previousWork: any, index: number) => (
              <PreviousWorks
                previousWork={previousWork}
                index={index}
                handleRemove={handleRemoveDataForm}
                handleChange={handleChangeDataForm}
              />
            )
          )}
          {/* フォーム追加ボタン */}
          <AddFormButton
            onClick={() => handleAddDataForm('previousWorks')}
            buttonText="前職"
          />
        </div>
        {/* previousWork */}

        <div>
          <h3 className="mt-10 text-xl font-bold">開発経験</h3>
          {/* 既存開発経験データ描画 */}
          {defaultData?.developmentExperiences &&
            defaultData?.developmentExperiences.map(
              (developmentExperience: any, index: number) => (
                <DevelopmentExperiences
                  developmentExperience={developmentExperience}
                  index={index}
                  handleEdit={handleEditDefaultData}
                  autocomplete={autocomplete}
                  setData={setDefaultData}
                  renderFiles={renderFiles}
                  userData={userData}
                />
              )
            )}
          {/* 追加開発経験データ描画 */}
          {addData?.developmentExperiences?.map(
            (developmentExperience: any, index: number) => (
              <DevelopmentExperiences
                developmentExperience={developmentExperience}
                index={index}
                handleRemove={handleRemoveDataForm}
                handleChange={handleChangeDataForm}
                autocomplete={autocomplete}
                setData={setAddData}
                renderFiles={renderFiles}
                userData={userData}
              />
            )
          )}
          {/* フォーム追加ボタン */}
          <AddFormButton
            onClick={() =>
              handleAddDataForm('developmentExperiences')
            }
            buttonText="開発経験"
          />

          <div className="flex-row w-full flex border-2 border-slate-300 shadow-md mt-6">
            <label
              className="bg-slate-200 block w-1/4 p-1"
              htmlFor=""
            >
              リクエストコメント
            </label>
            <textarea
              name=""
              id=""
              className={`${styles.focus} border-2 border-transparent p-2 w-3/4`}
              rows={8}
              value={requestComment}
              onChange={(e) => setRequestComment(e.target.value)}
            ></textarea>
          </div>
        </div>
        {/* developmentExperience */}

        {/* データPOSTのボタン・関数 */}
        <RequestButton
          userData={userData}
          defaultData={defaultData}
          addData={addData}
          requestComment={requestComment}
          uploadFiles={uploadFiles}
        />
      </form>
    </section>
  );
}

export default Home;
