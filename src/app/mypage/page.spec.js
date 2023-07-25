/* eslint-disable react/display-name */
import {
  render,
  fireEvent,
} from '@testing-library/react';
import Page from './page';

jest.mock('@/components/mypage/Skillview', () => () => <div>Skillview Mock</div>);
jest.mock('@/components/mypage/Specview', () => () => <div>Specview Mock</div>);
jest.mock('./_lib/userFetch', () => ({
  userFetch: jest.fn().mockResolvedValue({
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
  }),
}));


test('test changePageState function', () => {
  const { getByText } = render(<Page />);

  const skillButton = getByText('スキル');
  const specButton = getByText('スペック');
  const LButton = getByText('L');
  const RButton = getByText('R');
  const h2Element = getByText('スキルシート');


  expect(h2Element).toBeTruthy();

  fireEvent.click(skillButton);
  expect(h2Element.textContent).toBe('スキルシート');

  fireEvent.click(LButton);
  expect(h2Element.textContent).toBe('スキルシート');

  fireEvent.click(specButton);
  expect(h2Element.textContent).toBe('スペックシート');

  fireEvent.click(RButton);
  expect(h2Element.textContent).toBe('スペックシート');
});
