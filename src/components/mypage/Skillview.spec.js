import { screen, render } from '@testing-library/react';
import Skillview from './Skillview';

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
  test('convertValueToRank関数の動作確認', () => {
    const convertValueToRank = (value) => {
      if (value >= 9) {
        return 'S';
      } else if (value < 9 && value >= 8) {
        return 'A';
      } else if (value < 8 && value >= 6) {
        return 'B';
      } else if (value < 6 && value >= 5) {
        return 'C';
      } else if (value < 5 && value >= 4) {
        return 'D';
      } else if (value < 4 && value >= 3) {
        return 'E';
      } else if (value === 2) {
        return 'F';
      } else {
        return 'G';
      }
    };
    const result9 = convertValueToRank(9);
    expect(result9).toBe('S');
    const result8 = convertValueToRank(8);
    expect(result8).toBe('A');
    const result7 = convertValueToRank(7);
    expect(result7).toBe('B');
    const result6 = convertValueToRank(6);
    expect(result6).toBe('B');
    const result5 = convertValueToRank(5);
    expect(result5).toBe('C');
    const result4 = convertValueToRank(4);
    expect(result4).toBe('D');
    const result3 = convertValueToRank(3);
    expect(result3).toBe('E');
    const result2 = convertValueToRank(2);
    expect(result2).toBe('F');
    const result1 = convertValueToRank(1);
    expect(result1).toBe('G');
  });
  it('表示の切り替え case: スキルデータがある場合', () => {
    render(<Skillview userData={equalObject} />);
    const message = screen.queryByText('スキルが登録されてないよ！');
    // 要素が存在しないことを確認
    expect(message).toBeNull();
  });
  it('表示の切り替え case: スキルデータがない場合', () => {
    render(<Skillview userData={equalErrorObject} />);
    // "スキルが登録されてないよ！"というテキストが存在する要素を取得
    const message = screen.getByText('スキルが登録されてないよ！');
    // 要素が存在することを確認
    expect(message).toBeTruthy();
  });
  it('アサイン', () => {
    render(
      <Skillview
        userData={{
          specialAbility: [
            {
              skillList: 'Some skill list',
            },
          ],
          user: {
            businessSituation: 'アサイン中',
          },
        }}
      />
    );
    const message = screen.getByText('エントリー');
    expect(message).toBeTruthy();
  });
  it('アサイン', () => {
    render(
      <Skillview
        userData={{
          specialAbility: [
            {
              skillList: 'Some skill list',
            },
          ],
          user: {
            businessSituation: '待機中',
          },
        }}
      />
    );
    const message = screen.getByText('待機中');
    expect(message).toBeTruthy();
  });
  it('correctly transforms skill scores to ranks and displays them', () => {
    render(
        <Skillview
        userData={{
          specialAbility: [
            {
              skillList: 'Some skill list',
            },
          ],
          user: {
            businessSituation: '待機中',
          },
          skillPoint: {
            FR: 9, // これは'S'に変換されるべき
            BK: 8, // これは'A'に変換されるべき
            DB: 6, // これは'B'に変換されるべき
            SBR: 5, // これは'C'に変換されるべき
            AR: 4, // これは'D'に変換されるべき
            TS: 2, // これは'F'に変換されるべき
            COM: 1, // これは'G'に変換されるべき
          },
        }}
      />
    );
    // 各スキルが正しくランクに変換されて表示されていることを確認します
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    // expect(screen.getByText('E')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
    expect(screen.getByText('G')).toBeInTheDocument();
  });
});
