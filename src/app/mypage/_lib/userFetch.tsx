/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export const userFetch = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['id']);
  const [userData, setUserData] = useState<any>({
    user: "",
    skill: "",
    skillPoint: "",
    specialAbility: "",
    spec: "",
    portfolio: "",
    sellingPoint: "",
    qualification: "",
    previousWork: "",
    developmentExperience: "",
    techResult:""
  });

  useEffect(() => {
    const fetchId = async () => {
      const prof = await axios.get(
        `http://127.0.0.1:8000/user?id=${cookies.id}`
      );
      const profResult = prof.data;

      const skill = await axios.get(
        `http://127.0.0.1:8000/skill?userId=${cookies.id}`
      );
      const skillResult = skill.data;

      const skillPoint = await axios.get(
        `http://127.0.0.1:8000/skillPoint?userId=${cookies.id}`
      );
      const skillPointResult = skillPoint.data;

      const specialAbility = await axios.get(
        `http://127.0.0.1:8000/specialAbility?userId=${cookies.id}`
      );
      const specialAbilityResult = specialAbility.data;

      const spec = await axios
        .get(`http://127.0.0.1:8000/spec?userId=${cookies.id}`)
        .then(async (res) => {
          const specResult = await res.data.reduce(
            (latest: any, current: any) => {
              return new Date(latest.createdAt) >
                new Date(current.createdAt)
                ? latest
                : current;
            }
          );

          const portfolio = await axios.get(
            `http://127.0.0.1:8000/portfolio?specId=${specResult.id}`
          );
          const portfolioResult = portfolio.data;

          const sellingPoint = await axios.get(
            `http://127.0.0.1:8000/sellingPoint?specId=${specResult.id}`
          );
          const sellingPointResult = sellingPoint.data;

          const qualification = await axios.get(
            `http://127.0.0.1:8000/qualification?specId=${specResult.id}`
          );
          const qualificationResult = qualification.data;

          const previousWork = await axios.get(
            `http://127.0.0.1:8000/previousWork?specId=${specResult.id}`
          );
          const previousWorkResult = previousWork.data;

          const developmentExperience = await axios.get(
            `http://127.0.0.1:8000/developmentExperience?specId=${specResult.id}`
          );
          const developmentExperienceResult =
            developmentExperience.data;

          const skillSummary = await axios
          .get(`http://127.0.0.1:8000/skillSummary?specId=${specResult.id}`)
          const skillSummaryResult = skillSummary.data;

          const autoCalibration = await axios
          .get(`http://127.0.0.1:8000/autoCalibration`)
          const autoCalibrationResult = autoCalibration.data;


          const techResult = skillSummaryResult.map((summary:any) => {
            return autoCalibrationResult.find((calibration:any) => calibration.id === summary.autoCalibrationId)!;
          });

          setUserData((p: any) => ({
            ...p,
            user: profResult[0],
            skill: skillResult[0],
            skillPoint: skillPointResult[0],
            specialAbility: specialAbilityResult[0],
            spec: specResult, //直近のもの
            portfolio: portfolioResult,
            sellingPoint: sellingPointResult,
            qualification: qualificationResult,
            previousWork: previousWorkResult,
            developmentExperience: developmentExperienceResult,
            techResult: techResult,
          }));
        });
    };
    fetchId();
  }, [cookies]);

  return userData;
};
