import { screen, render } from '@testing-library/react';
import Specview from './Specview';

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

describe('Skillviewコンポーネント', () => {
  it('表示の切り替え case: スペックデータがある場合', () => {
    render(<Specview userData={equalObject} />);
    const message = screen.queryByText(
      'スペックシートが登録されてないよ！'
    );
    // 要素が存在しないことを確認
    expect(message).toBeNull();
  });
  it('表示の切り替え case: スペックデータがない場合', () => {
    render(<Specview userData={equalErrorObject} />);
    // "スキルが登録されてないよ！"というテキストが存在する要素を取得
    const message = screen.getByText(
      'スペックシートが登録されてないよ！'
    );
    // 要素が存在することを確認
    expect(message).toBeTruthy();
  });
  it('画像の表示 case:画像あり', () => {
    render(<Specview userData={equalObject} />);
    // 画像のaltテキストを使って要素を取得
    const imgElement = screen.getByAltText(
      'Picture of the architecture'
    );
    // 画像要素が存在することを確認
    expect(imgElement).toBeInTheDocument();
    expect(screen)
  });
  it('github value', () => {
    render(<Specview userData={equalObject} />);
    
    expect(screen.getByTestId('github').textContent).toBe('https://github.com/user');
  });
});
