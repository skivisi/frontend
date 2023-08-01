import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { autoComplete } from '../../app/specseat/_lib/autoComplete';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { SkillData } from '../../../types/types';

// 営業DB(検索機能)
const DbSales = () => {
  const autocomplete = autoComplete();
  const router = useRouter();

  // エンジニア名で検索
  const [searchUser, setSearchUser] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const handleSearch = async () => {
    if (!searchUser.trim()) {
      setErrorMessage('ユーザー名を入力してください');
    } else {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/search/users`,
          {
            params: {
              userName: searchUser,
            },
          }
        );
        const foundUser = response.data;
        router.push(
          `/searchResult/searchSales?foundUser=${encodeURIComponent(
            JSON.stringify(foundUser)
          )}`
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 絞り込み検索
  const [affiliation, setAffiliation] = useState<string>('');
  const [businessSituation, setBusinessSituation] =
    useState<string>('');
  const [skillSummary, setSkillSummary] = useState<string[]>([]);
  const [skillUpdate, setSkillUpdate] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string>('');
  console.log(skillUpdate)
  const handleAffiliationChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setAffiliation(event.target.value);
  };

  const handleSkillSummaryChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (checked) {
      setSkillSummary((prevSummary: string[]) => [
        ...prevSummary,
        value,
      ]);
    } else {
      setSkillSummary((prevSummary) =>
        prevSummary.filter((skill) => skill !== value)
      );
    }
  };

  const handleChange = async () => {
    // 検索条件が選択されていない場合のバリデーションを追加
    if (
      !affiliation &&
      !businessSituation &&
      skillSummary.length === 0 &&
      skillUpdate.length === 0
    ) {
      setValidationError('検索条件が選択されていません');
      return;
    } else {
      try {
        const mergedSkills = [...skillSummary, ...skillUpdate];
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/search/integration`,
          {
            params: {
              affiliation: affiliation,
              businessSituation: businessSituation,
              skillSummary: mergedSkills.join(','),
            },
          }
        );
        const foundUser = response.data;

        router.push(
          `/searchResult/searchSales?foundUser=${encodeURIComponent(
            JSON.stringify(foundUser)
          )}`
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="text-sky-900 mx-auto px-10 mt-10 py-5 border-blue-200 rounded-md bg-blue-200 shadow-xl max-w-4xl">
        <section className="text-center mt-12">
          <h2 className="text-4xl mb-10 pt-12">エンジニア検索</h2>
          <form className="mb-5">
            <input
              type="text"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="ユーザー名を入力してください"
              className="w-72 rounded-md py-1.5 bg-white shadow-xl border-2 border-slate-300"
              required
            />
            {errorMessage && (
              <p className="text-red-500">{errorMessage}</p>
            )}
          </form>

          <button
            onClick={handleSearch}
            data-testid="search-button-1"
            className="text-xl px-3 py-1 shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white"
          >
            検索する
          </button>
        </section>
      </div>

      <div className="text-sky-900 mx-auto px-10 mt-24 py-5 border-blue-200 rounded-md bg-blue-200 shadow-xl max-w-4xl">
        <section className="text-center pb-12">
          <h2 className="text-4xl mb-10 mt-28">スキル検索</h2>

          {/* <form> */}
          <div className="flex mx-auto max-w-7xl">
            <div className="w-1/4 pt-5 text-2xl mb-5 bg-sky-50 shadow-xl border-2 border-slate-300">
              業務状況
            </div>

            <form className="w-3/4 flex justify-center mx-auto max-w-7xl text-xl py-5 p-3 mb-5 bg-white shadow-xl border-2 border-slate-300">
              <div className="mr-32">
                <input
                  type="radio"
                  name="businessSituation"
                  id="待機中"
                  className="hidden peer"
                  value="待機中"
                  checked={businessSituation === '待機中'}
                  onChange={(e) =>
                    setBusinessSituation(e.target.value)
                  }
                />
                <label
                  htmlFor="待機中"
                  className="mx-auto text-center border-2 rounded-2xl border-gray-900 p-2 my-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  待機中
                </label>
              </div>
              <div className="">
                <input
                  type="radio"
                  name="businessSituation"
                  id="アサイン中"
                  className="hidden peer"
                  value="アサイン中"
                  checked={businessSituation === 'アサイン中'}
                  onChange={(e) =>
                    setBusinessSituation(e.target.value)
                  }
                />
                <label
                  htmlFor="アサイン中"
                  className="mx-auto text-center border-2 rounded-2xl border-gray-900 p-2 my-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  アサイン中
                </label>
              </div>
            </form>
          </div>

          <div className="flex">
            <div className="w-1/4 text-2xl pt-5 bg-sky-50 shadow-xl border-2 border-slate-300">
              職種
            </div>
            <form className="w-3/4 mx-auto flex justify-between text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
              <div className="">
                <input
                  type="radio"
                  name="affiliation"
                  value="FR"
                  checked={affiliation === 'FR'}
                  onChange={handleAffiliationChange}
                  id="FR"
                  className="hidden peer"
                />
                <label
                  htmlFor="FR"
                  className="block text-center border-2 rounded-2xl border-gray-900 py-2 px-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  FR
                </label>
              </div>
              <div className="">
                <input
                  type="radio"
                  name="affiliation"
                  value="JAVA"
                  checked={affiliation === 'JAVA'}
                  onChange={handleAffiliationChange}
                  id="JAVA"
                  className="hidden peer"
                />
                <label
                  htmlFor="JAVA"
                  className="block text-center border-2 rounded-2xl border-gray-900 py-2 px-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  JAVA
                </label>
              </div>
              <div className="">
                <input
                  type="radio"
                  name="affiliation"
                  value="QA"
                  checked={affiliation === 'QA'}
                  onChange={handleAffiliationChange}
                  id="QA"
                  className="hidden peer"
                />
                <label
                  htmlFor="QA"
                  className="block text-center border-2 rounded-2xl border-gray-900 py-2 px-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  QA
                </label>
              </div>
              <div className="">
                <input
                  type="radio"
                  name="affiliation"
                  value="ML"
                  checked={affiliation === 'ML'}
                  onChange={handleAffiliationChange}
                  id="ML"
                  className="hidden peer"
                />
                <label
                  htmlFor="ML"
                  className="block text-center border-2 rounded-2xl border-gray-900 py-2 px-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  ML
                </label>
              </div>
              <div className="">
                <input
                  type="radio"
                  name="affiliation"
                  value="CL"
                  checked={affiliation === 'CL'}
                  onChange={handleAffiliationChange}
                  id="CL"
                  className="hidden peer"
                />
                <label
                  htmlFor="CL"
                  className="block text-center border-2 rounded-2xl border-gray-900 py-2 px-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  CL
                </label>
              </div>
              <div className="pr-4">
                <input
                  type="radio"
                  name="affiliation"
                  value="PHP"
                  checked={affiliation === 'PHP'}
                  onChange={handleAffiliationChange}
                  id="PHP"
                  data-testid="radio-PHP"
                  className="hidden peer"
                />
                <label
                  htmlFor="PHP"
                  className="block text-center border-2 rounded-2xl border-gray-900 py-2 px-4 text-xl hover:bg-yellow-200 peer-checked:bg-green-200"
                >
                  PHP
                </label>
              </div>
            </form>
          </div>

          {affiliation === 'FR' && (
            <div className="flex mt-5">
              <div className="w-1/4 text-2xl pt-6 bg-sky-50 shadow-xl border-2 border-slate-300">
                スキル
              </div>
              <form className="w-3/4 flex justify-center text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
                <div className="grid grid-cols-4">
                  <div className="">
                    <label htmlFor="3" className="pr-8">
                      <input
                        type="checkbox"
                        id="3"
                        name="JavaScript"
                        value="JavaScript"
                        onChange={handleSkillSummaryChange}
                      />
                      JavaScript
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="4" className="pr-8">
                      <input
                        type="checkbox"
                        id="4"
                        name="TypeScript"
                        value="TypeScript"
                        onChange={handleSkillSummaryChange}
                      />
                      TypeScript
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="5" className="pr-8">
                      <input
                        type="checkbox"
                        id="5"
                        name="React"
                        value=" React"
                        onChange={handleSkillSummaryChange}
                      />
                      React
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="6" className="pr-8">
                      <input
                        type="checkbox"
                        id="6"
                        name="Vue.js"
                        value="Vue.js"
                        onChange={handleSkillSummaryChange}
                      />
                      Vue.js
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="7" className="pr-8">
                      <input
                        type="checkbox"
                        id="7"
                        name="Angular"
                        value="Angular"
                        onChange={handleSkillSummaryChange}
                      />
                      Angular
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="8" className="pr-8">
                      <input
                        type="checkbox"
                        id="8"
                        name="Jest"
                        value="Jest"
                        onChange={handleSkillSummaryChange}
                      />
                      Jest
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="9" className="pr-8">
                      <input
                        type="checkbox"
                        id="9"
                        name="jQuery"
                        value="jQuery"
                        onChange={handleSkillSummaryChange}
                      />
                      jQuery
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          {affiliation === 'JAVA' && (
            <div className="flex mt-5">
              <div className="w-1/4 text-2xl pt-6 bg-sky-50 shadow-xl border-2 border-slate-300">
                スキル
              </div>
              <form className="w-3/4 flex justify-center text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
                <div className="grid grid-cols-4">
                  <div className="">
                    <label htmlFor="3" className="pr-8">
                      <input
                        type="checkbox"
                        id="3"
                        onChange={handleSkillSummaryChange}
                        name="Java"
                        value="Java"
                      />
                      Java
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="4" className="pr-8">
                      <input
                        type="checkbox"
                        id="4"
                        name="Spring"
                        value="Spring"
                        onChange={handleSkillSummaryChange}
                      />
                      Spring
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="5" className="pr-8">
                      <input
                        type="checkbox"
                        id="5"
                        name="Struts"
                        value="Struts"
                        onChange={handleSkillSummaryChange}
                      />
                      Struts
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="6" className="pr-8">
                      <input
                        type="checkbox"
                        id="6"
                        name="Play"
                        value="Play"
                        onChange={handleSkillSummaryChange}
                      />
                      Play
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="7" className="pr-8">
                      <input
                        type="checkbox"
                        id="7"
                        name="Wicket"
                        value="Wicket"
                        onChange={handleSkillSummaryChange}
                      />
                      Wicket
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="8" className="pr-8">
                      <input
                        type="checkbox"
                        id="8"
                        name="MySQL"
                        value="MySQL"
                        onChange={handleSkillSummaryChange}
                      />
                      MySQL
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="9" className="pr-8">
                      <input
                        type="checkbox"
                        id="9"
                        name="PostgreSQL"
                        value="PostgreSQL"
                        onChange={handleSkillSummaryChange}
                      />
                      psql
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          {affiliation === 'QA' && (
            <div className="flex mt-5">
              <div className="w-1/4 text-2xl pt-6 bg-sky-50 shadow-xl border-2 border-slate-300">
                スキル
              </div>
              <form className="w-3/4 flex justify-center text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
                <div className="grid grid-cols-4">
                  <div className="">
                    <label htmlFor="3" className="pr-8">
                      <input
                        type="checkbox"
                        id="3"
                        name="Java"
                        value="Java"
                        onChange={handleSkillSummaryChange}
                      />
                      Java
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="4" className="pr-8">
                      <input
                        type="checkbox"
                        id="4"
                        name="JUnit"
                        value="JUnit"
                        onChange={handleSkillSummaryChange}
                      />
                      JUnit
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="5" className="pr-8">
                      <input
                        type="checkbox"
                        id="5"
                        name="Selenium"
                        value="Selenium"
                        onChange={handleSkillSummaryChange}
                      />
                      Selenium
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="6" className="pr-8">
                      <input
                        type="checkbox"
                        id="6"
                        name="TestNG"
                        value="TestNG"
                        onChange={handleSkillSummaryChange}
                      />
                      TestNG
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="7" className="pr-8">
                      <input
                        type="checkbox"
                        id="7"
                        name="Jest"
                        value="Jest"
                        onChange={handleSkillSummaryChange}
                      />
                      Jest
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="8" className="pr-8">
                      <input
                        type="checkbox"
                        id="8"
                        name="Pytest"
                        value="Pytest"
                        onChange={handleSkillSummaryChange}
                      />
                      Pytest
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="9" className="pr-8">
                      <input
                        type="checkbox"
                        id="9"
                        name="Mockito"
                        value="Mockito"
                        onChange={handleSkillSummaryChange}
                      />
                      Mockito
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          {affiliation === 'ML' && (
            <div className="flex mt-5">
              <div className="w-1/4 text-2xl pt-6 bg-sky-50 shadow-xl border-2 border-slate-300">
                スキル
              </div>
              <form className="w-3/4 flex justify-center text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
                <div className="grid grid-cols-4">
                  <div className="">
                    <label htmlFor="3" className="pr-8">
                      <input
                        type="checkbox"
                        id="3"
                        name="Python"
                        value="Python"
                        onChange={handleSkillSummaryChange}
                      />
                      Python
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="4" className="pr-8">
                      <input
                        type="checkbox"
                        id="4"
                        name="R言語"
                        value="R言語"
                        onChange={handleSkillSummaryChange}
                      />
                      R言語
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="5" className="pr-8">
                      <input
                        type="checkbox"
                        id="5"
                        onChange={handleSkillSummaryChange}
                      />
                      NumPy
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="6" className="pr-8">
                      <input
                        type="checkbox"
                        id="6"
                        name="Pandas"
                        value="Pandas"
                        onChange={handleSkillSummaryChange}
                      />
                      Pandas
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="7" className="pr-8">
                      <input
                        type="checkbox"
                        id="7"
                        name="Docker"
                        value="Docker"
                        onChange={handleSkillSummaryChange}
                      />
                      Docker
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="8" className="pr-8">
                      <input
                        type="checkbox"
                        id="8"
                        name="pyTorch"
                        value="pyTorch"
                        onChange={handleSkillSummaryChange}
                      />
                      pyTorch
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="9" className="pr-8">
                      <input
                        type="checkbox"
                        id="9"
                        name="Keras"
                        value="Keras"
                        onChange={handleSkillSummaryChange}
                      />
                      Keras
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          {affiliation === 'CL' && (
            <div className="flex mt-5">
              <div className="w-1/4 text-2xl pt-6 bg-sky-50 shadow-xl border-2 border-slate-300">
                スキル
              </div>
              <form className="w-3/4 flex justify-center text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
                <div className="grid grid-cols-4">
                  <div className="">
                    <label htmlFor="3" className="pr-8">
                      <input
                        type="checkbox"
                        id="3"
                        name="AWS"
                        value="AWS"
                        onChange={handleSkillSummaryChange}
                      />
                      AWS
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="4" className="pr-8">
                      <input
                        type="checkbox"
                        id="4"
                        name="Azure"
                        value="Azure"
                        onChange={handleSkillSummaryChange}
                      />
                      Azure
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="5" className="pr-8">
                      <input
                        type="checkbox"
                        id="5"
                        name="GCP"
                        value="GCP"
                        onChange={handleSkillSummaryChange}
                      />
                      GCP
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="6" className="pr-8">
                      <input
                        type="checkbox"
                        id="6"
                        name="Terraform"
                        value="Terraform"
                        onChange={handleSkillSummaryChange}
                      />
                      Terraform
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="7" className="pr-8">
                      <input
                        type="checkbox"
                        id="7"
                        name="Docker"
                        value="Docker"
                        onChange={handleSkillSummaryChange}
                      />
                      Docker
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="8" className="pr-8">
                      <input
                        type="checkbox"
                        id="8"
                        name="Linux"
                        value="Linux"
                        onChange={handleSkillSummaryChange}
                      />
                      Linux
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="9" className="pr-8">
                      <input
                        type="checkbox"
                        id="9"
                        name="Ansible"
                        value="Ansible"
                        onChange={handleSkillSummaryChange}
                      />
                      Ansible
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          {affiliation === 'PHP' && (
            <div className="flex mt-5">
              <div className="w-1/4 text-2xl pt-6 bg-sky-50 shadow-xl border-2 border-slate-300">
                スキル
              </div>
              <form className="w-3/4 flex justify-center text-xl p-3 bg-white shadow-xl border-2 border-slate-300">
                <div className="grid grid-cols-4">
                  <div className="">
                    <label htmlFor="3" className="pr-8">
                      <input
                        type="checkbox"
                        id="3"
                        name="PHP"
                        value="PHP"
                        onChange={handleSkillSummaryChange}
                      />
                      PHP
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="4" className="pr-8">
                      <input
                        type="checkbox"
                        id="4"
                        name="Laravel"
                        value="Laravel"
                        onChange={handleSkillSummaryChange}
                      />
                      Laravel
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="5" className="pr-8">
                      <input
                        type="checkbox"
                        id="5"
                        name="Symfony"
                        value="Symfony"
                        onChange={handleSkillSummaryChange}
                      />
                      Symfony
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="6" className="pr-8">
                      <input
                        type="checkbox"
                        id="6"
                        name="CakePHP"
                        value="CakePHP"
                        onChange={handleSkillSummaryChange}
                      />
                      CakePHP
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="7" className="pr-8">
                      <input
                        type="checkbox"
                        id="7"
                        name="FuelPHP"
                        value="FuelPHP"
                        onChange={handleSkillSummaryChange}
                      />
                      FuelPHP
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="8" className="pr-8">
                      <input
                        type="checkbox"
                        id="8"
                        name="MySQL"
                        value="MySQL"
                        onChange={handleSkillSummaryChange}
                      />
                      MySQL
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="9" className="pr-8">
                      <input
                        type="checkbox"
                        id="9"
                        name="PostgreSQL"
                        value="PostgreSQL"
                        onChange={handleSkillSummaryChange}
                      />
                      psql
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="mt-5">
            <div className="text-2xl">
              その他
              {/* <input
                type="text"
                className="ml-3 bg-white shadow-xl border-2 border-slate-300"
                onChange={handleSkillSummaryChange}
              /> */}
              {autocomplete.autoCalibration && (
                <Autocomplete
                  className="ml-3 bg-white shadow-xl border-2 border-slate-300"
                  multiple
                  id="tags-filled"
                  options={autocomplete.autoCalibration.map(
                    (option: SkillData) => option.skill
                  )}
                  // onChange={(event, newValue) => {
                  //   setSkillUpdate(Array.isArray(newValue) ? newValue : [newValue]);
                  // }}
                  onChange={(event, newValue) => {
                    setSkillUpdate(
                      Array.isArray(newValue)
                        ? (newValue as string[])
                        : [newValue as string]
                    );
                  }}
                  freeSolo
                  renderTags={(value: readonly any[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                        key={`${option}-${index}`} // タグごとに一意のキーを生成
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="検索"
                    />
                  )}
                />
              )}
            </div>
          </div>
          <div>
            {validationError && (
              <p className="text-red-500">{validationError}</p>
            )}
          </div>
          <button
            className="text-xl mt-5 px-3 py-1 shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white"
            onClick={handleChange}
            data-testid="search-button-2"
          >
            検索する
          </button>
          {/* </form> */}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default DbSales;
