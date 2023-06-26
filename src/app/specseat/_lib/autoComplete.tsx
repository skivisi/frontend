/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from 'react';
import axios from 'axios';

export const autoComplete = () => {
  const [autocomplete, setAutocomplete] = useState<any>({});

  useEffect(() => {
    const fetchId = async () => {
      const autoCalibration = await axios.get(
        `http://localhost:8000/api/autoCalibration/get`
      );
      const os = autoCalibration.data.filter(
        (p: any) => p.category === 1
      );
      const lang = autoCalibration.data.filter(
        (p: any) => p.category === 2
      );
      const framework = autoCalibration.data.filter(
        (p: any) => p.category === 3
      );
      const library = autoCalibration.data.filter(
        (p: any) => p.category === 4
      );
      const cloud = autoCalibration.data.filter(
        (p: any) => p.category === 5
      );
      const tool = autoCalibration.data.filter(
        (p: any) => p.category === 6
      );
      const assignedDevelopment = autoCalibration.data.filter(
        (p: any) => p.category === 7
      );

      setAutocomplete((p: any) => ({
        ...p,
        autoCalibration: autoCalibration.data,
        os: os,
        lang: lang,
        framework: framework,
        library: library,
        cloud: cloud,
        tool: tool,
        assignedDevelopment: assignedDevelopment,
      }));
      // setAutocomplete(os)
    };
    fetchId();
  }, []);

  return autocomplete;
};
