import Register from '../pages/register';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import axios from 'axios';

// モックサーバーをセットアップ
const server = setupServer();

const testCases = [
  {
    email: 'test@example.com',
    employeeNumber: 1111,
    joindate: '2022/10',
    userName: '山田太郎',
    affiliation: 'FR',
    businessSituation: '待機中',
    password: '11111111',
    confirmPassword: '11111111',
    redirect: '/login',
  },
  {
    email: 'test2@example.com',
    employeeNumber: 1000,
    joindate: '2023/6',
    userName: '山本五十六',
    affiliation: '営業',
    businessSituation: '営業',
    password: '22222222',
    confirmPassword: '22222222',
    redirect: '/login',
  },
];

// 新規登録と遷移のテスト
describe('Register API', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // beforeEachは毎回実行される処理
  beforeEach(() => {
    // テストをリセット。他に影響を与えないように
    jest.resetAllMocks();
  });

  // testCases配列内の各テストケースを反復
  test.each(testCases)('new user', async (testCase) => {
    // 元のwindow.locationを一時的に保存しておき、テスト用の値に置き換える
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    // モックサーバーに新しいリクエストハンドラーを追加
    server.use(
      // 指定されたURLへのPOSTリクエストを処理
      rest.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        (req, res, ctx) => {
          // リクエストボディが期待したものであることを検証
          expect(req.body).toEqual({
            email: testCase.email,
            employeeNumber: testCase.employeeNumber,
            joinDate: testCase.joindate,
            userName: testCase.userName,
            affiliation: testCase.affiliation,
            businessSituation: testCase.businessSituation,
            password: testCase.password,
            confirmPassword: testCase.confirmPassword,
          });

          // 200 OKステータスとリダイレクトを返す
          return res(
            ctx.status(200),
            ctx.json({ redirect: testCase.redirect })
          );
        }
      )
    );

    render(<Register />);

    // 各入力フィールドに値を設定
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: testCase.email },
    });
    fireEvent.change(screen.getByLabelText(/employeeNumber/i), {
      target: { value: testCase.employeeNumber },
    });
    fireEvent.change(screen.getByLabelText(/joinDate/i), {
      target: { value: testCase.joindate },
    });
    fireEvent.change(screen.getByLabelText(/userName/i), {
      target: { value: testCase.userName },
    });
    fireEvent.change(screen.getByLabelText(/affiliation/i), {
      target: { value: testCase.affiliation },
    });
    fireEvent.change(screen.getByLabelText(/businessSituation/i), {
      target: { value: testCase.businessSituation },
    });
    fireEvent.change(screen.getByPlaceholderText('パスワード'), {
      target: { value: testCase.password },
    });
    fireEvent.change(screen.getByPlaceholderText('確認パスワード'), {
      target: { value: testCase.confirmPassword },
    });

    // フォームを提出
    fireEvent.click(screen.getByText(/submit/i));

    // ページが指定されたURLにリダイレクトするのを待つ
    waitFor(
      () => {
        expect(window.location.href).toBe(testCase.redirect);
      },
      { timeout: 5000 }
    );

    // window.locationを他のテストに影響を与えないように元の値に戻す
    window.location = originalLocation;
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

  it('validateEmail(null時のエラー)', () => {
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
});

// 確認パスワードのバリデーション
describe('validateConfirmPassword', () => {
    const validateConfirmPassword = (confirmPassword) => {
      if (confirmPassword.length < 8) {
        return 'パスワードは8文字以上で入力してください';
      }
      return null;
    };
    it('confirmPassword(エラー)', () => {
      const shortPassword = '1111';
      expect(validateConfirmPassword(shortPassword)).toBe(
        'パスワードは8文字以上で入力してください'
      );
    });
  });

// 所属のバリデーション
describe('validateAffiliation', () => {
  const validateAffiliation = (affiliation) => {
    if (!affiliation) {
      return '所属を入力してください';
    }
    return null;
  };

  it('affiliation(null時のエラー)', () => {
    const emptyAffiliation = null;
    expect(validateAffiliation(emptyAffiliation)).toBe(
      '所属を入力してください'
    );
  });

  it('affiliation(空の場合のエラー)', () => {
    const emptyAffiliation = '';
    expect(validateAffiliation(emptyAffiliation)).toBe(
      '所属を入力してください'
    );
  });

  // 有効な値が入力されている場合、nullが返される
  it('affiliation(成功)', () => {
    const validAffiliation = 'FR';
    expect(validateAffiliation(validAffiliation)).toBeNull();
  });
});

// 業務状況のバリデーション
describe('validateBusinessSituation', () => {
  const validateBusinessSituation = (businessSituation) => {
    if (!businessSituation) {
      return '業務状況を入力してください';
    }
    return null;
  };

  it('businessSituation(null時のエラー)', () => {
    const emptyBusinessSituation = null;
    expect(validateBusinessSituation(emptyBusinessSituation)).toBe(
      '業務状況を入力してください'
    );
  });

  it('rbusinessSituation(空の場合のエラー)', () => {
    const emptyBusinessSituation = '';
    expect(validateBusinessSituation(emptyBusinessSituation)).toBe(
      '業務状況を入力してください'
    );
  });

  it('businessSituation(成功)', () => {
    const validBusinessSituation = '待機中';
    expect(validateBusinessSituation(validBusinessSituation)).toBeNull();
  });
});
