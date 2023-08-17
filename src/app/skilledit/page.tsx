
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import SkillScores from '@/components/skilledit/SkillScores';
import styles from './style.module.css';
import { userFetch } from '../mypage/_lib/userFetch';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import {
  Skill,
  SkillPoint,
  Ability,
  SkillsData,
} from '../../../types/types';

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

  const skill = userData.skill;
  const skillPoint = userData.skillPoint;
  const specialAbilities = userData.specialAbility;
  const userId = userData.userId;

  const [skills, setSkills] = useState<SkillsData>({
    skill: {
      InherentDescription: '',
      InherentName: '',
      skillId: 0,
      updatedAt: '',
      userId: userId,
    },
    skillPoint: {
      userId: userId,
      FR: null,
      BK: null,
      DB: null,
      SBR: null,
      AR: null,
      TS: null,
      COM: null,
    },
    abilities: [],
  });

  // 初回のデータがない場合挿入
  let defaultSkillPoint: SkillPoint = {
    userId: userId,
    FR: null,
    BK: null,
    DB: null,
    SBR: null,
    AR: null,
    TS: null,
    COM: null,
  };
  let defaultAbilities: Ability[] = [
    { skillList: '予知能力', skillSelection: false, tagColor: 1 },
    { skillList: 'テックリード', skillSelection: false, tagColor: 2 },
    { skillList: 'vim職人', skillSelection: false, tagColor: 2 },
    { skillList: 'shell芸人', skillSelection: false, tagColor: 3 },
    { skillList: '超ポジティブ', skillSelection: false, tagColor: 3 },
    { skillList: '遅刻魔', skillSelection: false, tagColor: 1 },
    { skillList: '気分屋', skillSelection: false, tagColor: 1 },
    { skillList: '新人', skillSelection: false, tagColor: 2 },
    { skillList: 'お喋り野郎', skillSelection: false, tagColor: 1 },
    { skillList: 'ガヤ', skillSelection: false, tagColor: 3 },
  ];
  console.log(skills);

  // エラーメッセージのステートをそれぞれ作成
  const [skillNameError, setSkillNameError] = useState<string | null>(null);
  const [skillDescError, setSkillDescError] = useState<string | null>(null);
  const [skillPointsError, setSkillPointsError] = useState<string | null>(null);

  useEffect(() => {
    setSkills((p: SkillsData) => ({
      ...p,
      skill: skill,
      skillPoint: skillPoint,
      abilities: specialAbilities,
    }));
    if (
      typeof skillPoint == 'undefined' ||
      specialAbilities.length == 0
    ) {
      setSkills((p: SkillsData) => ({
        ...p,
        skillPoint: defaultSkillPoint,
        abilities: defaultAbilities,
      }));
    }
  }, [skill, skillPoint, specialAbilities]);

  // 特有スキル編集
  const handleChangeInherent = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>,
    formIndex: number
  ) => {
    if (formIndex === 1) {
      setSkills((prev: SkillsData) => {
        return {
          ...prev,
          skill: { ...prev.skill, InherentName: e.target.value },
        };
      });
    } else {
      setSkills((prev: SkillsData) => {
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
    const newAbilityValue = [...skills.abilities];
    if (newAbilityValue[index]['skillSelection'] === true) {
      newAbilityValue[index]['skillSelection'] = false;
    } else {
      newAbilityValue[index]['skillSelection'] = true;
    }

    setSkills((prev: SkillsData) => {
      return {
        ...prev,
        abilities: newAbilityValue,
      };
    });
  };


  // 編集内容の送信
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasValidationError = false;

    // 特有スキルのタイトルの入力チェック
  if (!skills.skill?.InherentName) {
    setSkillNameError('特有スキルのタイトルは必須です。');
    hasValidationError = true;
  } else {
    setSkillNameError(null);
  }
  console.log(skillNameError);
  //　特有スキルの内容の入力チェック
  if (!skills.skill?.InherentDescription) {
    setSkillDescError('特有スキルの内容は必須です。');
    hasValidationError = true;
  } else {
    setSkillDescError(null);
  }

  const skillPoints = [
    skills.skillPoint?.FR,
    skills.skillPoint?.BK,
    skills.skillPoint?.DB,
    skills.skillPoint?.SBR,
    skills.skillPoint?.AR,
    skills.skillPoint?.TS,
    skills.skillPoint?.COM
  ];
  // スキルポイントのバリデーションチェック
  const anyEmptySkillPoints = skillPoints.some(point => point === null || point === undefined);
  if (anyEmptySkillPoints) {
    setSkillPointsError('全てのスキルポイントを入力してください。');
    hasValidationError = true;
  } else {
    setSkillPointsError(null);
  }
   // バリデーションエラーがある場合はここで終了
   if (hasValidationError) {
    return;
  };

    const formData = {
      InherentName: skills.skill?.InherentName,
      InherentDescription: skills.skill?.InherentDescription,
      FR: skills.skillPoint?.FR,
      BK: skills.skillPoint?.BK,
      DB: skills.skillPoint?.DB,
      SBR: skills.skillPoint?.SBR,
      AR: skills.skillPoint?.AR,
      TS: skills.skillPoint?.TS,
      COM: skills.skillPoint?.COM,
      abilities: skills.abilities,
  };

    try {
      if (typeof skill === 'undefined') {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/skill/postSkillData/${userId}`,
          formData
        );
      } else{
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/skill/update/${userId}`,
          formData
        );
      }
      window.location.href = '/mypage';
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
        {skillPointsError && <div className="bg-red-200 text-red-700 p-3 mb-4 rounded">{skillPointsError}</div>}
      </section>

      {/* 特有スキル */}
      <section className=" mt-5 p-5 shadow-md text-teal-800">
        <h3 className="text-xl font-bold">特有スキル</h3>
        <div className="w-full flex border-2 border-slate-300 mt-3 h-10 shadow-md">
          <label
            className=" block w-1/4 p-1 bg-teal-800 text-teal-50"
            htmlFor="titles"
          >
            タイトル
          </label>
          <input
            className={`${styles.focus} block w-3/4 p-2 bg-white`}
            type="text"
            name="titles"
            data-testid="titles"
            id="titles"
            defaultValue={
              skills.skill?.InherentName
                ? skills.skill?.InherentName
                : ''
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeInherent(e, 1)
            }
          />
        </div>
        {skillNameError && <div className="bg-red-200 text-red-700 p-3 mb-4 rounded">{skillNameError}</div>}
        <div className="w-full flex border-2 border-slate-300 shadow-md">
          <label
            className="block w-1/4 p-1 bg-teal-800 text-teal-50"
            htmlFor="content"
          >
            内容
          </label>
          <textarea
            name="content"
            id="content"
            data-testid="content"
            className={`${styles.focus} p-2`}
            cols={65}
            rows={5}
            defaultValue={
              skills.skill?.InherentDescription
                ? skills.skill?.InherentDescription
                : ''
            }
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleChangeInherent(e, 2)
            }
          ></textarea>
        </div>
        {skillDescError && <div className="bg-red-200 text-red-700 p-3 mb-4 rounded">{skillDescError}</div>}
      </section>

      {/* スペシャルアビリティ */}
      <section className=" mt-5 p-5 shadow-md text-teal-800 bg-white">
        <h3 className="text-xl font-bold">スペシャルスキル</h3>
        <div className="flex flex-wrap justify-center mt-3">
          {/* 配列の要素を繰り返し処理して描画 */}

          {skills.abilities &&
            skills.abilities.map(
              (
                ability: {
                  skillList: string;
                  skillSelection: boolean;
                  tagColor: number;
                },
                index: number
              ) => (
                <button
                  key={index}
                  type="button"
                  data-testid="buttons"
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
// let defaultSkillPoint = {
//   userId: 1,
//   FR: null,
//   BK: null,
//   DB: null,
//   SBR: null,
//   AR: null,
//   TS: null,
//   COM: null,
// };

// let defaultAbilities = [
//   { property: '予知能力', value: false, tagColor: 1 },
//   { property: 'テックリード', value: false, tagColor: 2 },
//   { property: 'vim職人', value: false, tagColor: 2 },
//   { property: 'shell芸人', value: false, tagColor: 3 },
//   { property: '超ポジティブ', value: false, tagColor: 3 },
//   { property: '遅刻魔', value: false, tagColor: 1 },
//   { property: '気分屋', value: false, tagColor: 1 },
//   { property: '新人', value: false, tagColor: 2 },
//   { property: 'お喋り野郎', value: false, tagColor: 1 },
//   { property: 'ガヤ', value: false, tagColor: 3 },
// ];
