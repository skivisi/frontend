import {
  screen,
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import DevelopmentExperiences from './DevelopmentExperiences';
import DevExAutoComplete from './DevExAutoComplete';

// Jest を使った Image コンポーネントのモック化
jest.mock('next/image', () => {
  return function MockDevExAutoComplete() {
    return <div>Mock IMG</div>;
  };
});
jest.mock('./DevExAutoComplete');

describe('DevelopmentExperiences', () => {
  let mockHandleRemove, mockHandleChange, mockHandleEdit;
  let dummyData = {
    assignedTask: '1',
    developmentExperienceId: 131,
    duration: 'あ',
    environments: ['Windows', 'Mac OS', 'Linux'],
    frameworks: ['Express.js', 'ASP.NET', 'Laravel'],
    img: 'ponsuke-3322.JPG',
    jobDuties: 'ああああ？',
    programmingLanguages: ['HTML', 'Ruby'],
    projectName: '4',
    specId: 80,
    startDate: '6',
    startYear: '2016',
    teamSize: '2dfgh',
    tools: ['Kubernetes', 'Bitbucket'],
    totalProjectHeadcount: '3',
  };
  let dummyAutocomplete = {
    assignedDevelopment: [2, 3],
    autoCalibration: [2, 3],
    cloud: [2, 3],
    framework: [2, 3],
    lang: [2, 3],
    library: [2, 3],
    os: [2, 3],
    tool: [2, 3],
  };
  const mockRenderFiles = ['file1', 'file2', 'file3'];

  beforeEach(() => {
    mockHandleRemove = jest.fn();
    mockHandleChange = jest.fn();
    mockHandleEdit = jest.fn();
  });

  it('削除ボタンの存在証明,呼び出し確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleRemove={mockHandleRemove}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
        userData={{ developmentExperience: [] }}
      />
    );
    const button = screen.getByTestId('remove-button'); // getByTestIdを使ってボタンを取得
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(mockHandleRemove).toHaveBeenCalled();
  });

  it('開始年の入力フィールドが存在し、値変更に伴う関数呼び出しの確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
      />
    );
    fireEvent.change(screen.getByLabelText('開始年'), {
      target: { value: '2022' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  // Other tests like the above one...
  // 開始月に対するテスト
  it('開始月の入力フィールドが存在し、値変更に伴う関数呼び出しの確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
      />
    );
    fireEvent.change(screen.getByLabelText('開始月'), {
      target: { value: '6' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  // 期間に対するテスト
  it('期間の入力フィールドが存在し、値変更に伴う関数呼び出しの確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
      />
    );
    fireEvent.change(screen.getByLabelText('期間'), {
      target: { value: '12' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  // 担当役割に対するテスト
  it('担当役割の入力フィールドが存在し、値変更に伴う関数呼び出しの確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
      />
    );
    fireEvent.change(screen.getByLabelText('担当役割'), {
      target: { value: 'Engineer' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  // チーム人数に対するテスト
  it('チーム人数の入力フィールドが存在し、値変更に伴う関数呼び出しの確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
      />
    );
    fireEvent.change(screen.getByLabelText('チーム人数'), {
      target: { value: '5' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  // PJ全体人数に対するテスト
  it('PJ全体人数の入力フィールドが存在し、値変更に伴う関数呼び出しの確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
      />
    );
    fireEvent.change(screen.getByLabelText('PJ全体人数'), {
      target: { value: '10' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  // プロジェクト名に対するテスト
  it('プロジェクト名の入力フィールドが存在し、値変更に伴う関数呼び出しの確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
      />
    );
    fireEvent.change(screen.getByLabelText('プロジェクト名'), {
      target: { value: 'Project A' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  // 業務内容に対するテスト
  it('業務内容の入力フィールドが存在し、値変更に伴う関数呼び出しの確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
      />
    );
    fireEvent.change(screen.getByLabelText('業務内容'), {
      target: { value: 'Developing web application' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });
  it('アーキテクチャの入力フィールドが存在し、値変更に伴う関数呼び出しの確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
      />
    );
    fireEvent.change(screen.getByLabelText('アーキテクチャ'), {
      target: { file: mockRenderFiles[0] },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('handleEdit関数の呼び出し確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleChange={mockHandleChange}
        handleEdit={mockHandleEdit}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
      />
    );
    fireEvent.change(screen.getByLabelText('開始年'), {
      target: { value: '2022' },
    });
    expect(mockHandleEdit).toHaveBeenCalled();
    expect(mockHandleChange).not.toHaveBeenCalled();
  });

  it('handleChange関数の呼び出し確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
      />
    );
    fireEvent.change(screen.getByLabelText('開始年'), {
      target: { value: '2022' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('入力フィールドの初期値が対応するdevelopmentExperienceのプロパティであることを確認', () => {
    render(
      <DevelopmentExperiences
        developmentExperience={dummyData}
        index={0}
        handleRemove={mockHandleRemove}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
        userData={{ developmentExperience: [] }}
      />
    );

    let input;

    input = screen.getByTestId('startYear-input');
    expect(input.value).toBe('2016');
    input = screen.getByTestId('startDate-input');
    expect(input.value).toBe('6');
    input = screen.getByTestId('duration-input');
    expect(input.value).toBe('あ');
    input = screen.getByTestId('assignedTask-input');
    expect(input.value).toBe('1');
    input = screen.getByTestId('teamSize-input');
    expect(input.value).toBe('2dfgh');
    input = screen.getByTestId('totalProjectHeadcount-input');
    expect(input.value).toBe('3');
    input = screen.getByTestId('projectName-input');
    expect(input.value).toBe('4');
    input = screen.getByTestId('jobDuties-input');
    expect(input.value).toBe('ああああ？');

    cleanup();

    // シナリオ2: developmentExperienceの各プロパティが偽の場合
    const mockData2 = {
      ...dummyData,
      startYear: '',
      startDate: '',
      duration: '',
      assignedTask: '',
      teamSize: '',
      totalProjectHeadcount: '',
      projectName: '',
      jobDuties: '',
      img: '',
    };
    render(
      <DevelopmentExperiences
        developmentExperience={mockData2}
        index={0}
        handleRemove={mockHandleRemove}
        handleChange={mockHandleChange}
        autocomplete={dummyAutocomplete}
        renderFiles={mockRenderFiles}
        userData={{ developmentExperience: [] }}
      />
    );
    input = screen.getByTestId('startYear-input');
    expect(input.value).toBe('2010');
    input = screen.getByTestId('startDate-input');
    expect(input.value).toBe('1');
    input = screen.getByTestId('duration-input');
    expect(input.value).toBe('');
    input = screen.getByTestId('assignedTask-input');
    expect(input.value).toBe('');
    input = screen.getByTestId('teamSize-input');
    expect(input.value).toBe('');
    input = screen.getByTestId('totalProjectHeadcount-input');
    expect(input.value).toBe('');
    input = screen.getByTestId('projectName-input');
    expect(input.value).toBe('');
    input = screen.getByTestId('jobDuties-input');
    expect(input.value).toBe('');
  });

  it('DevExAutoCompleteコンポーネントのレンダリングとvalueの設定をテスト', () => {
    // シナリオ1: 各autocompleteプロパティが存在し、対応するdevelopmentExperienceプロパティが存在する場合
    let autocomplete = {
      os: ['Mac OS', 'Windows'],
      lang: ['JavaScript', 'TypeScript'],
      framework: ['React', 'Vue.js'],
      tool: ['VSCode', 'IntelliJ'],
    };
    let developmentExperience = {
      environments: ['Mac OS'],
      programmingLanguages: ['JavaScript'],
      frameworks: ['React'],
      tools: ['VSCode'],
    };

    DevExAutoComplete.mockImplementation(
      ({ value, options, placeholder }) =>
        options ? (
          <input
            type="text"
            value={value ? value : ''}
            placeholder={placeholder}
          />
        ) : null
    );

    render(
      <DevelopmentExperiences
        autocomplete={autocomplete}
        developmentExperience={developmentExperience}
        index={0}
        handleEdit={mockHandleEdit}
        renderFiles={mockRenderFiles}
        userData={{ developmentExperience: [] }}
      />
    );

    // 環境
    let autoCompleteComponent = screen.getByPlaceholderText('Mac OS');
    expect(autoCompleteComponent).toBeInTheDocument();
    expect(autoCompleteComponent.value).toEqual('Mac OS');

    // プログラミング言語
    autoCompleteComponent = screen.getByPlaceholderText('TypeScript');
    expect(autoCompleteComponent).toBeInTheDocument();
    expect(autoCompleteComponent.value).toEqual('JavaScript');

    // フレームワーク
    autoCompleteComponent = screen.getByPlaceholderText('Vue.js');
    expect(autoCompleteComponent).toBeInTheDocument();
    expect(autoCompleteComponent.value).toEqual('React');

    // ツール
    autoCompleteComponent = screen.getByPlaceholderText('vscode');
    expect(autoCompleteComponent).toBeInTheDocument();
    expect(autoCompleteComponent.value).toEqual('VSCode');

    cleanup();

    // シナリオ2: 各autocompleteプロパティが存在しない場合
    autocomplete = {
      os: null,
      lang: null,
      framework: null,
      tool: null,
    };

    DevExAutoComplete.mockImplementation(
      ({ value, options, placeholder }) =>
        options ? (
          <input
            type="text"
            value={value ? value : ''}
            placeholder={placeholder}
          />
        ) : null
    );

    render(
      <DevelopmentExperiences
        autocomplete={autocomplete}
        developmentExperience={developmentExperience}
        index={0}
        handleEdit={mockHandleEdit}
        renderFiles={mockRenderFiles}
        userData={{ developmentExperience: [] }}
      />
    );

    autoCompleteComponent = screen.queryByPlaceholderText('Mac OS');
    expect(autoCompleteComponent).not.toBeInTheDocument();

    autoCompleteComponent =
      screen.queryByPlaceholderText('TypeScript');
    expect(autoCompleteComponent).not.toBeInTheDocument();

    autoCompleteComponent = screen.queryByPlaceholderText('Vue.js');
    expect(autoCompleteComponent).not.toBeInTheDocument();

    autoCompleteComponent = screen.queryByPlaceholderText('vscode');
    expect(autoCompleteComponent).not.toBeInTheDocument();

    cleanup();

    // シナリオ3: 各developmentExperienceプロパティが存在しない場合
    autocomplete = {
      os: ['Mac OS', 'Windows'],
      lang: ['JavaScript', 'TypeScript'],
      framework: ['React', 'Vue.js'],
      tool: ['VSCode', 'IntelliJ'],
    };
    developmentExperience = {
      environments: null,
      programmingLanguages: null,
      frameworks: null,
      tools: null,
    };

    DevExAutoComplete.mockImplementation(
      ({ value, options, placeholder }) =>
        options ? (
          <input
            type="text"
            value={value ? value : ''}
            placeholder={placeholder}
          />
        ) : null
    );

    render(
      <DevelopmentExperiences
        autocomplete={autocomplete}
        developmentExperience={developmentExperience}
        index={0}
        handleEdit={mockHandleEdit}
        renderFiles={mockRenderFiles}
        userData={{ developmentExperience: [] }}
      />
    );

    // 環境
    autoCompleteComponent = screen.getByPlaceholderText('Mac OS');
    expect(autoCompleteComponent).toBeInTheDocument();
    expect(autoCompleteComponent.value).toEqual('');

    // プログラミング言語
    autoCompleteComponent = screen.getByPlaceholderText('TypeScript');
    expect(autoCompleteComponent).toBeInTheDocument();
    expect(autoCompleteComponent.value).toEqual('');

    // フレームワーク
    autoCompleteComponent = screen.getByPlaceholderText('Vue.js');
    expect(autoCompleteComponent).toBeInTheDocument();
    expect(autoCompleteComponent.value).toEqual('');

    // ツール
    autoCompleteComponent = screen.getByPlaceholderText('vscode');
    expect(autoCompleteComponent).toBeInTheDocument();
    expect(autoCompleteComponent.value).toEqual('');
  });
});
