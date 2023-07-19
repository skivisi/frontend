import { ZodError, z } from 'zod';
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import '../styles/globals.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string | null>(null);
  const [cookie, setCookie] = useCookies();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(
    null
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    type Login = {
      email: string;
      password: string | null;
    };

    const loginSchema = z.object({
      email: z
        .string()
        .email('有効なメールアドレスを入力してください'),
      password: z
        .string()
        .min(8, 'パスワードは8文字以上で入力してください'),
    });

    try {
      const values = loginSchema.parse({
        email,
        password,
      });

      // エラーリセット
      setEmailError(null);
      setPasswordError(null);
      setSubmitError(null);

      const login: Login = {
        email: email,
        password: password,
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, login)
        .then((response) => {
          let userData = response.data;
          console.log(userData);
          let id = userData.userId;
          let affiliation = userData.affiliation;
          setCookie('userId', id, { path: '/', secure: true });
          setCookie('affiliation', affiliation, {
            path: '/',
            secure: true,
          });
          if (
            affiliation === '営業'
          ) {
            window.location.href = '/dashboard/dbSales';
          } else {
            window.location.href = '/dashboard/dbEngineer';
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            setSubmitError(
              'ログインに失敗しました。メールアドレスかパスワードが一致しません。'
            );
            setEmail('');
            setPassword(null);
          }
          console.log(error);
        });
    } catch (error) {
      if (error instanceof ZodError) {
        // ZodErrorのインスタンスであることを確認
        if (error.errors[0]?.path[0] === 'email') {
          setEmailError(error.errors[0].message);
        } else if (error.errors[0]?.path[0] === 'password') {
          setPasswordError(error.errors[0].message);
        }
      }
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            パワプロにログイン☝️
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
              <label
                htmlFor="email"
                className="text-sm font-medium leading-6 text-gray-900 hidden"
              >
                メールアドレス
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
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="text-red-500 text-sm">
                  {emailError}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-6 text-gray-900 hidden"
                >
                  パスワード
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

            <button
              type="submit"
              className="flex w-full justify-center px-3 py-2.5 shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white"
            >
              ログイン
            </button>
            {submitError && (
              <div className="text-red-500 text-sm">
                {submitError}
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            初めてご利用の方は
            <Link
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              こちら
            </Link>
            へ
          </p>
        </div>
        <p className="text-center text-sm text-gray-500">
          管理者の方は
          <Link
            href="/loginAdmin"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            こちら
          </Link>
          へ
        </p>
      </div>
    </>
  );
};

export default Login;
