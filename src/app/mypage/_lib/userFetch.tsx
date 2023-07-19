/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { UserData } from '../../../../types/types';

export const userFetch = (isTrue: boolean, argId: number) => {
  // console.log(process.env.API_SECRET_URL);
  // console.log(process.env.NEXT_PUBLIC_API_URL);

  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  console.log(cookies);
  const [userData, setUserData] = useState<UserData>({
    user: {
      affiliation: '',
      businessSituation: '',
      employeeNumber: 0,
      userId: 0,
      userName: '',
    },
    skill: {
      InherentDescription: '',
      InherentName: '',
      skillId: 0,
      updatedAt: '',
      userId: 0,
    },
    skillPoint: {
      AR: 0,
      BK: 0,
      COM: 0,
      DB: 0,
      FR: 0,
      SBR: 0,
      TS: 0,
      skillPointId: 0,
      userId: 0,
    },
    specialAbility: [],
    spec: {
      createdAt: '',
      github: '',
      offHours: '',
      searchs: false,
      specId: 0,
      userId: 0,
    },
    portfolio: [],
    sellingPoint: [],
    qualification: [],
    previousWork: [],
    developmentExperience: [],
    skillSummaries: {
      cloud: [],
      developmentDomain: [],
      environment: [],
      framework: [],
      library: [],
      programmingLanguage: [],
      skillSummaryId: 0,
      specId: 0,
      tool: [],
    },
    userId: 0,
    specId: 0,
  });
  useEffect(() => {
    const fetchId = async () => {
      try {
        const getUserData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users?userId=${
            isTrue ? argId : cookies.userId
          }`
        );
        const {
          createdAt,
          email,
          joinDate,
          requests,
          updatedAt,
          userId,
          affiliation,
          businessSituation,
          employeeNumber,
          skillPoints,
          skills,
          specialAbilities,
          specs,
          userName,
        } = getUserData.data;

        setUserData((p: UserData) => ({
          ...p,
          user: {
            userId: userId,
            affiliation: affiliation,
            businessSituation: businessSituation,
            userName: userName,
            employeeNumber: employeeNumber,
          },
          userId: userId,
          skill: skills[0],
          skillPoint: skillPoints[0],
          specialAbility: specialAbilities,
          spec: specs[0],
        }));

        // 最新スペックシートの取得
        if (specs.length > 0) {
          const getSpecIds = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/spec/get/${
              isTrue ? argId : cookies.userId
            }`
          );
          const {
            specId,
            developmentExperiences,
            portfolios,
            previousWorks,
            qualifications,
            sellingPoints,
            skillSummaries,
          } = getSpecIds.data;

          setUserData((p: UserData) => ({
            ...p,
            specId: specId,
            portfolio: portfolios,
            sellingPoint: sellingPoints,
            qualification: qualifications,
            previousWork: previousWorks,
            developmentExperience: developmentExperiences,
            skillSummaries: skillSummaries[0],
          }));
        }
      } catch (error) {
        console.error(error);
        return error;
        // エラーをキャッチしたら、何らかの形でユーザーにエラーを通知します。
        // エラーメッセージを状態変数に設定し、それを返すことも可能です。
        // setUserDataなどでエラー状態を管理することもできます。
      }
    };

    fetchId();
  }, [argId, isTrue]);

  return userData;
};
