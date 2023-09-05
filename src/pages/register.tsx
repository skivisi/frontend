import React, { ChangeEvent, FormEvent, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/globals.css';
import axios, { AxiosError } from 'axios';
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
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [userCount, setUserCount] = useState(0);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [employeeNumberError, setEmployeeNumberError] = useState<string | null>(null);
  const [affiliationError, setAffiliationError] = useState<string | null>(null);
  const [businessSituationError, setBusinessSituationError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    resetErrorMessages();

    const RegisterSchema = z.object({
      email: z
        .string()
        .email('有効なメールアドレスを入力してください'),
      employeeNumber: z
        .number()
        .refine(
          (value: number) =>
            !Number.isNaN(value) && Number.isInteger(value),
          {
            message: '半角数字を入力してください',
            path: ['employeeNumber'],
          }
        ),
      affiliation: z
        .string()
        .nullable()
        .refine((value) => value !== null && value !== '', {
          message: '所属を入力してください',
          path: ['affiliation'],
        }),
      businessSituation: z
        .string()
        .nullable()
        .refine((value) => value !== null && value !== '', {
          message: '業務状況を入力してください',
          path: ['businessSituation'],
        }),
      password: z
        .string()
        .min(8, 'パスワードは8文字以上で入力してください'),
      confirmPassword: z
        .string()
        .min(8, 'パスワードは8文字以上で入力してください'),
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

      setPasswordError(null); // パスワードのエラーをリセット

      // userId追加する
      setUserCount(userCount + 1);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          email,
          employeeNumber,
          joinDate: selectedDate?.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
          }),
          userName,
          affiliation,
          businessSituation,
          password,
          confirmPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      );
      console.log(response.data);
      window.location.href = '/login';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setConfirmPasswordError(error.response.data.error);
        }
      } else if (error instanceof ZodError) {
        // ZodErrorのインスタンスであることを確認
        if (error.errors[0]?.path[0] === 'email') {
          setEmailError(error.errors[0].message);
        } else if (error.errors[0]?.path[0] === 'employeeNumber') {
          setEmployeeNumberError(error.errors[0].message);
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

  const resetErrorMessages = () => {
    setEmailError(null);
    setEmployeeNumberError(null);
    setAffiliationError(null);
    setBusinessSituationError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
  };

  // 入社年月選択の記述
  const handleDateChange = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月は0から始まるため、1を加えて調整
    const formattedDate = `${year}/${month}`;
    setSelectedDate(new Date(formattedDate));
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-900">
            パワプロに登録☝️
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm my-2 px-10 py-10 border-2 border-blue-200 rounded-md bg-blue-200 shadow-2xl ">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="userName"
                className="text-sm font-medium leading-6 text-gray-900 hidden"
              >
                userName
              </label>
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
                className="text-sm font-medium leading-6 text-gray-900 hidden"
              >
                email
              </label>
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
              <label
                htmlFor="employeeNumber"
                className="text-sm font-medium leading-6 text-gray-900 hidden"
              >
                employeeNumber
              </label>
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
                <div className="text-red-500 text-sm">
                  {employeeNumberError}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="joinDate"
                className="text-sm font-medium leading-6 text-gray-900 hidden"
              >
                joinDate
              </label>
              <div className="mt-2">
                <DatePicker
                  id="joinDate"
                  dateFormat="yyyy-MM"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  showMonthYearPicker
                  placeholderText="入社年月"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="affiliation"
                className="text-sm font-medium leading-6 text-gray-900 hidden"
              >
                affiliation
              </label>
              <div className="mt-2">
                <select
                  id="affiliation"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset "
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
              <label
                htmlFor="businessSituation"
                className="text-sm font-medium leading-6 text-gray-900 hidden"
              >
                businessSituation
              </label>
              <div className="mt-2">
                <select
                  id="businessSituation"
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
                  <option value="営業">本社勤務</option>
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
                  className="text-sm font-medium leading-6 text-gray-900 hidden"
                >
                  password
                </label>
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
                  htmlFor="confirmPassword"
                  className="text-sm font-medium leading-6 text-gray-900 hidden"
                >
                  confirmPassword
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
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
              <label className="hidden">submit</label>
              <button
                type="submit"
                className="flex w-full justify-center px-3 py-2.5 shadow-md cursor-pointer text-orange-50 bg-gradient-to-b from-orange-400 to-yellow-400 border-4 border-orange-50  hover:scale-110 transition-all rounded-xl "
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
