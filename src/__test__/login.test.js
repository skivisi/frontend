import Login from '../pages/login';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');

describe('Test Login', () => {
  test('render form with 1 button', () => {
    render(<Login />);
    const buttonList = screen.getAllByRole('button');
    expect(buttonList).toHaveLength(1);
  });
});

describe('Login API', () => {
    // 各テストケースの前に実行される共通の処理を定義
  beforeEach(() => {
    // axiosのリクエストをモックする
    jest.resetAllMocks();
  });

  test('should handle successful login', async () => {
    // axiosのモックを設定する
    await axios.post.mockResolvedValue({
      status: 200,
      data: {
        userId: 1,
        affiliation: 'FR',
      },
    });

    const originalLocation = window.location;
    delete window.location;
    window.location = {
      href: '',
    }

    render(<Login />);

    // フォームの入力値を設定する
    fireEvent.change(screen.getByPlaceholderText('メールアドレス'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('パスワード'), {
      target: { value: 123123123 },
    });

    // ログインをクリック
    fireEvent.click(screen.getByText('ログイン'));

    // ログインが成功し、リダイレクトが行われたことを検証する(非同期の操作が完了するまで待機)
    await waitFor(() => {
      expect(window.location.href).toBe('/dashboard/dbSales');
    });

    // window.locationを復元(テストの他の部分に影響を与えないようにする)
    window.location = originalLocation;
  });

  //   test('should handle failed login', async () => {
  //     // axiosのモックを設定する
  //     axios.post.mockRejectedValue({
  //       response: {
  //         status: 401,
  //       },
  //     });

  //     render(<Login />);

  //     // フォームの入力値を設定する
  //     fireEvent.change(screen.getByPlaceholderText('メールアドレス'), {
  //       target: { value: 'test@example.com' },
  //     });
  //     fireEvent.change(screen.getByPlaceholderText('パスワード'), {
  //       target: { value: 'incorrectpassword' },
  //     });

  //     // ログインボタンをクリックする
  //     fireEvent.click(screen.getByText('ログイン'));

  //     // ログインが失敗し、エラーメッセージが表示されることを検証する
  //     await waitFor(() => {
  //       expect(
  //         screen.getByText(
  //           'ログインに失敗しました。メールアドレスかパスワードが一致しません。'
  //         )
  //       ).toBeInTheDocument();
  //     });
  //   });
});
