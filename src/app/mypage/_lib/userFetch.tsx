/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { UserData, Spec } from '../../../../types/types';

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
      // argIdかcookies.userIdがundefinedの場合、APIのリクエストを実行しない
      if (
        (!isTrue && typeof cookies.userId === 'undefined') ||
        (isTrue && typeof argId === 'undefined')
      ) {
        return;
      }
      try {
        const getUserData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users?userId=${
            isTrue ? argId : cookies.userId
          }`
        );
        const {
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
          // specsをcreatedAtで降順にソートする
          const sortedSpecs = specs.sort(
            (a: Spec, b: Spec) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          );
          const latestSpec = sortedSpecs[0]; // 最新のspecを取得
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
            spec: latestSpec,
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
        // console.error(error);
        return error;
      }
    };

    fetchId();
  }, [argId, isTrue]);

  return userData;
};
