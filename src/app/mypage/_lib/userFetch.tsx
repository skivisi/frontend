/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export const userFetch = (isTrue: boolean, argId: number) => {
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  const [userData, setUserData] = useState<any>({
    user: '',
    skill: '',
    skillPoint: '',
    specialAbility: '',
    spec: '',
    portfolio: '',
    sellingPoint: '',
    qualification: '',
    previousWork: '',
    developmentExperience: '',
    techResult: '',
  });

  useEffect(() => {
    const fetchId = async () => {
      const getUserData = await axios.get(
        `http://localhost:8000/api/users?userId=${cookies.userId}`
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

       setUserData((p: any) => ({
        ...p,
        user: {
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
    console.log(userId)
      // 最新スペックシートの取得
     if(specs.length > 0){
      const getSpecIds = await axios.get(
        `http://localhost:8000/api/spec/get/${
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

      setUserData((p: any) => ({
        ...p,
        specId:specId,
        portfolio: portfolios,
        sellingPoint: sellingPoints,
        qualification: qualifications,
        previousWork: previousWorks,
        developmentExperience: developmentExperiences,
        skillSummaries: skillSummaries[0],
    }));
    }
    };
    fetchId();
  }, [argId, cookies, isTrue]);

  return userData;
};

// const prof = await axios.get(
//   `http://127.0.0.1:8080/user?id=${cookies.userId}`
// );
// const profResult = prof.data;

// const skill = await axios.get(
//   `http://127.0.0.1:8080/skill?userId=${cookies.userId}`
// );
// const skillResult = skill.data;

// const skillPoint = await axios.get(
//   `http://127.0.0.1:8080/skillPoint?userId=${cookies.userId}`
// );
// const skillPointResult = skillPoint.data;

// const specialAbility = await axios.get(
//   `http://127.0.0.1:8080/specialAbility?userId=${cookies.userId}`
// );
// const specialAbilityResult = specialAbility.data;
// // console.log(specialAbilityResult)

// const spec = await axios
//   .get(`http://127.0.0.1:8080/spec?userId=${cookies.userId}`)
//   .then(async (res) => {
//     const specResult = await res.data.reduce(
//       (latest: any, current: any) => {
//         return new Date(latest.createdAt) >
//           new Date(current.createdAt)
//           ? latest
//           : current;
//       }
//     );

//     const portfolio = await axios.get(
//       `http://127.0.0.1:8080/portfolio?specId=${specResult.id}`
//     );
//     const portfolioResult = portfolio.data;

//     const sellingPoint = await axios.get(
//       `http://127.0.0.1:8080/sellingPoint?specId=${specResult.id}`
//     );
//     const sellingPointResult = sellingPoint.data;

//     const qualification = await axios.get(
//       `http://127.0.0.1:8080/qualification?specId=${specResult.id}`
//     );
//     const qualificationResult = qualification.data;

//     const previousWork = await axios.get(
//       `http://127.0.0.1:8080/previousWork?specId=${specResult.id}`
//     );
//     const previousWorkResult = previousWork.data;

//     const developmentExperience = await axios.get(
//       `http://127.0.0.1:8080/developmentExperience?specId=${specResult.id}`
//     );
//     const developmentExperienceResult =
//       developmentExperience.data;

//     const skillSummary = await axios.get(
//       `http://127.0.0.1:8080/skillSummary?specId=${specResult.id}`
//     );
//     const skillSummaryResult = skillSummary.data;

//     const autoCalibration = await axios.get(
//       `http://127.0.0.1:8080/autoCalibration`
//     );
//     const autoCalibrationResult = autoCalibration.data;

//     const techResult = skillSummaryResult.map(
//       (summary: any) => {
//         return autoCalibrationResult.find(
//           (calibration: any) =>
//             calibration.id === summary.autoCalibrationId
//         )!;
//       }
//     );
// setUserData((p: any) => ({
//   ...p,
//   user: profResult[0],
//   skill: skillResult[0],
//   skillPoint: skillPointResult[0],
//   specialAbility: specialAbilityResult[0],
//   spec: specResult, //直近のもの
//   portfolio: portfolioResult,
//   sellingPoint: sellingPointResult,
//   qualification: qualificationResult,
//   previousWork: previousWorkResult,
//   developmentExperience: developmentExperienceResult,
//   techResult: techResult,
// }));
// });
