/* eslint-disable react/jsx-key */
'use client';

import '../globals.css';
import styles from './style.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { userFetch } from '../mypage/_lib/userFetch';
import { autoComplete } from './_lib/autoComplete';
import { recreateFiles } from './_lib/recreateFiles';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RequestButton from './components/RequestButton';
import { DevelopmentExperience } from '../types/t';
import {
  DefaultUser,
  InputData,
  Portfolio,
  SellingPoint,
  Qualification,
  PreviousWork,
} from '../types/t';
import noimaged from '@/public/noimaged.png';

function handleBlur() {
  // ここでバリデーションチェックしたらサブミット前にクライアントに入力の誤りわかるからいいよね
  alert('フォーカスが外れました');
}

function Home() {
  const userData = userFetch(false, 0);
  const autocomplete = autoComplete();

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
  console.log(defaultData);
  // console.log(defaultData.skillSummaries);

  // アップロード画像格納
  const [uploadFiles, setUploadFiles] = useState<InputData>([]);

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
    if (userData.developmentExperience) {
      for (let i = 0; i < defaultData?.qualifications?.length; i++) {
        setUploadFiles((prevFiles: InputData) => [
          ...prevFiles,
          null,
        ]);
      }
    }
  }, [
    defaultData?.qualifications?.length,
    userData.developmentExperience,
    userData.portfolio,
    userData.previousWork,
    userData.qualification,
    userData.sellingPoint,
    userData.skillSummaries,
    userData.spec?.github,
    userData.spec?.offHours,
  ]);

  // qualification日付の形式変換
  let tentative: Qualification[] = [];
  for (let i = 0; i < defaultData?.qualifications?.length; i++) {
    const date: any = defaultData.qualifications[i].acquisitionDate;
    const yearAndMonth = date.split('年'); // ["2022", "10月"]
    const year = yearAndMonth[0]; // "2022"
    const month = yearAndMonth[1].replace('月', ''); // "10"
    tentative = [...tentative, { year: year, month: month }];
  }

  // 既存データの編集
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
  // ポートフォリオ
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  // 増やすボタンの関数
  const handleAddPortfoliosForm = () => {
    setPortfolios([...portfolios, { heading: '', url: '' }]);
  };
  // 削除
  const handleRemovePortfoliosFormSet = (setIndex: number) => {
    const newPortfolios = [...portfolios];
    newPortfolios.splice(setIndex, 1);
    setPortfolios(newPortfolios);
  };

  // 入力された値を格納
  const handleChangePortfolios = (
    e: any,
    setIndex: number,
    formIndex: number
  ) => {
    const newPortfolios = [...portfolios];
    if (formIndex === 1) {
      newPortfolios[setIndex]['heading'] = e.target.value;
    } else {
      newPortfolios[setIndex]['url'] = e.target.value;
    }
    setPortfolios(newPortfolios);
  };

  // アピールポイント
  const [selling, setSelling] = useState<SellingPoint[]>([]);
  // 増やすボタンの関数
  const handleAddSellingForm = () => {
    setSelling([...selling, { title: '', content: '' }]);
  };
  // 削除
  const handleRemoveSellingFormSet = (setIndex: number) => {
    const newSelling = [...selling];
    newSelling.splice(setIndex, 1);
    setSelling(newSelling);
  };

  // 入力された値を格納
  const handleChangeSelling = (
    e: any,
    setIndex: number,
    formIndex: number
  ) => {
    const newSelling = [...selling];
    if (formIndex === 1) {
      newSelling[setIndex]['title'] = e.target.value;
    } else {
      newSelling[setIndex]['content'] = e.target.value;
    }
    setSelling(newSelling);
  };

  // 資格
  const [qualifications, setQualifications] = useState<
    Qualification[]
  >([]);
  const [qls, setQls] = useState<Qualification[]>([]);
  // 増やすボタンの関数
  const handleAddQualificationsForm = () => {
    setQualifications([
      ...qualifications,
      { credential: '', year: '', month: '' },
    ]);
    setQls([...qls, { credential: '', acquisitionDate: '' }]);
  };
  // 削除
  const handleRemoveQualificationsFormSet = (setIndex: number) => {
    const newQualifications = [...qualifications];
    newQualifications.splice(setIndex, 1);
    setQualifications(newQualifications);
  };
  // 入力された値を格納
  const handleChangeQualifications = (
    e: any,
    setIndex: number,
    formIndex: number
  ) => {
    const newQualifications = [...qualifications];
    if (formIndex === 1) {
      newQualifications[setIndex]['year'] = e.target.value;
    } else if (formIndex === 2) {
      newQualifications[setIndex]['month'] = e.target.value;
    } else {
      newQualifications[setIndex]['credential'] = e.target.value;
    }
    setQualifications(newQualifications);

    // 年月データ変換
    const newQls = [...qls];
    newQls[setIndex]['credential'] =
      qualifications[setIndex].credential;
    newQls[setIndex][
      'acquisitionDate'
    ] = `${qualifications[setIndex].year}年${qualifications[setIndex].month}月`;
    setQls(newQls);
  };

  // 前職
  const [previousWorks, setPreviousWorks] = useState<PreviousWork[]>(
    []
  );
  // 増やすボタンの関数
  const handleAddPreviousWorksForm = () => {
    setPreviousWorks([
      ...previousWorks,
      { industry: '', occupation: '', JobDuties: '' },
    ]);
  };
  // 削除
  const handleRemovePreviousWorksFormSet = (setIndex: number) => {
    const newPreviousWorks = [...previousWorks];
    newPreviousWorks.splice(setIndex, 1);
    setPreviousWorks(newPreviousWorks);
  };

  // 入力された値を格納
  const handleChangePreviousWorks = (
    e: any,
    setIndex: number,
    formIndex: number
  ) => {
    const newPreviousWorks = [...previousWorks];
    if (formIndex === 1) {
      newPreviousWorks[setIndex]['industry'] = e.target.value;
    } else if (formIndex === 2) {
      newPreviousWorks[setIndex]['occupation'] = e.target.value;
    } else {
      newPreviousWorks[setIndex]['JobDuties'] = e.target.value;
    }
    setPreviousWorks(newPreviousWorks);
  };

  // 開発経験
  const [developmentExperiences, setDevelopmentExperiences] =
    useState<DevelopmentExperience[]>([]);
  // 増やすボタンの関数
  const handleAddDevelopmentExperiencesForm = () => {
    setDevelopmentExperiences([
      ...developmentExperiences,
      {
        startYear: '',
        startDate: '',
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
    ]);
    // 画像ファイルファイル
    setUploadFiles((prevFiles: InputData) => [...prevFiles, {}]);
  };
  // 削除
  const handleRemoveDevelopmentExperiencesFormSet = (
    setIndex: number
  ) => {
    const newDevelopmentExperiences = [...developmentExperiences];
    newDevelopmentExperiences.splice(setIndex, 1);
    setDevelopmentExperiences(newDevelopmentExperiences);

    const newUploadFiles = [...uploadFiles];
    newUploadFiles.splice(setIndex, 1);
    setUploadFiles(newUploadFiles);
  };

  // 入力された値を格納
  const handleChangeDevelopmentExperiences = (
    e: any,
    setIndex: number,
    formIndex: number
  ) => {
    const newDevelopmentExperiences = [...developmentExperiences];
    if (formIndex === 1) {
      newDevelopmentExperiences[setIndex]['startYear'] =
        e.target.value;
    } else if (formIndex === 2) {
      newDevelopmentExperiences[setIndex]['startDate'] =
        e.target.value;
    } else if (formIndex === 3) {
      newDevelopmentExperiences[setIndex]['duration'] =
        e.target.value;
    } else if (formIndex === 4) {
      newDevelopmentExperiences[setIndex]['assignedTask'] =
        e.target.value;
    } else if (formIndex === 5) {
      newDevelopmentExperiences[setIndex]['teamSize'] =
        e.target.value;
    } else if (formIndex === 6) {
      newDevelopmentExperiences[setIndex]['totalProjectHeadcount'] =
        e.target.value;
    } else if (formIndex === 7) {
      newDevelopmentExperiences[setIndex]['projectName'] =
        e.target.value;
    } else if (formIndex === 8) {
      newDevelopmentExperiences[setIndex]['environments'] =
        e.target.value;
    } else if (formIndex === 9) {
      newDevelopmentExperiences[setIndex]['programmingLanguages'] =
        e.target.value;
    } else if (formIndex === 10) {
      newDevelopmentExperiences[setIndex]['frameworks'] =
        e.target.value;
    } else if (formIndex === 11) {
      newDevelopmentExperiences[setIndex]['tools'] = e.target.value;
    } else if (formIndex === 12) {
      const newFile = recreateFiles(e);
      newDevelopmentExperiences[setIndex]['img'] = newFile.name;

      const defaultDevNumber = userData.developmentExperience.length;
      const trueIndex = setIndex + defaultDevNumber;
      setUploadFiles((prevFiles: InputData) => {
        const newFiles = [...prevFiles];
        newFiles[trueIndex] = newFile;
        return newFiles;
      });
    } else {
      newDevelopmentExperiences[setIndex]['jobDuties'] =
        e.target.value;
    }
    setDevelopmentExperiences(newDevelopmentExperiences);
  };

  // 描画時日時分解
  function decodeYearAndMonth(value: string, setIndex: string) {
    const yearAndMonth = value.split('年'); // ["2022", "10月"]
    const year = yearAndMonth[0]; // "2022"
    const month = yearAndMonth[1].replace('月', ''); // "10"

    if (setIndex == 'year') {
      return year;
    } else {
      return month;
    }
  }

  // データの送信  ================================================================
  // const submitHandler = async (e: any) => {
  //   e.preventDefault();

  //   // 既存と新規合算
  //   const addRequestContents = {
  //     portfolios: portfolios,
  //     sellingPoints: selling,
  //     qualifications: qls,
  //     previousWorks: previousWorks,
  //     developmentExperiences: developmentExperiences,
  //   };

  //   for (const [key, value] of Object.entries(addRequestContents)) {
  //     if (value.length > 0) {
  //       defaultData[key] = [...defaultData[key], ...value];
  //     }
  //   }

  //   const formData = {
  //     userId: userData.user.userId,
  //     specData: defaultData.spec,
  //     specDetail: {
  //       portfolios: defaultData.portfolios,
  //       skillSummaries: [defaultData.skillSummaries],
  //       sellingPoints: defaultData.sellingPoints,
  //       qualifications: defaultData.qualifications,
  //       previousWorks: defaultData.previousWorks,
  //       developmentExperiences: defaultData.developmentExperiences,
  //     },
  //   };

  //   try {
  //     const response = await axios.post('/specseat/api', formData);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   // 画像アップロード
  //   const files = uploadFiles.filter((i: any) => i !== null);
  //   if (files && files.length > 0) {
  //     const data = new FormData();
  //     for (let i = 0; i < files.length; i++) {
  //       if (files[i] === null) {
  //         continue;
  //       }
  //       const file = files[i];
  //       const fileName = file.name;
  //       data.append('name', fileName);
  //       data.append('file', file);
  //     }

  //     try {
  //       const res = await axios.post(
  //         'http://localhost:8000/api/upload',
  //         data
  //       );
  //       console.log(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  return (
    <section className="w-full bg-blue-200 text-sky-900 max-w-4xl p-10 shadow-xl my-10 border-4 border-sky-800">
      <h2 className="drop-shadow-white text-3xl font-bold mb-5">
        スペックシート登録
      </h2>
      <form>
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

            {portfolios.map((formSet: any, setIndex: number) => (
              <div className="mt-6">
                <button
                  onClick={() =>
                    handleRemovePortfoliosFormSet(setIndex)
                  }
                >
                  <HighlightOffIcon />
                </button>
                <div
                  className="w-full flex flex-row border-2 border-slate-300 shadow-md"
                  key={setIndex}
                >
                  <input
                    className={`${styles.focus} border-2 border-transparent bg-slate-200 block w-1/4 p-1`}
                    type="text"
                    name=""
                    placeholder="qiita"
                    value={formSet.heading}
                    onChange={(e) =>
                      handleChangePortfolios(e, setIndex, 1)
                    }
                  />

                  <input
                    className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                    type="text"
                    name=""
                    placeholder="http://..."
                    value={formSet.url}
                    onChange={(e) =>
                      handleChangePortfolios(e, setIndex, 2)
                    }
                  />
                </div>
              </div>
            ))}

            <div className="mt-5">
              <button
                onClick={handleAddPortfoliosForm}
                type="button"
                className={`${styles.focus} border-2 border-transparent shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 h-10 rounded-xl border-white border-solid`}
              >
                <span className="text-white font-bold m-4">
                  + ポートフォリオの追加
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* portfolio */}

        <div>
          <h3 className="mt-10 text-xl font-bold">スキル要約</h3>
          <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
            <label
              className="bg-slate-200 block w-1/4 p-1"
              htmlFor=""
            >
              動作環境(OS)
            </label>

            {autocomplete.os && (
              <Autocomplete
                className={`${styles.focus} border-2 border-transparent block w-3/4 bg-white px-1`}
                multiple
                id="tags-filled"
                value={
                  defaultData?.skillSummaries?.environment
                    ? defaultData.skillSummaries.environment
                    : []
                }
                options={autocomplete.os.map(
                  (option: any) => option.skill
                )}
                onChange={(event, newValue) => {
                  setDefaultData((prev: any) => ({
                    ...prev,
                    skillSummaries: {
                      ...prev.skillSummaries,
                      environment: newValue,
                    },
                  }));
                }}
                freeSolo
                renderTags={(value: readonly any[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Mac OS"
                  />
                )}
              />
            )}
          </div>

          <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
            <label
              className="bg-slate-200 block w-1/4 p-1"
              htmlFor=""
            >
              言語
            </label>
            {autocomplete.lang && (
              <Autocomplete
                className={`${styles.focus} border-2 border-transparent block w-3/4 bg-white px-1`}
                multiple
                id="tags-filled"
                value={
                  defaultData?.skillSummaries?.programmingLanguage
                    ? defaultData.skillSummaries.programmingLanguage
                    : []
                }
                options={autocomplete.lang.map(
                  (option: any) => option.skill
                )}
                onChange={(event, newValue) => {
                  setDefaultData((prev: any) => ({
                    ...prev,
                    skillSummaries: {
                      ...prev.skillSummaries,
                      programmingLanguage: newValue,
                    },
                  }));
                }}
                freeSolo
                renderTags={(value: readonly any[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Javascript"
                  />
                )}
              />
            )}
          </div>
          <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
            <label
              className="bg-slate-200 block w-1/4 p-1"
              htmlFor=""
            >
              フレームワーク
            </label>
            {autocomplete.framework && (
              <Autocomplete
                className={`${styles.focus} border-2 border-transparent block w-3/4 bg-white px-1`}
                multiple
                id="tags-filled"
                value={
                  defaultData?.skillSummaries?.framework
                    ? defaultData.skillSummaries.framework
                    : []
                }
                options={autocomplete.framework.map(
                  (option: any) => option.skill
                )}
                onChange={(event, newValue) => {
                  setDefaultData((prev: any) => ({
                    ...prev,
                    skillSummaries: {
                      ...prev.skillSummaries,
                      framework: newValue,
                    },
                  }));
                }}
                freeSolo
                renderTags={(value: readonly any[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Mac OS"
                  />
                )}
              />
            )}
          </div>
          <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
            <label
              className="bg-slate-200 block w-1/4 p-1"
              htmlFor=""
            >
              ライブラリ
            </label>
            {autocomplete.library && (
              <Autocomplete
                className={`${styles.focus} border-2 border-transparent block w-3/4 bg-white px-1`}
                multiple
                id="tags-filled"
                value={
                  defaultData?.skillSummaries?.library
                    ? defaultData.skillSummaries.library
                    : []
                }
                options={autocomplete.library.map(
                  (option: any) => option.skill
                )}
                onChange={(event, newValue) => {
                  setDefaultData((prev: any) => ({
                    ...prev,
                    skillSummaries: {
                      ...prev.skillSummaries,
                      library: newValue,
                    },
                  }));
                }}
                freeSolo
                renderTags={(value: readonly any[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Mac OS"
                  />
                )}
              />
            )}
          </div>
          <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
            <label
              className="bg-slate-200 block w-1/4 p-1"
              htmlFor=""
            >
              クラウド
            </label>
            {autocomplete.cloud && (
              <Autocomplete
                className={`${styles.focus} border-2 border-transparent block w-3/4 bg-white px-1`}
                multiple
                id="tags-filled"
                value={
                  defaultData?.skillSummaries?.cloud
                    ? defaultData.skillSummaries.cloud
                    : []
                }
                options={autocomplete.cloud.map(
                  (option: any) => option.skill
                )}
                onChange={(event, newValue) => {
                  setDefaultData((prev: any) => ({
                    ...prev,
                    skillSummaries: {
                      ...prev.skillSummaries,
                      cloud: newValue,
                    },
                  }));
                }}
                freeSolo
                renderTags={(value: readonly any[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Mac OS"
                  />
                )}
              />
            )}
          </div>
          <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
            <label
              className="bg-slate-200 block w-1/4 p-1"
              htmlFor=""
            >
              ツール･その他
            </label>
            {autocomplete.tool && (
              <Autocomplete
                className={`${styles.focus} border-2 border-transparent block w-3/4 bg-white px-1`}
                multiple
                id="tags-filled"
                value={
                  defaultData?.skillSummaries?.tool
                    ? defaultData.skillSummaries.tool
                    : []
                }
                options={autocomplete.tool.map(
                  (option: any) => option.skill
                )}
                onChange={(event, newValue) => {
                  setDefaultData((prev: any) => ({
                    ...prev,
                    skillSummaries: {
                      ...prev.skillSummaries,
                      tool: newValue,
                    },
                  }));
                }}
                freeSolo
                renderTags={(value: readonly any[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Mac OS"
                  />
                )}
              />
            )}
          </div>
          <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
            <label
              className="bg-slate-200 block w-1/4 p-1"
              htmlFor=""
            >
              担当開発工程
            </label>
            {autocomplete.assignedDevelopment && (
              <Autocomplete
                className={`${styles.focus} border-2 border-transparent block w-3/4 bg-white px-1`}
                multiple
                id="tags-filled"
                value={
                  defaultData?.skillSummaries?.developmentDomain
                    ? defaultData.skillSummaries.developmentDomain
                    : []
                }
                options={autocomplete.assignedDevelopment.map(
                  (option: any) => option.skill
                )}
                onChange={(event, newValue) => {
                  setDefaultData((prev: any) => ({
                    ...prev,
                    skillSummaries: {
                      ...prev.skillSummaries,
                      developmentDomain: newValue,
                    },
                  }));
                }}
                freeSolo
                renderTags={(value: readonly any[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Mac OS"
                  />
                )}
              />
            )}
          </div>
        </div>
        {/* skillSummary */}

        <div>
          <h3 className="mt-10 text-xl font-bold">
            アピールポイント
          </h3>

          {defaultData.sellingPoints &&
            defaultData.sellingPoints.map(
              (point: any, index: number) => (
                <div className="mt-3" key={index}>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      タイトル
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                      name=""
                      id=""
                      value={point.title ? point.title : ''}
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'sellingPoints',
                          'title',
                          index
                        )
                      }
                    />
                  </div>
                  <div className="flex-row w-full flex border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 pt-1 px-2"
                      htmlFor=""
                    >
                      内容
                    </label>
                    <textarea
                      name=""
                      id=""
                      className={`${styles.focus} border-2 border-transparent p-2 w-3/4`}
                      rows={8}
                      value={point.content ? point.content : ''}
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'sellingPoints',
                          'content',
                          index
                        )
                      }
                    />
                  </div>
                </div>
              )
            )}

          {selling.map((states: any, setIndex: number) => (
            <div key={setIndex} className="mt-6">
              <button
                onClick={() => handleRemoveSellingFormSet(setIndex)}
              >
                <HighlightOffIcon />
              </button>
              <div className="w-full flex flex-row border-2 border-slate-300shadow-md">
                <label
                  className="bg-slate-200 block w-1/4 p-1"
                  htmlFor="appealTitle"
                >
                  タイトル
                </label>
                <input
                  className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                  type="text"
                  id="appealTitle"
                  value={states.title}
                  onChange={(e) =>
                    handleChangeSelling(e, setIndex, 1)
                  }
                />
              </div>
              <div className="flex-row w-full flex border-2 border-slate-300 shadow-md">
                <label
                  className="bg-slate-200 block w-1/4 pt-1 px-2"
                  htmlFor="appealContent"
                >
                  内容
                </label>
                <textarea
                  id="appealContent"
                  className={`${styles.focus} border-2 border-transparent p-2 w-3/4`}
                  rows={8}
                  value={states.content}
                  onChange={(e) =>
                    handleChangeSelling(e, setIndex, 2)
                  }
                ></textarea>
              </div>
            </div>
          ))}

          <div className="mt-5">
            <button
              onClick={handleAddSellingForm}
              type="button"
              className={`${styles.focus} border-2 border-transparent shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 h-10 rounded-xl border-white border-solid`}
            >
              <span className="text-white font-bold m-4">
                + アピールポイントの追加
              </span>
            </button>
          </div>
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
          {defaultData.qualifications &&
            defaultData.qualifications.map(
              (point: any, index: number) => (
                <div className="mt-3" key={index}>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      取得年
                    </label>
                    <select
                      name=""
                      id=""
                      className={`${styles.focus} border-2 border-transparent w-1/4 text-center`}
                      value={
                        point.acquisitionDate
                          ? decodeYearAndMonth(
                              point.acquisitionDate,
                              'year'
                            )
                          : ''
                      }
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'qualifications',
                          'year',
                          index
                        )
                      }
                    >
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                    </select>
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      取得月
                    </label>
                    <select
                      name=""
                      id=""
                      className={`${styles.focus} border-2 border-transparent w-1/4 text-center`}
                      value={
                        point.acquisitionDate
                          ? decodeYearAndMonth(
                              point.acquisitionDate,
                              'month'
                            )
                          : ''
                      }
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'qualifications',
                          'month',
                          index
                        )
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      資格
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                      value={point.credential ? point.credential : ''}
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'qualifications',
                          'credential',
                          index
                        )
                      }
                    />
                  </div>
                </div>
              )
            )}

          {qualifications.map((states: any, setIndex: number) => (
            <div key={setIndex} className="mt-6">
              <button
                onClick={() =>
                  handleRemoveQualificationsFormSet(setIndex)
                }
              >
                <HighlightOffIcon />
              </button>
              <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                <label
                  className="bg-slate-200 block w-1/4 p-1"
                  htmlFor=""
                >
                  取得年
                </label>
                <select
                  name=""
                  id=""
                  className={`${styles.focus} border-2 border-transparent w-1/4 text-center`}
                  value={states.year}
                  onChange={(e) =>
                    handleChangeQualifications(e, setIndex, 1)
                  }
                >
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                </select>
                <label
                  className="bg-slate-200 block w-1/4 p-1"
                  htmlFor=""
                >
                  取得月
                </label>
                <select
                  name=""
                  id=""
                  className={`${styles.focus} border-2 border-transparent w-1/4 text-center`}
                  value={states.month}
                  onChange={(e) =>
                    handleChangeQualifications(e, setIndex, 2)
                  }
                >
                  <option defaultValue="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                <label
                  className="bg-slate-200 block w-1/4 p-1"
                  htmlFor=""
                >
                  資格
                </label>
                <input
                  className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                  type="text"
                  value={states.credential}
                  onChange={(e) =>
                    handleChangeQualifications(e, setIndex, 3)
                  }
                />
              </div>
            </div>
          ))}

          <div className="mt-5">
            <button
              onClick={handleAddQualificationsForm}
              type="button"
              className={`${styles.focus} border-2 border-transparent shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 h-10 rounded-xl border-white border-solid`}
            >
              <span className="text-white font-bold m-4">
                + 資格の追加
              </span>
            </button>
          </div>
        </div>
        {/* qualification資格 */}

        <div>
          <h3 className="mt-10 text-xl font-bold">前職</h3>
          {defaultData.previousWorks &&
            defaultData.previousWorks.map(
              (point: any, index: number) => (
                <div className="mt-3" key={index}>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      業界
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                      value={point.industry ? point.industry : ''}
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'previousWorks',
                          'industry',
                          index
                        )
                      }
                    />
                  </div>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      業種
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                      value={point.occupation ? point.occupation : ''}
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'previousWorks',
                          'occupation',
                          index
                        )
                      }
                    />
                  </div>
                  <div className="flex-row w-full flex border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      業務内容
                    </label>
                    <textarea
                      name=""
                      id=""
                      className={`${styles.focus} border-2 border-transparent p-2 w-3/4`}
                      rows={8}
                      value={point.JobDuties ? point.JobDuties : ''}
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'previousWorks',
                          'JobDuties',
                          index
                        )
                      }
                    ></textarea>
                  </div>
                </div>
              )
            )}

          {previousWorks.map(
            (previousWork: any, setIndex: number) => (
              <div key={setIndex} className="mt-6">
                <button
                  onClick={() =>
                    handleRemovePreviousWorksFormSet(setIndex)
                  }
                >
                  <HighlightOffIcon />
                </button>
                <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    業界
                  </label>
                  <input
                    className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                    type="text"
                    value={previousWork.form1}
                    onChange={(e) =>
                      handleChangePreviousWorks(e, setIndex, 1)
                    }
                  />
                </div>
                <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    業種
                  </label>
                  <input
                    className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                    type="text"
                    value={previousWork.form1}
                    onChange={(e) =>
                      handleChangePreviousWorks(e, setIndex, 2)
                    }
                  />
                </div>
                <div className="flex-row w-full flex border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    業務内容
                  </label>
                  <textarea
                    name=""
                    id=""
                    className={`${styles.focus} border-2 border-transparent p-2 w-3/4`}
                    rows={8}
                    value={previousWork.form1}
                    onChange={(e) =>
                      handleChangePreviousWorks(e, setIndex, 3)
                    }
                  ></textarea>
                </div>
              </div>
            )
          )}

          <div className="mt-5">
            <button
              onClick={handleAddPreviousWorksForm}
              type="button"
              className={`${styles.focus} border-2 border-transparent shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 h-10 rounded-xl border-white border-solid`}
            >
              <span className="text-white font-bold m-4">
                + 前職の追加
              </span>
            </button>
          </div>
        </div>
        {/* previousWork */}

        <div>
          <h3 className="mt-10 text-xl font-bold">開発経験</h3>

          {defaultData.developmentExperiences &&
            defaultData.developmentExperiences.map(
              (point: any, index: number) => (
                <div className="mt-4" key={index}>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      開始年
                    </label>
                    <select
                      name=""
                      id=""
                      className={`${styles.focus} border-2 border-transparent w-1/4 text-center`}
                      value={point.startYear ? point.startYear : ''}
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'developmentExperiences',
                          'startYear',
                          index
                        )
                      }
                    >
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2023">2023</option>
                    </select>
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      開始月
                    </label>
                    <select
                      name=""
                      id=""
                      className={`${styles.focus} border-2 border-transparent w-1/4 text-center`}
                      value={point.startDate ? point.startDate : ''}
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'developmentExperiences',
                          'startDate',
                          index
                        )
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      期間
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                      value={point.duration ? point.duration : ''}
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'developmentExperiences',
                          'duration',
                          index
                        )
                      }
                    />
                  </div>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      担当役割
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                      value={
                        point.assignedTask ? point.assignedTask : ''
                      }
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'developmentExperiences',
                          'assignedTask',
                          index
                        )
                      }
                    />
                  </div>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      チーム人数
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                      value={
                        point.assignedTask ? point.assignedTask : ''
                      }
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'developmentExperiences',
                          'assignedTask',
                          index
                        )
                      }
                    />
                  </div>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      PJ全体人数
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                      value={point.teamSize ? point.teamSize : ''}
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'developmentExperiences',
                          'teamSize',
                          index
                        )
                      }
                    />
                  </div>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      プロジェクト名
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                      value={
                        point.projectName ? point.projectName : ''
                      }
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'developmentExperiences',
                          'projectName',
                          index
                        )
                      }
                    />
                  </div>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      動作環境
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                    />
                  </div>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      言語
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                    />
                  </div>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      フレームワーク
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                    />
                  </div>
                  <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      ツール･その他
                    </label>
                    <input
                      className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                      type="text"
                    />
                  </div>
                  <div className="flex-row w-full flex border-2 border-slate-300 shadow-md">
                    <label
                      className="bg-slate-200 block w-1/4 p-1"
                      htmlFor=""
                    >
                      業務内容
                    </label>
                    <textarea
                      name=""
                      id=""
                      className={`${styles.focus} border-2 border-transparent p-2 w-3/4`}
                      rows={8}
                      value={point.jobDuties ? point.jobDuties : ''}
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'developmentExperiences',
                          'jobDuties',
                          index
                        )
                      }
                    ></textarea>
                  </div>
                  <div className="w-full flex h-10 ">
                    <label
                      className="bg-slate-200 block w-1/4 pt-2 px-1 text-sm border-2 border-slate-300 shadow-md"
                      htmlFor=""
                    >
                      アーキテクチャ
                    </label>
                    <input
                      className="block mt-1 ml-2"
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      onChange={(e) =>
                        handleEditDefaultData(
                          e,
                          'developmentExperiences',
                          'img',
                          index
                        )
                      }
                    />
                  </div>
                  <div className="flex justify-center">
                    <Image
                      src={
                        point.img
                          ? `http://127.0.0.1:8000/public/images/${point.img}`
                          : noimaged
                      }
                      width={600}
                      height={400}
                      alt="Picture of the architecture"
                    />
                  </div>
                </div>
              )
            )}

          {developmentExperiences.map(
            (des: any, setIndex: number) => (
              <div key={setIndex} className="mt-6">
                <button
                  onClick={() =>
                    handleRemoveDevelopmentExperiencesFormSet(
                      setIndex
                    )
                  }
                >
                  <HighlightOffIcon />
                </button>
                <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    開始年
                  </label>
                  <select
                    name=""
                    id=""
                    className={`${styles.focus} border-2 border-transparent w-1/4 text-center`}
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        1
                      )
                    }
                  >
                    <option value="2000">2000</option>
                    <option value="2001">2001</option>
                  </select>
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    開始月
                  </label>
                  <select
                    name=""
                    id=""
                    className={`${styles.focus} border-2 border-transparent w-1/4 text-center`}
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        2
                      )
                    }
                  >
                    <option defaultValue="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    期間
                  </label>
                  <input
                    className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                    type="text"
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        3
                      )
                    }
                  />
                </div>
                <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    担当役割
                  </label>
                  <input
                    className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                    type="text"
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        4
                      )
                    }
                  />
                </div>
                <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    チーム人数
                  </label>
                  <input
                    className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                    type="text"
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        5
                      )
                    }
                  />
                </div>
                <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    PJ全体人数
                  </label>
                  <input
                    className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                    type="text"
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        6
                      )
                    }
                  />
                </div>
                <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    プロジェクト名
                  </label>
                  <input
                    className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                    type="text"
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        7
                      )
                    }
                  />
                </div>
                <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    動作環境
                  </label>
                  <input
                    className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                    type="text"
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        8
                      )
                    }
                  />
                </div>
                <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    言語
                  </label>
                  <input
                    className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                    type="text"
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        9
                      )
                    }
                  />
                </div>
                <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    フレームワーク
                  </label>
                  <input
                    className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                    type="text"
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        10
                      )
                    }
                  />
                </div>
                <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    ツール･その他
                  </label>
                  <input
                    className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
                    type="text"
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        11
                      )
                    }
                  />
                </div>
                <div className="w-full flex h-10 ">
                  <label
                    className="bg-slate-200 block w-1/4 pt-2 px-1 text-sm border-2 border-slate-300 shadow-md"
                    htmlFor=""
                  >
                    アーキテクチャ
                  </label>
                  <input
                    className="block mt-1 ml-2"
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        12
                      )
                    }
                  />
                </div>
                <div className="flex-row w-full flex border-2 border-slate-300 shadow-md">
                  <label
                    className="bg-slate-200 block w-1/4 p-1"
                    htmlFor=""
                  >
                    業務内容
                  </label>
                  <textarea
                    name=""
                    id=""
                    className={`${styles.focus} border-2 border-transparent p-2 w-3/4`}
                    rows={8}
                    value={des.form1}
                    onChange={(e) =>
                      handleChangeDevelopmentExperiences(
                        e,
                        setIndex,
                        13
                      )
                    }
                  ></textarea>
                </div>
              </div>
            )
          )}

          <div className="mt-5">
            <button
              onClick={handleAddDevelopmentExperiencesForm}
              type="button"
              className={`${styles.focus} border-2 border-transparent shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 h-10 rounded-xl border-white border-solid`}
            >
              <span className="text-white font-bold m-4">
                + 開発経験の追加
              </span>
            </button>
          </div>

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
          portfolios={portfolios}
          selling={selling}
          qls={qls}
          previousWorks={previousWorks}
          developmentExperiences={developmentExperiences}
          uploadFiles={uploadFiles}
          requestComment={requestComment}
        />

        {/* <div className="text-center">
          <button
            type="submit"
            className="shadow-md mt-10 h-12  cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid"
          >
            <span className="text-white font-bold m-5">
              確認画面へ
            </span>
          </button>
        </div> */}
      </form>
    </section>
  );
}

export default Home;
