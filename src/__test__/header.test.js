import Header from '../components/header'
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useCookies } from 'react-cookie';
// `useCookies`関数をモック化して、テスト時に実際のクッキー操作を回避
jest.mock('react-cookie', () => ({
  useCookies: jest.fn()
}));

// window.location.hrefをモック化して、テスト時に実際のURLリダイレクトを回避
Object.defineProperty(window, 'location', {
  value: {
    href: jest.fn()
  },
  writable: true
});

describe('<Header />', () => {
  let setMockCookies;

  beforeEach(() => {
    // テスト用のダミークッキーをセット
    setMockCookies = {
      userId: 'sampleUserId',
      affiliation: 'FR',
      adminId: 'sampleAdminId'
    };
    // useCookiesをモック化してダミークッキーを返すように設定
    (useCookies).mockReturnValue([
      setMockCookies,
      jest.fn(),
      jest.fn()
    ]);
  });
  // ヘッダーが正しくレンダリングされるかをテスト
  it('renders correctly', () => {
    const { getByText } = render(<Header />);
    expect(getByText('パワプロ')).toBeInTheDocument();
    expect(getByText('ダッシュボードへ')).toBeInTheDocument();
    expect(getByText('ログアウト→')).toBeInTheDocument();
  });
  // affiliationに基づいて正しいダッシュボードURLにリダイレクトするかをテスト
  it('navigates to the correct dashboard on click based on affiliation', () => {
    const { getByText } = render(<Header />);
    fireEvent.click(getByText('ダッシュボードへ'));
    expect(window.location.href).toBe('/dashboard/dbEngineer');
  });
  // affiliationが'営業'の場合に正しいダッシュボードURLにリダイレクトするかをテスト
  it('navigates to the sales dashboard if affiliation is 営業', () => {
    setMockCookies.affiliation = '営業';
    (useCookies).mockReturnValue([
      setMockCookies,
      jest.fn(),
      jest.fn()
    ]);
    const { getByText } = render(<Header />);
    fireEvent.click(getByText('ダッシュボードへ'));
    expect(window.location.href).toBe('/dashboard/dbSales');
  });
  // affiliationがadminだった場合に正しいダッシュボードURLにリダイレクトするかをテスト
  it('navigates to the admin dashboard if affiliation does not match any predefined value', () => {
    setMockCookies.affiliation = 'admin';
    (useCookies).mockReturnValue([
      setMockCookies,
      jest.fn(),
      jest.fn()
    ]);

    const { getByText } = render(<Header />);
    fireEvent.click(getByText('ダッシュボードへ'));
    expect(window.location.href).toBe('/dashboard/dbAdmin');
  });

  // ログアウトボタンをクリックした際にクッキーが削除されるかをテスト
  it('removes cookies on logout', () => {
    const removeCookieMock = jest.fn();
    (useCookies).mockReturnValue([
      setMockCookies,
      jest.fn(),
      removeCookieMock
    ]);

    const { getByText } = render(<Header />);
    fireEvent.click(getByText('ログアウト→'));
    expect(removeCookieMock).toHaveBeenCalledTimes(3);
  });
});
