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
      const autoCalibration = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/autoCalibration/get`
      );

      const os = autoCalibration.data.filter(
        (p: autoCalibration) => p.category === 1
      );
      const lang = autoCalibration.data.filter(
        (p: autoCalibration) => p.category === 2
      );
      const framework = autoCalibration.data.filter(
        (p: autoCalibration) => p.category === 3
      );
      const library = autoCalibration.data.filter(
        (p: autoCalibration) => p.category === 4
      );
      const cloud = autoCalibration.data.filter(
        (p: autoCalibration) => p.category === 5
      );
      const tool = autoCalibration.data.filter(
        (p: autoCalibration) => p.category === 6
      );
      const assignedDevelopment = autoCalibration.data.filter(
        (p: autoCalibration) => p.category === 7
      );

      setAutocomplete((p: autoCalibrations) => ({
        ...p,
        autoCalibration:autoCalibration.data,
        os:os,
        lang:lang,
        framework:framework,
        library: library,
        cloud: cloud,
        tool: tool,
        assignedDevelopment:assignedDevelopment
      }))
    };
    fetchId()
  }, []);

  return autocomplete;
};
