import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import DbSales from '../pages/dashboard/DbSales';
import { autoComplete } from '../app/specseat/_lib/autoComplete';
// import AutoComplete from '@mui/material/Autocomplete';
// import React from 'react';

jest.mock('axios');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('../../app/specseat/_lib/autoComplete');

describe('DbSales', () => {
  let mockRouterPush = jest.fn();
  let mockData;

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: mockRouterPush,
    }));
    mockData = ['JavaScript', 'TypeScript'];

    autoComplete.mockImplementation(() => mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //APIを叩き、usernameを取得できるか及びページ遷移ができるのかのテスト
  it('fetches users on button click', async () => {
    // autoComplete.mockImplementation(() => mockData);
    const searchUser = 'Test User';
    const foundUser = { username: searchUser };
    //mockResolvedValueOnceは一度だけ動作するモック
    axios.get.mockResolvedValueOnce({ data: foundUser });

    const { getByPlaceholderText, getByTestId } = render(<DbSales />);

    const input =
      getByPlaceholderText('ユーザー名を入力してください');
    const button = getByTestId('search-button-1');

    await act(async () => {
      fireEvent.change(input, { target: { value: searchUser } });
      fireEvent.click(button);
    });

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/search/users`,
      {
        params: {
          userName: searchUser,
        },
      }
    );

    await waitFor(() =>
      expect(mockRouterPush).toHaveBeenCalledWith(
        `/searchResult/searchSales?foundUser=${encodeURIComponent(
          JSON.stringify(foundUser)
        )}`
      )
    );
  });

  //APIがエラーを返したときに適切に処理できるかのテスト
  it('handles error during search', async () => {
    const searchUser = 'Test User';
    const errorMessage = 'An error occurred';

    // axios.getのモックを設定してエラーをスロー
    axios.get.mockImplementationOnce(() => {
      throw new Error(errorMessage);
    });

    const { getByPlaceholderText, getByTestId } = render(<DbSales />);

    const input =
      getByPlaceholderText('ユーザー名を入力してください');
    const button = getByTestId('search-button-1');

    // console.errorをモックしてエラーメッセージをキャプチャ
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      fireEvent.change(input, { target: { value: searchUser } });
      fireEvent.click(button);
    });

    // console.errorが正しいエラーメッセージとともに呼び出されたことを確認
    expect(consoleSpy).toHaveBeenCalledWith(Error(errorMessage));

    // console.errorのモックをクリーンアップします
    consoleSpy.mockRestore();
  });

  //バリデーションメッセージが表示されるかのテスト
  it('displays validation message when search field is empty', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <DbSales />
    );

    const input =
      getByPlaceholderText('ユーザー名を入力してください');
    const button = getByTestId('search-button-1');

    await act(async () => {
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.click(button);
    });

    expect(axios.get).not.toHaveBeenCalled();
    expect(mockRouterPush).not.toHaveBeenCalled();

    await waitFor(
      () =>
        expect(
          getByText('ユーザー名を入力してください')
        ).toBeInTheDocument(),
      { timeout: 2000 }
    );
  });

  //handleAffiliationChange(期待した値（所属）が入力されているか)のテスト
  it('updates affiliation on radio button click', () => {
    const { getByLabelText, getByTestId } = render(<DbSales />);

    // FRのラジオボタンをクリック
    fireEvent.click(getByLabelText('FR'));
    // FRのラジオボタンが選択されていることを確認
    expect(getByLabelText('FR')).toBeChecked();

    // JAVAのラジオボタンをクリック
    fireEvent.click(getByLabelText('JAVA'));
    // JAVAのラジオボタンが選択されていることを確認
    expect(getByLabelText('JAVA')).toBeChecked();
    // FRのラジオボタンが選択されていないことを確認
    expect(getByLabelText('FR')).not.toBeChecked();

    // QAのラジオボタンをクリック
    fireEvent.click(getByLabelText('QA'));
    // QAのラジオボタンが選択されていることを確認
    expect(getByLabelText('QA')).toBeChecked();
    // JAVAのラジオボタンが選択されていないことを確認
    expect(getByLabelText('JAVA')).not.toBeChecked();

    // MLのラジオボタンをクリック
    fireEvent.click(getByLabelText('ML'));
    // MLのラジオボタンが選択されていることを確認
    expect(getByLabelText('ML')).toBeChecked();
    // QAのラジオボタンが選択されていないことを確認
    expect(getByLabelText('QA')).not.toBeChecked();

    // CLのラジオボタンをクリック
    fireEvent.click(getByLabelText('CL'));
    // CLのラジオボタンが選択されていることを確認
    expect(getByLabelText('CL')).toBeChecked();
    // MLのラジオボタンが選択されていないことを確認
    expect(getByLabelText('ML')).not.toBeChecked();

    // PHPのラジオボタンをクリック
    fireEvent.click(getByTestId('radio-PHP'));
    // PHPのラジオボタンが選択されていることを確認
    expect(getByTestId('radio-PHP')).toBeChecked();
    // CLのラジオボタンが選択されていないことを確認
    expect(getByLabelText('CL')).not.toBeChecked();
  });

  //handleSkillSummaryChange関数のテスト
  it('updates skillSummary on checkbox change', async () => {
    // 初期状態をレンダリングします
    const { getByLabelText } = render(<DbSales />);

    // affiliation を 'FR' に設定するための操作
    // FRのラジオボタンをクリック
    fireEvent.click(getByLabelText(['FR']));
    // FRのラジオボタンが選択されていることを確認
    expect(getByLabelText(['FR'])).toBeChecked();

    // 'JavaScript' のチェックボックスをクリックします
    fireEvent.click(getByLabelText(['JavaScript']));
    // 'JavaScript' がクリックされているかを確認
    expect(getByLabelText(['JavaScript'])).toBeChecked();

    // 'JavaScript' のチェックボックスを再度クリックしてチェックを外します
    fireEvent.click(getByLabelText(['JavaScript']));
    // チェックが外されているかを確認
    expect(getByLabelText(['JavaScript'])).not.toBeChecked();

    // 'TypeScript' のチェックボックスをクリックします
    fireEvent.click(getByLabelText(['TypeScript']));
    //'TypeScript' がクリックされているかを確認
    expect(getByLabelText(['TypeScript'])).toBeChecked();
    // 'TypeScript' のチェックボックスを再度クリックしてチェックを外します
    fireEvent.click(getByLabelText(['TypeScript']));
    // チェックが外されているかを確認
    expect(getByLabelText(['TypeScript'])).not.toBeChecked();
    expect(getByLabelText(['JavaScript'])).not.toBeChecked();
  });

  //業務形態のラジオボタン（アサイン中と待機中）をクリックした時のUIの確認
  it('updates businessSituation on radio button click', () => {
    // 初期状態をレンダリングします
    const { getByLabelText } = render(<DbSales />);

    // '待機中' のラジオボタンをクリックします
    fireEvent.click(getByLabelText('待機中'));
    // '待機中' のラジオボタンが選択されていることを確認します
    expect(getByLabelText('待機中')).toBeChecked();

    // 'アサイン中' のラジオボタンをクリックします
    fireEvent.click(getByLabelText('アサイン中'));
    // 'アサイン中' のラジオボタンが選択されていることを確認します
    expect(getByLabelText('アサイン中')).toBeChecked();
    // '待機中' のラジオボタンが選択されていないことを確認します
    expect(getByLabelText('待機中')).not.toBeChecked();
  });

  //handleChange関数のテストケース（APIを叩き、ページ遷移ができるのかのテスト）
  it('executes search on button click and navigates to result page', async () => {
    // mock response from API
    // autoComplete.mockImplementation(() => mockData);
    const foundUser = { username: 'Test User' };
    axios.get.mockResolvedValueOnce({ data: foundUser });

    const { getByTestId, getByLabelText } = render(<DbSales />);

    // FRのラジオボタンをクリック
    fireEvent.click(getByLabelText('FR'));
    // '待機中' のラジオボタンをクリックします
    fireEvent.click(getByLabelText('待機中'));
    // 'JavaScript' チェックボックスをクリックします
    fireEvent.click(getByLabelText(['JavaScript']));

    const searchButton = getByTestId('search-button-2');
    await act(async () => {
      fireEvent.click(searchButton);
    });

    // APIが呼び出されていることを確認
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/search/integration`,
      {
        params: {
          affiliation: 'FR',
          businessSituation: '待機中',
          skillSummary: 'JavaScript',
        },
      }
    );
    // ページ遷移が行われていることを確認
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/searchResult/searchSales?foundUser=${encodeURIComponent(
        JSON.stringify(foundUser)
      )}`
    );
  });

  // API呼び出し中にエラーが発生したときの処理をテスト
  it('handles error during integration search', async () => {
    const errorMessage = 'API Error';
    const errorObject = new Error(errorMessage);
    axios.get.mockImplementationOnce(() => Promise.reject(errorObject));

    // axios.get.mockImplementationOnce(() => {
    //   throw errorObject;
    // });
    const originalError = console.error;
    const consoleSpy = jest.spyOn(console, 'error');
    console.error = jest.fn(); // Override console.error




    const { getByTestId, getByLabelText } = render(<DbSales />);

    // 検索条件を設定
    // チェックボックスをクリック
    fireEvent.click(getByLabelText('FR'));
    // ラジオボタンをクリック
    fireEvent.click(getByLabelText('待機中'));
    // チェックボックスをクリック
    fireEvent.click(getByLabelText(['JavaScript']));

    const searchButton = getByTestId('search-button-2');
    expect(searchButton).toBeInTheDocument(); // ボタンが存在することを確認

    await act(async () => {
      fireEvent.click(searchButton);
    });
    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(console.error).toHaveBeenCalledWith( errorObject);

    consoleSpy.mockRestore();
    console.error = originalError;
  });

  //何も選択されていないときに検索するボタンがクリックされた際、バリデーションメッセージが表示されるかのテスト
  it('shows validation message when no search parameters selected', async () => {
    const { getByTestId, getByText } = render(<DbSales />);

    const searchButton = getByTestId('search-button-2');
    await act(async () => {
      fireEvent.click(searchButton);
    });

    // APIが呼び出されていないことを確認
    expect(axios.get).not.toHaveBeenCalled();

    // バリデーションメッセージが表示されていることを確認
    expect(
      getByText('検索条件が選択されていません')
    ).toBeInTheDocument();
  });

  // it("should change value to <AutoComplete> by selecting on controlled mode", async () => {
  //   const Test = () => {
  //     const [value, setValue] = React.useState("");
  //     const handleChange = (event, newValue) => {
  //       setValue(newValue);
  //     };
  //     return (
  //       <AutoComplete
  //         options={["ab", "abc", "abcd"]}
  //         open={true}
  //         value={value}
  //         onChange={handleChange}
  //       />
  //     );
  //   };
  //   render(<Test />);
  //   fireEvent.change(screen.getByRole("textbox"), { target: { value: "a" } });
  //   await waitFor(() => screen.getByText("abc"));
  //   fireEvent.click(screen.getByText("abc"));
  //   expect(screen.getByRole("textbox")).toHaveTextContent("abc");
  // });
});
