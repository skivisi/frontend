/**
 * バリデーションつけてない
 *  - スキルスコア
 *  - 特有スキル
 */


/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import SkillScores from '@/components/skilledit/SkillScores';
import styles from './style.module.css';
import { userFetch } from '../mypage/_lib/userFetch';
import { useState, useEffect } from 'react';
import axios from 'axios';

// スペシャルスキルカラーバリエーション
const unselected =
  'w-32 text-center m-1 bg-zinc-300 border-4 border-zinc-400 rounded-xl p-1 font-bold text-zinc-400';
const selected_1 =
  'w-32 text-center m-1 bg-rose-300 border-4 border-rose-400 rounded-xl p-1 font-bold text-rose-800';
const selected_2 =
  'w-32 text-center m-1 bg-sky-300 border-4 border-sky-400 rounded-xl p-1 font-bold text-sky-800';
const selected_3 =
  'w-32 text-center m-1 bg-green-300 border-4 border-green-400 rounded-xl p-1 font-bold text-green-800';

const skillEdit = () => {
  const userData = userFetch(false, 0);
  console.log(userData.skillPoint);
  const [skills, setSkills] = useState<any>({
    skill: '',
    skillPoint: '',
    specialAbility: ''
  });


  useEffect(() => {
    setSkills((p: any) => ({
      ...p,
      skill: userData.skill,
      skillPoint: userData.skillPoint,
      specialAbility: userData.specialAbility
    }));
    if (userData.skillPoint == undefined) {
      setSkills((p: any) => ({
        ...p,
        skillPoint: defaultSkillPoint,
      }));
    }
  }, [userData.skill, userData.skillPoint, userData.specialAbility]);

  // 特有スキル編集
  const handleChangeInherent = (e: any, formIndex: number) => {
    if (formIndex === 1) {
      setSkills((prev: any) => {
        return {
          ...prev,
          skill: { ...prev.skill, InherentName: e.target.value },
        };
      });
    } else {
      setSkills((prev: any) => {
        return {
          ...prev,
          skill: {
            ...prev.skill,
            InherentDescription: e.target.value,
          },
        };
      });
    }
  };

  // スペシャルスキル編集
  const handleChangeAbilities = (index: number) => {
    const newAbilityValue = [...skills.specialAbility];
    console.log(newAbilityValue);
    if (newAbilityValue[index]['skillSelection'] === true) {
      newAbilityValue[index]['skillSelection'] = false;
    } else {
      newAbilityValue[index]['skillSelection'] = true;
    }

    setSkills((prev: any) => {
      return {
        ...prev,
          specialAbility: newAbilityValue,
      };
    });
  };

  // 編集内容の送信
  const submitHandler = async (e: any) => {
    e.preventDefault();

    const formData = {
      skillPoint: skills.skillPoint,
      skill: skills.skill,
    };
    try {
      const response = await axios.post('/skilledit/api', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-4xl p-10 my-10 shadow-xl"
    >
      {/* スキルポイント */}
      <section>
        <div className="bg-teal-800 py-5 border-4 border-slate-300 shadow-md">
          <h3 className="text-xl font-bold text-teal-50 ml-5">
            スキルスコア
          </h3>
          <SkillScores
            skillTag="FR"
            skillName="フロントエンド"
            skillPoint={skills.skillPoint}
            setSkills={setSkills}
          />
          <SkillScores
            skillTag="BK"
            skillName="バックエンド"
            skillPoint={skills.skillPoint}
            setSkills={setSkills}
          />
          <SkillScores
            skillTag="DB"
            skillName="データベース"
            skillPoint={skills.skillPoint}
            setSkills={setSkills}
          />
          <SkillScores
            skillTag="SBR"
            skillName="サーバーレス"
            skillPoint={skills.skillPoint}
            setSkills={setSkills}
          />
          <SkillScores
            skillTag="AR"
            skillName="設計"
            skillPoint={skills.skillPoint}
            setSkills={setSkills}
          />
          <SkillScores
            skillTag="TS"
            skillName="テスト"
            skillPoint={skills.skillPoint}
            setSkills={setSkills}
          />
          <SkillScores
            skillTag="COM"
            skillName="コミュニケーション"
            skillPoint={skills.skillPoint}
            setSkills={setSkills}
          />
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
            defaultValue={
              skills.skill.InherentName
                ? skills.skill.InherentName
                : ''
            }
            onChange={(e) => handleChangeInherent(e, 1)}
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
            defaultValue={
              skills.skill.InherentDescription
                ? skills.skill.InherentDescription
                : ''
            }
            onChange={(e) => handleChangeInherent(e, 2)}
          ></textarea>
        </div>
      </section>

      {/* スペシャルアビリティ */}
      <section className=" mt-5 p-5 shadow-md text-teal-800 bg-white">
        <h3 className="text-xl font-bold">スペシャルスキル</h3>
        <div className="flex flex-wrap justify-center mt-3">
          {/* 配列の要素を繰り返し処理して描画 */}

          {skills.specialAbility &&
            skills.specialAbility.map(
              (
                ability: {
                  skillList: string;
                  skillSelection: boolean;
                  tagColor: number
                },
                index: number
              ) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleChangeAbilities(index)}
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
                </button>
              )
            )}
        </div>
      </section>

      <div className="text-center">
        <button
          type="submit"
          className="shadow-md mt-10 h-16 px-10 text-2xl cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-4 border-white"
        >
          <span className="text-white font-bold m-5">登録</span>
        </button>
      </div>
    </form>
  );
};

export default skillEdit;

// 初回のデータがない場合挿入
let defaultSkillPoint = {
  userId: 1,
  FR: null,
  BK: null,
  DB: null,
  SBR: null,
  AR: null,
  TS: null,
  COM: null,
  abilities: [
    { property: '予知能力', value: false, tagColor: 1 },
    { property: 'テックリード', value: false, tagColor: 2 },
    { property: 'vim職人', value: false, tagColor: 2 },
    { property: 'shell芸人', value: false, tagColor: 3 },
    { property: '超ポジティブ', value: false, tagColor: 3 },
    { property: '遅刻魔', value: false, tagColor: 1 },
    { property: '気分屋', value: false, tagColor: 1 },
    { property: '新人', value: false, tagColor: 2 },
    { property: 'お喋り野郎', value: false, tagColor: 1 },
    { property: 'ガヤ', value: false, tagColor: 3 },
  ],
};
