import {
  render,
  waitFor,
  fireEvent,
  screen,
} from '@testing-library/react';
import { userFetch } from '../mypage/_lib/userFetch';
import Page from './page';
import SkillScores from '../../components/skilledit/SkillScores';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios;

jest.mock('../mypage/_lib/userFetch');

let mockUserData;

beforeEach(() => {
  mockUserData = {
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
      AR: 9,
      BK: 8,
      COM: 7,
      DB: 6,
      FR: 5,
      SBR: 4,
      TS: 3,
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
      { skillList: '予知能力', skillSelection: false, tagColor: 1 },
      {
        skillList: 'テックリード',
        skillSelection: true,
        tagColor: 2,
      },
      { skillList: 'vim職人', skillSelection: false, tagColor: 2 },
      { skillList: 'shell芸人', skillSelection: true, tagColor: 3 },
      {
        skillList: '超ポジティブ',
        skillSelection: false,
        tagColor: 3,
      },
      { skillList: '遅刻魔', skillSelection: true, tagColor: 1 },
      { skillList: '気分屋', skillSelection: false, tagColor: 1 },
      { skillList: '新人', skillSelection: true, tagColor: 2 },
      { skillList: 'お喋り野郎', skillSelection: false, tagColor: 1 },
      { skillList: 'ガヤ', skillSelection: true, tagColor: 3 },
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
  // userFetch関数のモック化を修正
  // Promise.resolveを使用せず、直接オブジェクトを返すように変更
  userFetch.mockImplementation(() => mockUserData);
});

afterEach(() => {
  jest.clearAllMocks();
});


describe('skilledit', () => {
  //useEffect内の条件分岐でデータ全て有りの場合のテストケース
  test('the initial state is set correctly', async () => {
    userFetch.mockImplementation(() => mockUserData);
    const userData = await userFetch();
    render(<Page />);
    expect(screen.getByTestId('titles').value).toBe(
      userData.skill.InherentName
    );
    expect(screen.getByTestId('content').textContent).toBe(
      userData.skill.InherentDescription
    );
    //specialAbilityの表示のテストケース
    const skills = userData.specialAbility;
    for (const skill of skills) {
      const skillNode = screen.getByText(skill.skillList);
      // スキルが選択されていない場合（skillSelectionがfalseの場合）は'unselected'クラスを持つ
      if (skill.skillSelection === false) {
        expect(skillNode).toHaveClass(
          'w-32 text-center m-1 bg-zinc-300 border-4 border-zinc-400 rounded-xl p-1 font-bold text-zinc-400'
        );
      } else {
        // スキルが選択されており、タグ色によって異なるクラスを持つ
        switch (skill.tagColor) {
          case 1:
            expect(skillNode).toHaveClass(
              'w-32 text-center m-1 bg-rose-300 border-4 border-rose-400 rounded-xl p-1 font-bold text-rose-800'
            );
            break;
          case 2:
            expect(skillNode).toHaveClass(
              'w-32 text-center m-1 bg-sky-300 border-4 border-sky-400 rounded-xl p-1 font-bold text-sky-800'
            );
            break;
          case 3:
            expect(skillNode).toHaveClass(
              'w-32 text-center m-1 bg-green-300 border-4 border-green-400 rounded-xl p-1 font-bold text-green-800'
            );
            break;
        }
      }
    }
  });

  //データ全て有りの場合のskillPointの表示のテストケース
  const skillScores = [
    { tag: 'FR', name: 'フロントエンド', point: 9 },
    { tag: 'BK', name: 'バックエンド', point: 8 },
    { tag: 'DB', name: 'データベース', point: 7 },
    { tag: 'SBR', name: 'サーバーレス', point: 6 },
    { tag: 'AR', name: '設計', point: 5 },
    { tag: 'TS', name: 'テスト', point: 4 },
    { tag: 'COM', name: 'コミュニケーション', point: 3 },
  ];

  for (const skillScore of skillScores) {
    test(`renders SkillScores component with correct props for ${skillScore.name}`, () => {
      mockUserData.skillPoint = undefined;
      userFetch.mockImplementation(() => mockUserData);
      const mockSetSkills = jest.fn();
      const mockSkillPoint = { [skillScore.tag]: skillScore.point };

      render(
        <SkillScores
          skillTag={skillScore.tag}
          skillName={skillScore.name}
          skillPoint={mockSkillPoint}
          setSkills={mockSetSkills}
        />
      );

      // スキル名が正しく表示されていることを確認
      expect(screen.getByText(skillScore.name)).toBeInTheDocument();

      // スキルポイントが正しく表示されていることを確認
      expect(
        screen.getByText(String(skillScore.point))
      ).toBeInTheDocument();
    });
  }

  //useEffect内の条件分岐でspecialAbilities.length == 0の時のテストケース
  test('defaultSkillPoint and defaultAbilities are set correctly when specialAbilities.length is 0', async () => {
    // specialAbilitiesを空配列に設定
    mockUserData.specialAbility = [];
    userFetch.mockImplementation(() => mockUserData);

    render(<Page />);

    // specialAbilitiesの長さが0の場合、defaultAbilitiesが設定されることを検証
    // defaultAbilitiesの各スキルが存在することを確認
    const skills = [
      '予知能力',
      'テックリード',
      'vim職人',
      'shell芸人',
      '超ポジティブ',
      '遅刻魔',
      '気分屋',
      '新人',
      'お喋り野郎',
      'ガヤ',
    ];
    for (const skill of skills) {
      //指定されたテキストを含む要素をskilledit.tsxの中から検索
      expect(screen.getByText(skill)).toBeInTheDocument();
      // getByTextでskillの配列の値と一致したskills.abilitiesのオブジェクトを取得
      const skillNode = screen.getByText(skill);
      //スキルが選択されていない場合（skillSelectionがfalseの場合）は'unselected'クラスを持つ（unselected ='w-32 text-center m-1 bg-zinc-300 border-4 border-zinc-400 rounded-xl p-1 font-bold text-zinc-400'）
      expect(skillNode).toHaveClass(
        'w-32 text-center m-1 bg-zinc-300 border-4 border-zinc-400 rounded-xl p-1 font-bold text-zinc-400'
      );
    }
  });

  //useEffect内の条件分岐でtypeof skillPoint == 'undefined'の時のskillPointのテストケース
  const testSkillScores = [
    { tag: 'FR', name: 'フロントエンド', point: null },
    { tag: 'BK', name: 'バックエンド', point: null },
    { tag: 'DB', name: 'データベース', point: null },
    { tag: 'SBR', name: 'サーバーレス', point: null },
    { tag: 'AR', name: '設計', point: null },
    { tag: 'TS', name: 'テスト', point: null },
    { tag: 'COM', name: 'コミュニケーション', point: null },
  ];

  for (const skillScore of testSkillScores) {
    test(`renders SkillScores component with correct props for ${skillScore.name}`, () => {
      mockUserData.skillPoint = undefined;
      userFetch.mockImplementation(() => mockUserData);
      const mockSetSkills = jest.fn();
      const mockSkillPoint = { [skillScore.tag]: skillScore.point };

      render(
        <SkillScores
          skillTag={skillScore.tag}
          skillName={skillScore.name}
          skillPoint={mockSkillPoint}
          setSkills={mockSetSkills}
        />
      );

      // スキル名が正しく表示されていることを確認
      expect(screen.getByText(skillScore.name)).toBeInTheDocument();

      // skillPoint が null の場合にラジオボタンが選択されていないことを確認
      const radioButtons = screen.getAllByRole('radio');
      for (const radioButton of radioButtons) {
        expect(radioButton).not.toBeChecked();
      }
    });
  }

  // 特有スキルの編集テスト
  test('handleChangeInherent correctly updates the title and content based on formIndex', () => {
    // userFetch.mockImplementation(() => mockUserData);
    render(<Page />);

    // タイトル入力欄のテスト
    const titleInput = screen.getByTestId('titles');
    fireEvent.change(titleInput, { target: { value: 'New title' } });
    expect(screen.getByTestId('titles').value).toBe('New title');

    // 内容入力欄のテスト
    const contentInput = screen.getByTestId('content');
    fireEvent.change(contentInput, {
      target: { value: 'New content' },
    });
    expect(screen.getByTestId('content').textContent).toBe(
      'New content'
    );
  });

  // スペシャルスキルの選択状態切り替えテスト
  test('handleChangeAbilities correctly toggles the selection state of all special skills', async () => {
    userFetch.mockImplementation(() => mockUserData);
    const userData = await userFetch();
    render(<Page />);

    for (const skill of userData.specialAbility) {
      // specialAbility.skillListの要素を取得
      const skillNode = screen.getByText(skill.skillList);

      // specialAbilityの選択状態を取得
      const skillSelection = skill.skillSelection;

      // specialAbilityをクリック
      fireEvent.click(skillNode);

      // specialAbilityの選択状態が正しく反転したことを確認
      if (skillSelection === true) {
        expect(skillNode).toHaveClass(
          'w-32 text-center m-1 bg-zinc-300 border-4 border-zinc-400 rounded-xl p-1 font-bold text-zinc-400'
        );
      } else {
        switch (skill.tagColor) {
          case 1:
            expect(skillNode).toHaveClass(
              'w-32 text-center m-1 bg-rose-300 border-4 border-rose-400 rounded-xl p-1 font-bold text-rose-800'
            );
            break;
          case 2:
            expect(skillNode).toHaveClass(
              'w-32 text-center m-1 bg-sky-300 border-4 border-sky-400 rounded-xl p-1 font-bold text-sky-800'
            );
            break;
          case 3:
            expect(skillNode).toHaveClass(
              'w-32 text-center m-1 bg-green-300 border-4 border-green-400 rounded-xl p-1 font-bold text-green-800'
            );
            break;
        }
      }

      // スキルを再度クリックして元に戻す（次のスキルのテストに影響を与えないようにするため）
      fireEvent.click(skillNode);
    }
  });

  //`/skill/postSkillData/`にPOSTして200が返ってくるかのテストケース
  test('post request and redirection when userData.skill is undefined', async () => {
    // userFetchがskillプロパティがundefinedのuserDataを返すようにモックを設定
    userFetch.mockImplementation(() => ({
      ...mockUserData,
      skill: undefined,
    }));

    const mockFormData = {
      InherentName: 'Some name',
      InherentDescription: 'Some description',
      FR: mockUserData.skillPoint.FR,
      BK: mockUserData.skillPoint.BK,
      DB: mockUserData.skillPoint.DB,
      SBR: mockUserData.skillPoint.SBR,
      AR: mockUserData.skillPoint.AR,
      TS: mockUserData.skillPoint.TS,
      COM: mockUserData.skillPoint.COM,
      abilities: mockUserData.specialAbility,
    };

    // window.location.hrefをモックする
    delete window.location;
    window.location = { href: '' };

    // フォームの送信が成功したときのaxios.postのモック
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    render(<Page />);
    // InherentNameとInherentDescriptionの入力フィールドを取得して値を入力
    const inherentNameInput = screen.getByTestId('titles');
    const inherentDescriptionInput = screen.getByTestId('content');
    fireEvent.change(inherentNameInput, {
      target: { value: 'Some name' },
    });
    fireEvent.change(inherentDescriptionInput, {
      target: { value: 'Some description' },
    });

    // submitボタンを取得
    const submitButton = screen.getByRole('button', {
      name: /登録/i,
    });

    // submitボタンをクリック
    fireEvent.click(submitButton);

    await waitFor(() => {
      // axios.postが適切なエンドポイントとデータで呼び出されたことを確認
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/skill/postSkillData/${mockUserData.userId}`,
        mockFormData
      );

      // リダイレクトが/mypageに行われたことを確認
      expect(window.location.href).toBe('/mypage');
    });
  });

  //`/skill/update/`にPUTして200が返ってくるかのテストケース
  test('put request and redirection when userData.skill is not undefined', async () => {
    // userFetchがskillプロパティを持つuserDataを返すようにモックを設定
    userFetch.mockImplementation(() => mockUserData);

    const mockFormData = {
      InherentName: mockUserData.skill.InherentName,
      InherentDescription: mockUserData.skill.InherentDescription,
      FR: mockUserData.skillPoint.FR,
      BK: mockUserData.skillPoint.BK,
      DB: mockUserData.skillPoint.DB,
      SBR: mockUserData.skillPoint.SBR,
      AR: mockUserData.skillPoint.AR,
      TS: mockUserData.skillPoint.TS,
      COM: mockUserData.skillPoint.COM,
      abilities: mockUserData.specialAbility,
    };

    // window.location.hrefをモックする
    delete window.location;
    window.location = { href: '' };

    // フォームの送信が成功したときのaxios.putのモック
    mockedAxios.put.mockResolvedValueOnce({ status: 200 });

    render(<Page />);

    // submitボタンを取得
    const submitButton = screen.getByRole('button', {
      name: /登録/i,
    });

    // submitボタンをクリック
    fireEvent.click(submitButton);

    await waitFor(() => {
      // axios.putが適切なエンドポイントとデータで呼び出されたことを確認
      expect(mockedAxios.put).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/skill/update/${mockUserData.userId}`,
        mockFormData
      );

      // リダイレクトが/mypageに行われたことを確認
      expect(window.location.href).toBe('/mypage');
    });
  });


  // SkillScoresのhandleChange関数のテスト（引数の値を元に正しく`skills`の値が更新されているか）
  // 194行目で定義した変数skillScoresを使用
for (const skillScore of skillScores) {
  test(`handleChange updates the skill score for ${skillScore.name}`, () => {
    userFetch.mockImplementation(() => mockUserData);
    const mockSetSkills = jest.fn();

    // SkillScoresコンポーネントをレンダリング
    render(
      <SkillScores
        skillTag={skillScore.tag}
        skillName={skillScore.name}
        skillPoint={mockUserData.skillPoint}
        setSkills={mockSetSkills}
      />
    );

    // スキルスコアのラジオボタンを取得し、新しい値を設定する
    const newScore = (skillScore.point % 9) + 1;  // 新しいスコアを計算（1から9の間で、現在のスコアと異なる値）
    const radioButton = screen.getByLabelText(String(newScore));
    fireEvent.click(radioButton);

    // setSkillsが正しく呼び出されていることを確認
    expect(mockSetSkills).toHaveBeenCalled();

    // 引数として渡された関数（setSkillsの引数）を実行して、
    // スキルポイントが正しく更新されることを確認
    //mockSetSkills.mock.calls[0][0]でsetSkills関数を呼び出し、updateFunctionという新しい変数に代入
    const updateFunction = mockSetSkills.mock.calls[0][0];
    const newSkills = updateFunction(mockUserData);
    console.log(newSkills.skillPoint[skillScore.tag]);
    expect(newSkills.skillPoint[skillScore.tag]).toBe(newScore);
  });
}
});
