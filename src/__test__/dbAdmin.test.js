import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DbAdmin from '../pages/dashboard/dbAdmin';
import useSWR from 'swr';

jest.mock('swr', () => jest.fn());

describe('DbAdmin', () => {
  beforeEach(() => {
    useSWR.mockImplementation(() => ({
      data: [
        {
          id: 1,
          user: {
            userId: 'user1',
            employeeNumber: '123',
            joinDate: '2020-05-01',
            userName: 'John Doe',
            affiliation: 'Engineering',
          },
          status: 1,
          engineerComment: 'Test comment',
        },
      ],
      error: null,
    }));
  });

  it('レンダリングテスト', () => {
    render(<DbAdmin />);
    expect(screen.getByText('申請通知')).toBeInTheDocument();
    expect(screen.getByText('エンジニア検索')).toBeInTheDocument();
  });

  it('申請通知の数が正しいか', () => {
    render(<DbAdmin />);
    expect(screen.getByText('1')).toBeInTheDocument(); // モックデータに基づいて、1つの通知があるため
  });
});
