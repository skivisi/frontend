/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  autoCalibration,
  autoCalibrations,
} from '../../../../types/types';

export const autoComplete = () => {
  const [autocomplete, setAutocomplete] = useState<autoCalibrations>({
    autoCalibration: [],
    os: [],
    lang: [],
    framework: [],
    library: [],
    cloud: [],
    tool: [],
    assignedDevelopment: [],
  });

  useEffect(() => {
    const fetchId = async () => {
      try {
        const autoCalibration = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/autoCalibration/get`
        );
        const autoCalibrations = autoCalibration.data;

        const os = autoCalibrations.filter(
          (p: autoCalibration) => p.category === 1
        );
        const lang = autoCalibrations.filter(
          (p: autoCalibration) => p.category === 2
        );
        const framework = autoCalibrations.filter(
          (p: autoCalibration) => p.category === 3
        );
        const library = autoCalibrations.filter(
          (p: autoCalibration) => p.category === 4
        );
        const cloud = autoCalibrations.filter(
          (p: autoCalibration) => p.category === 5
        );
        const tool = autoCalibrations.filter(
          (p: autoCalibration) => p.category === 6
        );
        const assignedDevelopment = autoCalibrations.filter(
          (p: autoCalibration) => p.category === 7
        );

        setAutocomplete((p: autoCalibrations) => ({
          ...p,
          autoCalibration: autoCalibrations,
          os: os,
          lang: lang,
          framework: framework,
          library: library,
          cloud: cloud,
          tool: tool,
          assignedDevelopment: assignedDevelopment,
        }));
      } catch (error) {
        // console.error(error);
        return error;
      }
    };
    fetchId();
  }, []);

  return autocomplete;
};
