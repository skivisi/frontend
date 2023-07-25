import { userFetch } from './userFetch';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import { renderHook, waitFor } from '@testing-library/react';
import { useCookies } from 'react-cookie';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// cookieの値(react-cookie)のモック化
jest.mock('react-cookie', () => ({
  useCookies: jest.fn(),
}));

describe('custom-hook_userFetch', () => {
  test('cookie:userIdの値のユーザーの取得', async () => {
    const mockSetCookie = jest.fn();
    const mockRemoveCookie = jest.fn();
    const cookies = { userId: '1' };
    useCookies.mockReturnValue([
      cookies,
      mockSetCookie,
      mockRemoveCookie,
    ]);
    const { result } = renderHook(() => userFetch(false, 0));
    await waitFor(() => {
      console.log(result)
      console.log(equalObject)
      expect(result.current).toEqual(equalObject);
    });
  });

  test('cookie:userIdの値のユーザーの取得（エラー時）', async () => {
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({ error: 'Bad request' })
          );
        }
      )
    );

    const mockSetCookie = jest.fn();
    const mockRemoveCookie = jest.fn();
    const cookies = { userId: '1' };
    useCookies.mockReturnValue([
      cookies,
      mockSetCookie,
      mockRemoveCookie,
    ]);
    const { result } = renderHook(() => userFetch(false, 0));
    await waitFor(() => {
      console.log(result)
      console.log(equalErrorObject)
      expect(result.current).toEqual(equalErrorObject);
    });
  });

  test('引数:true,argIdの値のユーザーの取得', async () => {
    const { result } = renderHook(() => userFetch(true, 1));
    await waitFor(() => {
      expect(result.current).toEqual(equalObject);
    });
  });

  test('引数:true,argIdの値のユーザーの取得（エラー時）', async () => {
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({ error: 'Bad request' })
          );
        }
      )
    );

    const { result } = renderHook(() => userFetch(true, 1));
    await waitFor(() => {
      expect(result.current).toEqual(equalErrorObject);
    });
  });
});

const equalObject = {
  developmentExperience: [
    {
      assignedTask: 'Developing frontend',
      duration: '12 months',
      environments: ['Linux'],
      frameworks: ['React'],
      img: 'imagePath.jpg',
      jobDuties: 'Coding, Reviewing',
      programmingLanguages: ['JavaScript'],
      projectName: 'Project X',
      specId: 1,
      startDate: '01',
      startYear: '2020',
      teamSize: '5',
      tools: ['VS Code'],
      totalProjectHeadcount: '10',
    },
  ],
  portfolio: [
    {
      heading: 'My Portfolio',
      portfolioId: 1,
      specId: 1,
      url: 'www.example.com',
    },
  ],
  previousWork: [
    {
      JobDuties: 'Coding',
      industry: 'IT',
      occupation: 'Engineer',
      previousWorkId: 1,
      specId: 1,
    },
  ],
  qualification: [
    {
      acquisitionDate: '2020-01-01',
      credential: 'AWS Certified',
      qualificationId: 1,
      specId: 1,
    },
  ],
  sellingPoint: [
    {
      content: 'Fast Learner',
      sellingPointId: 1,
      specId: 1,
      title: 'My Strengths',
    },
  ],
  skill: {
    InherentDescription: 'Some description',
    InherentName: 'Some name',
    skillId: 1,
    updatedAt: '2023-06-01T00:00:00.000Z',
    userId: 1,
  },
  skillPoint: {
    AR: 10,
    BK: 20,
    COM: 30,
    DB: 40,
    FR: 50,
    SBR: 60,
    TS: 70,
    skillPointId: 1,
    userId: 1,
  },
  skillSummaries: {
    cloud: ['AWS'],
    developmentDomain: ['Frontend'],
    environment: ['Linux'],
    framework: ['React'],
    library: ['Redux'],
    programmingLanguage: ['JavaScript'],
    skillSummaryId: 1,
    specId: 1,
    tool: ['VS Code'],
  },
  spec: {
    createdAt: '2023-06-01T00:00:00.000Z',
    github: 'https://github.com/user',
    offHours: '5 hours',
    searchs: true,
    specId: 1,
    userId: 1,
  },
  specId: 1,
  specialAbility: [
    {
      skillList: 'Some skill list',
      skillSelection: true,
      spaecialAbilityId: 1,
      tagColor: 1,
      userId: 1,
    },
  ],
  user: {
    affiliation: 'Some affiliation',
    businessSituation: 'Some business situation',
    employeeNumber: 1,
    userId: 1,
    userName: 'Some user',
  },
  userId: 1,
};

const equalErrorObject = {
  developmentExperience: [],
  portfolio: [],
  previousWork: [],
  qualification: [],
  sellingPoint: [],
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
  spec: {
    createdAt: '',
    github: '',
    offHours: '',
    searchs: false,
    specId: 0,
    userId: 0,
  },
  specId: 0,
  specialAbility: [],
  user: {
    affiliation: '',
    businessSituation: '',
    employeeNumber: 0,
    userId: 0,
    userName: '',
  },
  userId: 0,
};
