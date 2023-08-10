import { autoComplete } from './autoComplete';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import { renderHook, waitFor } from '@testing-library/react';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('autoComplete custom hook', () => {
  test('should fetch autocomplete data successfully', async () => {
    const { result } = renderHook(() => autoComplete());

    await waitFor(() => {
      expect(result.current).toEqual(expectedObject);
    });
  });

  test('should handle server error', async () => {
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_API_URL}/autoCalibration/get`,
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    const { result } = renderHook(() => autoComplete());
    await waitFor(() => {
      expect(result.current).toEqual(errorObject);
    });
  });
});

const expectedObject = {
  assignedDevelopment: [
    {
      CL: 2,
      FR: 1,
      JAVA: 1,
      ML: 3,
      PHP: 2,
      QA: 1,
      autoCalibrationId: 13,
      category: 7,
      skill: 'Skill13',
    },
    {
      CL: 3,
      FR: 2,
      JAVA: 2,
      ML: 1,
      PHP: 1,
      QA: 2,
      autoCalibrationId: 14,
      category: 7,
      skill: 'Skill14',
    },
  ],
  autoCalibration: [
    {
      autoCalibrationId: 1,
      skill: 'Skill1',
      category: 1,
      FR: 1,
      CL: 2,
      ML: 3,
      QA: 1,
      JAVA: 1,
      PHP: 2,
    },
    {
      autoCalibrationId: 2,
      skill: 'Skill2',
      category: 1,
      FR: 2,
      CL: 3,
      ML: 1,
      QA: 2,
      JAVA: 2,
      PHP: 1,
    },
    {
      autoCalibrationId: 3,
      skill: 'Skill3',
      category: 2,
      FR: 3,
      CL: 1,
      ML: 2,
      QA: 3,
      JAVA: 1,
      PHP: 2,
    },
    {
      autoCalibrationId: 4,
      skill: 'Skill4',
      category: 2,
      FR: 1,
      CL: 2,
      ML: 3,
      QA: 1,
      JAVA: 2,
      PHP: 1,
    },
    {
      autoCalibrationId: 5,
      skill: 'Skill5',
      category: 3,
      FR: 2,
      CL: 3,
      ML: 1,
      QA: 2,
      JAVA: 1,
      PHP: 2,
    },
    {
      autoCalibrationId: 6,
      skill: 'Skill6',
      category: 3,
      FR: 3,
      CL: 1,
      ML: 2,
      QA: 3,
      JAVA: 2,
      PHP: 1,
    },
    {
      autoCalibrationId: 7,
      skill: 'Skill7',
      category: 4,
      FR: 1,
      CL: 2,
      ML: 3,
      QA: 1,
      JAVA: 1,
      PHP: 2,
    },
    {
      autoCalibrationId: 8,
      skill: 'Skill8',
      category: 4,
      FR: 2,
      CL: 3,
      ML: 1,
      QA: 2,
      JAVA: 2,
      PHP: 1,
    },
    {
      autoCalibrationId: 9,
      skill: 'Skill9',
      category: 5,
      FR: 3,
      CL: 1,
      ML: 2,
      QA: 3,
      JAVA: 1,
      PHP: 2,
    },
    {
      autoCalibrationId: 10,
      skill: 'Skill10',
      category: 5,
      FR: 1,
      CL: 2,
      ML: 3,
      QA: 1,
      JAVA: 2,
      PHP: 1,
    },
    {
      autoCalibrationId: 11,
      skill: 'Skill11',
      category: 6,
      FR: 2,
      CL: 3,
      ML: 1,
      QA: 2,
      JAVA: 1,
      PHP: 2,
    },
    {
      autoCalibrationId: 12,
      skill: 'Skill12',
      category: 6,
      FR: 3,
      CL: 1,
      ML: 2,
      QA: 3,
      JAVA: 2,
      PHP: 1,
    },
    {
      autoCalibrationId: 13,
      skill: 'Skill13',
      category: 7,
      FR: 1,
      CL: 2,
      ML: 3,
      QA: 1,
      JAVA: 1,
      PHP: 2,
    },
    {
      autoCalibrationId: 14,
      skill: 'Skill14',
      category: 7,
      FR: 2,
      CL: 3,
      ML: 1,
      QA: 2,
      JAVA: 2,
      PHP: 1,
    },
  ],
  cloud: [
    {
      CL: 1,
      FR: 3,
      JAVA: 1,
      ML: 2,
      PHP: 2,
      QA: 3,
      autoCalibrationId: 9,
      category: 5,
      skill: 'Skill9',
    },
    {
      CL: 2,
      FR: 1,
      JAVA: 2,
      ML: 3,
      PHP: 1,
      QA: 1,
      autoCalibrationId: 10,
      category: 5,
      skill: 'Skill10',
    },
  ],
  framework: [
    {
      CL: 3,
      FR: 2,
      JAVA: 1,
      ML: 1,
      PHP: 2,
      QA: 2,
      autoCalibrationId: 5,
      category: 3,
      skill: 'Skill5',
    },
    {
      CL: 1,
      FR: 3,
      JAVA: 2,
      ML: 2,
      PHP: 1,
      QA: 3,
      autoCalibrationId: 6,
      category: 3,
      skill: 'Skill6',
    },
  ],
  lang: [
    {
      CL: 1,
      FR: 3,
      JAVA: 1,
      ML: 2,
      PHP: 2,
      QA: 3,
      autoCalibrationId: 3,
      category: 2,
      skill: 'Skill3',
    },
    {
      CL: 2,
      FR: 1,
      JAVA: 2,
      ML: 3,
      PHP: 1,
      QA: 1,
      autoCalibrationId: 4,
      category: 2,
      skill: 'Skill4',
    },
  ],
  library: [
    {
      CL: 2,
      FR: 1,
      JAVA: 1,
      ML: 3,
      PHP: 2,
      QA: 1,
      autoCalibrationId: 7,
      category: 4,
      skill: 'Skill7',
    },
    {
      CL: 3,
      FR: 2,
      JAVA: 2,
      ML: 1,
      PHP: 1,
      QA: 2,
      autoCalibrationId: 8,
      category: 4,
      skill: 'Skill8',
    },
  ],
  os: [
    {
      CL: 2,
      FR: 1,
      JAVA: 1,
      ML: 3,
      PHP: 2,
      QA: 1,
      autoCalibrationId: 1,
      category: 1,
      skill: 'Skill1',
    },
    {
      CL: 3,
      FR: 2,
      JAVA: 2,
      ML: 1,
      PHP: 1,
      QA: 2,
      autoCalibrationId: 2,
      category: 1,
      skill: 'Skill2',
    },
  ],
  tool: [
    {
      CL: 3,
      FR: 2,
      JAVA: 1,
      ML: 1,
      PHP: 2,
      QA: 2,
      autoCalibrationId: 11,
      category: 6,
      skill: 'Skill11',
    },
    {
      CL: 1,
      FR: 3,
      JAVA: 2,
      ML: 2,
      PHP: 1,
      QA: 3,
      autoCalibrationId: 12,
      category: 6,
      skill: 'Skill12',
    },
  ],
};

const errorObject = {
  autoCalibration: [],
  os: [],
  lang: [],
  framework: [],
  library: [],
  cloud: [],
  tool: [],
  assignedDevelopment: [],
};
