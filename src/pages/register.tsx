import React, { ChangeEvent, FormEvent, useState } from 'react';
import DatePicker,{ registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/globals.css';
import axios from 'axios';
import { ZodError, z } from 'zod';

// 新規登録(エンジニア・営業)

const Register = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [employeeNumber, setEmployeeNumber] = useState<number | null>(
    null
  );
  const [affiliation, setAffiliation] = useState<string | null>(null);
  const [businessSituation, setBusinessSituation] = useState<
    string | null
  >(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<
    string | null
  >(null);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [employeeNumberError, setEmployeeNumberError] = useState<
    number | null
  >(null);
  const [affiliationError, setAffiliationError] = useState<
    string | null
  >(null);
  const [businessSituationError, setBusinessSituationError] =
    useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(
    null
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);


  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const RegisterSchema = z.object({
      email: z
        .string()
        .email('有効なメールアドレスを入力してください'),
      employeeNumber: z
        .number()
        .refine((value: any) => Number.isInteger(value), {
          message: '半角数字を入力してください',
          path: ['employeeNumber'],
        }),
      affiliation: z.string().nonempty('所属を入力してください'),
      businessSituation: z
        .string()
        .nonempty('業務状況を入力してください'),
      password: z
        .string()
        .min(6, 'パスワードは6文字以上で入力してください'),
      confirmPassword: z
        .string()
        .min(6, 'パスワードは6文字以上で入力してください'),
    });

    try {
      const values = RegisterSchema.parse({
        email,
        employeeNumber,
        affiliation,
        businessSituation,
        password,
        confirmPassword,
      });

      console.log('成功', values);
      setPasswordError(null); // パスワードのエラーをリセット

      const response = await axios.post('api/user', {
        userName,
        email,
        employeeNumber,
        joinDate: selectedDate,
        affiliation,
        businessSituation,
        password,
        confirmPassword,
      });
      console.log(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        // ZodErrorのインスタンスであることを確認
        if (error.errors[0]?.path[0] === 'email') {
          setEmailError(error.errors[0].message);
        } else if (error.errors[0]?.path[0] === 'employeeNumber') {
          setEmployeeNumberError(Number(error.errors[0].message));
        } else if (error.errors[0]?.path[0] === 'affiliation') {
          setAffiliationError(error.errors[0].message);
        } else if (error.errors[0]?.path[0] === 'businessSituation') {
          setBusinessSituationError(error.errors[0].message);
        } else if (error.errors[0]?.path[0] === 'password') {
          setPasswordError(error.errors[0].message);
        } else if (error.errors[0]?.path[0] === 'confirmPassword') {
          setConfirmPasswordError(error.errors[0].message);
        }
        console.log(error);
      }
    }
  };

  // 入社年月選択の記述

  const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            パワプロに登録☝️
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm my-2 px-4 py-2 border-2 border-blue-200 rounded-md bg-blue-200">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900"></label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  autoComplete="userName"
                  required
                  placeholder="ユーザー"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              ></label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="メールアドレス"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div className="text-red-500 text-sm">
                  {emailError}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900"></label>
              <div className="mt-2">
                <input
                  id="employeeNumber"
                  name="employeeNumber"
                  autoComplete="employeeNumber"
                  required
                  placeholder="社員番号"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setEmployeeNumber(parseInt(e.target.value));
                  }}
                />
                <div className="text-red-500 text-sm">{employeeNumberError}</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900"></label>
              <div className="mt-2">
                <DatePicker
                  dateFormat="yyyy/MM"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  showMonthYearPicker
                  placeholderText="入社年月"
                  required
                  locale="ja" // 日本語ロケールを指定します
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900"></label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                  onChange={(e) => setAffiliation(e.target.value)}
                  defaultValue="所属"
                  required
                >
                  <option value="所属" disabled hidden>
                    所属
                  </option>
                  <option value="FR">FR</option>
                  <option value="JAVA">JAVA</option>
                  <option value="QA">QA</option>
                  <option value="ML">ML</option>
                  <option value="CL">CL</option>
                  <option value="PHP">PHP</option>
                  <option value="営業">営業</option>
                </select>
                <div className="text-red-500 text-sm">
                  {affiliationError}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900"></label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                  required
                  onChange={(e) =>
                    setBusinessSituation(e.target.value)
                  }
                  defaultValue="業務状況"
                >
                  <option value="業務状況" disabled hidden>
                    業務状況
                  </option>
                  <option value="待機中">待機中</option>
                  <option value="アサイン中">アサイン中</option>
                </select>
                <div className="text-red-500 text-sm">
                  {businessSituationError}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                ></label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="パスワード"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-red-500 text-sm">
                  {passwordError}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                ></label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPasseword"
                  name="confirmPasseword"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="確認パスワード"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <div className="text-red-500 text-sm">
                  {confirmPasswordError}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center px-3 py-2.5 shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white"
              >
                登録
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
