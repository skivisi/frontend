import Login from '../pages/login';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');
jest.mock('axios');

// ログイン機能のテスト
describe('Login API', () => {
  // オリジナルのwindow.locationを保存
  const originalLocation = { ...window.location };

  // 各テスト前に実行されるセットアップ
  beforeEach(() => {
    // jest.resetAllMocksを実行してモックをリセット
    jest.resetAllMocks();

    // window.locationオブジェクトを削除
    delete window.location;

    // window.locationを新しいオブジェクトとして上書き
    window.location = { ...originalLocation, assign: jest.fn() };
  });

  // 各テスト後に実行されるクリーンアップ
  afterEach(() => {
    // オリジナルのwindow.locationを復元
    window.location = originalLocation;
  });

  // テストケースをオブジェクトとして定義
  const testCases = [
    {
      affiliation: 'FR',
      redirect: '/dashboard/dbEngineer',
      email: 'test@example.com',
      password: '66666666',
    },
    {
      affiliation: '営業',
      redirect: '/dashboard/dbSales',
      email: 'sales@example.com',
      password: '11111111',
    },
  ];

  // testCases配列内の各テストケースを反復
  test.each(testCases)(
    'login with $affiliation affiliation',
    async (testCase) => {
      await axios.post.mockResolvedValue({
        status: 200,
        data: {
          userId: 1,
          affiliation: testCase.affiliation,
        },
      });

      //   // 元のwindow.locationを一時的に保存しておき、テスト用の値に置き換える
      //   const originalLocation = window.location;
      //   delete window.location;
      //   window.location = { href: '' };

      render(<Login />);

      // メールアドレスとパスワードの入力フィールドに値を設定
      fireEvent.change(
        screen.getByPlaceholderText('メールアドレス'),
        {
          target: { value: testCase.email },
        }
      );
      fireEvent.change(screen.getByPlaceholderText('パスワード'), {
        target: { value: testCase.password },
      });

      // ログインボタンをクリックします。
      fireEvent.click(screen.getByText('ログイン'));

      // ログインが成功し、指定したURLにリダイレクトされることを検証
      // waitForは非同期の操作が完了するまで待機
      await waitFor(() => {
        expect(window.location.href).toBe(testCase.redirect);
      });

      // APIが期待通りの引数で呼び出されたことを検証
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email: testCase.email,
          password: testCase.password,
        }
      );

      // window.locationを他のテストに影響を与えないように元の値に戻す
      window.location = originalLocation;
    }
  );

  // ログインが失敗した場合のテスト
  test('ログイン失敗', async () => {
    // APIの呼び出しを検証する前にモックを設定する
    axios.post.mockRejectedValue({
      response: {
        status: 401,
      },
    });

    render(<Login />);

    // フォームの入力値を設定する
    fireEvent.change(screen.getByPlaceholderText('メールアドレス'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('パスワード'), {
      target: { value: '66666666' },
    });

    fireEvent.click(screen.getByText('ログイン'));

    // APIの呼び出しを待機し、ログインが失敗し、エラーメッセージが表示されることを検証する
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email: 'test@example.com',
          password: '66666666',
        }
      );
      expect(
        screen.getByText(
          'ログインに失敗しました。メールアドレスかパスワードが一致しません。'
        )
      );
    });
  });
});

// cookieのテスト
// useCookiesモックの作成
const setCookie = jest.fn();
const getCookie = jest.fn();
jest.mock('react-cookie', () => ({
  useCookies: () => [getCookie, setCookie],
}));

// axiosモックの作成
jest.mock('axios');

describe('cookie', () => {
  test('cookie test', async () => {
    // axios.postのモックの設定
    axios.post.mockResolvedValueOnce({
      data: { userId: '123', affiliation: '営業' },
    });

    render(<Login />);

    // テスト用の入力値
    const testEmail = 'test@example.com';
    const testPassword = 'password';

    // フォームの入力と送信イベントの発生
    const emailInput = screen.getByLabelText('メールアドレス');
    fireEvent.change(emailInput, { target: { value: testEmail } });

    const passwordInput = screen.getByLabelText('パスワード');
    fireEvent.change(passwordInput, {
      target: { value: testPassword },
    });

    const submitButton = screen.getByText('ログイン');
    fireEvent.click(submitButton);

    // axios.postが正しく呼ばれたことを検証
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        email: testEmail,
        password: testPassword,
      }
    );

    // Promiseが解決するのを待つ
    await waitFor(() => {
      // Cookieが正しくセットされたことを検証
      expect(setCookie).toHaveBeenCalledWith('userId', '123', {
        path: '/',
        secure: true,
      });
      expect(setCookie).toHaveBeenCalledWith('affiliation', '営業', {
        path: '/',
        secure: true,
      });
    });
  });
});

// メールアドレスのバリデーション
describe('validateEmail', () => {
  const validateEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return '有効なメールアドレスを入力してください';
    }
    return null;
  };

  it('validateEmail(エラー)', () => {
    const invalidEmail = 'invalidEmail';
    expect(validateEmail(invalidEmail)).toBe(
      '有効なメールアドレスを入力してください'
    );
  });

  it('validateEmail(成功)', () => {
    const validEmail = 'valid@example.com';
    expect(validateEmail(validEmail)).toBeNull();
  });
});

// パスワードのバリデーション
describe('validatePassword', () => {
  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'パスワードは8文字以上で入力してください';
    }
    return null;
  };
  it('validatePassword(エラー)', () => {
    const shortPassword = '1111';
    expect(validatePassword(shortPassword)).toBe(
      'パスワードは8文字以上で入力してください'
    );
  });

  it('validatePassword(成功)', () => {
    const password = '11111111';
    expect(validatePassword(password)).toBeNull();
  });
});
