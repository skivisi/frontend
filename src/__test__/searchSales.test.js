import {
  render,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import Cookies from 'js-cookie';
import SearchSales from '../pages/searchResult/SearchSales';
import React from 'react';
import axios from 'axios';

jest.mock('axios');

describe('SearchSales', () => {
  // usersの状態を制御するためのダミーのstateとsetState関数を用意します。
  let usersState;
  let setUsersState;

  beforeEach(() => {
    // テスト前にusersStateとsetUsersStateを初期化します。
    usersState = [
      {
        affiliation: 'FR',
        businessSituation: '待機中',
        userId: 1,
        userName: '本田',
        email: 'honda@email.com',
        employeeNumber: 5577,
        joinDate: '2022年7月',
        createdAt: '2023-05-22T01:33:55.690Z',
        updatedAt: '2023-05-22T01:33:55.690Z',
      },
      {
        affiliation: 'ML',
        businessSituation: 'アサイン中',
        userId: 1,
        userName: '香川',
        email: 'kagawa@email.com',
        employeeNumber: 5588,
        joinDate: '2022年10月',
        createdAt: '2023-05-22T01:33:55.690Z',
        updatedAt: '2023-05-22T01:33:55.690Z',
      },
    ];
    setUsersState = jest.fn();

    // React.useStateをモックします。
    jest.spyOn(React, 'useState').mockImplementation((initial) => {
      if (Array.isArray(initial)) {
        return [usersState, setUsersState];
      }
      return [initial, jest.fn()];
    });
  });

  afterEach(() => {
    // テスト後にモックをクリーンアップします。
    jest.restoreAllMocks();
  });


  // affiliation（所属）が営業の場合の画面表示
  it('renders users correctly when affiliation is not null', () => {
    // Mock the getCookie function to return a non-null affiliation
    jest.spyOn(Cookies, 'get').mockImplementation((name) => {
      if (name === 'affiliation') {
        return '営業';
      }
      return null;
    });

    // Render the SearchSales component
    const { getAllByText } = render(
      <SearchSales
        query={{ foundUser: JSON.stringify(usersState) }}
      />
    );

    usersState.forEach((user) => {
      expect(
        getAllByText(user.employeeNumber.toString()).length
      ).toBe(1);
      expect(getAllByText(user.joinDate).length).toBe(1);
      expect(getAllByText(user.userName).length).toBe(1);
      expect(getAllByText(user.affiliation).length).toBe(1);
      expect(getAllByText(user.businessSituation).length).toBe(1);
    });
  });

  // affiliation（所属）がnullの場合の画面表示
  it('renders users correctly when affiliation is null', () => {
    // Mock the getCookie function to return null for affiliation
    jest.spyOn(Cookies, 'get').mockImplementation((name) => {
      if (name === 'affiliation') {
        return null;
      }
      return null;
    });

    // Render the SearchSales component
    const { getAllByText } = render(
      <SearchSales
        query={{ foundUser: JSON.stringify(usersState) }}
      />
    );

    usersState.forEach((user) => {
      expect(
        getAllByText(user.employeeNumber.toString()).length
      ).toBe(1);
      expect(getAllByText(user.joinDate).length).toBe(1);
      expect(getAllByText(user.userName).length).toBe(1);
      // affiliationは画面上に表示されないのでチェックしない
      expect(getAllByText(user.businessSituation).length).toBe(1);
    });
  });

  // affiliation（所属）がnullの場合のhandleChange関数のテスト
  it('changes the business situation when button is clicked', async () => {

    // Mock the getCookie function to return null for affiliation
    jest.spyOn(Cookies, 'get').mockImplementation((name) => {
      if (name === 'affiliation') {
        return null;
      }
      return null;
    });

    const axiosMock = axios;
    axiosMock.put.mockResolvedValue({});

    // Render the SearchSales component
    const { getByText, findByRole } = render(
      <SearchSales
        query={{ foundUser: JSON.stringify(usersState) }}
      />
    );

    // ユーザーごとにビジネス状況のボタンを探し、クリックする
    for (let i = 0; i < usersState.length; i++) {
      let user = usersState[i];
      let button = await findByRole('button', {
        name: user.businessSituation,
      });

      // ビジネス状況を切り替える
      let newBusinessSituation =
        user.businessSituation === 'アサイン中'
          ? '待機中'
          : 'アサイン中';

      // ビジネス状況を切り替える前の状態を確認する
      expect(getByText(user.businessSituation)).toBeInTheDocument();

      // ボタンをクリックしてビジネス状況を切り替える
      await act(async () => {
        fireEvent.click(button);
      });

      // axios.putが適切なパラメータで呼び出されたことを確認する
      expect(axiosMock.put).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/businessSituation/${user.userId}`,
        { businessSituation: newBusinessSituation }
      );
      console.log(newBusinessSituation);

      // setUsersが適切な引数で呼び出されたことを確認する
      expect(setUsersState).toHaveBeenCalledWith(
        usersState.map((u) =>
          u.userId === user.userId
            ? { ...u, businessSituation: newBusinessSituation }
            : u
        )
      );

      // ビジネス状況が切り替えられたことを確認する
      await waitFor(() => {
        expect(getByText(newBusinessSituation)).toBeInTheDocument();
      });
    }
  });


  //handleChange関数(users配列内のユーザーのbusinessSituationを更新)のテストケース
  it('updates the business situation of the correct user', async () => {
    // usersStateに異なるユーザーを加える
    usersState.push({
      affiliation: 'ML',
      businessSituation: 'アサイン中',
      userId: 2,
      userName: '中村',
      email: 'nakamura@email.com',
      employeeNumber: 5599,
      joinDate: '2022年12月',
      createdAt: '2023-05-22T01:33:55.690Z',
      updatedAt: '2023-05-22T01:33:55.690Z',
    });

    jest.spyOn(Cookies, 'get').mockImplementation((name) => {
      if (name === 'affiliation') {
        return null;
      }
      return null;
    });

    const axiosMock = axios;
    axiosMock.put.mockResolvedValue({});

    const { getByText, findByRole } = render(
      <SearchSales
        query={{ foundUser: JSON.stringify(usersState) }}
      />
    );

    let user = usersState[0];
    let button = await findByRole('button', {
      name: user.businessSituation,
    });

    // ビジネス状況を切り替える
    let newBusinessSituation =
      user.businessSituation === 'アサイン中'
        ? '待機中'
        : 'アサイン中';

    // ボタンをクリックしてビジネス状況を切り替える
    await act(async () => {
      fireEvent.click(button);
    });

    //setUsersが正しく更新されたか確認
    const updatedUsers = usersState.map((u) => {
      if (u.userId === user.userId) {
        return {
          ...u,
          businessSituation: newBusinessSituation,
        };
      }
      return u;
    });

    expect(setUsersState).toHaveBeenCalledWith(updatedUsers);
  });

  //APIがエラーを返したときに適切に処理できるかのテスト
  it('handles error when trying to change the business situation', async () => {
    // Mock the getCookie function to return null for affiliation
    jest.spyOn(Cookies, 'get').mockImplementation((name) => {
      if (name === 'affiliation') {
        return null;
      }
      return null;
    });

    // Mock axios to throw an error
    const axiosMock = axios;
    axiosMock.put.mockImplementation(() =>
      Promise.reject(new Error('API call failed'))
    );

    // Spy on console.log to check if the error message is logged
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    // Render the SearchSales component
    const { findByRole } = render(
      <SearchSales
        query={{ foundUser: JSON.stringify(usersState) }}
      />
    );

    let user = usersState[0];
    let button = await findByRole('button', {
      name: user.businessSituation,
    });

    // Attempt to change the business situation
    await act(async () => {
      fireEvent.click(button);
    });

    // Check that the error message was logged to the console
    expect(consoleSpy).toHaveBeenCalledWith(
      new Error('API call failed')
    );
  });
});
