import { ZodError, z } from 'zod';
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import '../styles/globals.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// ログイン(エンジニア・営業)
const fetcher = (
  resource: Request | URL,
  init: RequestInit | undefined
) => fetch(resource, init).then((res) => res.json());

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>(null);
  const [cookie, setCookie] = useCookies();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(
    null
  );



  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const loginSchema = z.object({
      email: z
        .string()
        .email('有効なメールアドレスを入力してください'),
      password: z
        .string()
        .min(4, 'パスワードは4文字以上で入力してください'),
    });

    try {
      const values = loginSchema.parse({
        email,
        password,
      });
      // バリデーションが成功した場合の処理
      console.log('成功', values);
      setEmailError(null); // メールアドレスのエラーをリセット
      setPasswordError(null); // パスワードのエラーをリセット

      const login:any = {
        email:email,
        password:password
      }

      axios
      //  .get(`http://localhost:8000/user?email=${email}&password=${password}`)
        .post(`http://localhost:8000/api/auth/login`,login)
        .then((response) => {
          let userData = response.data;
          console.log(userData);
          let id = userData.userId;
          let affiliation = userData.affiliation;
          setCookie('userId', id);
          setCookie('affiliation', affiliation);
          if (
            affiliation === 'FR' ||
            affiliation === 'JAVA' ||
            affiliation === 'QA' ||
            affiliation === 'ML' ||
            affiliation === 'CL' ||
            affiliation=== 'PHP'
          ) {
            window.location.href = '/dashboard/dbEngineer';
          } else if (affiliation === '営業') {
            window.location.href = '/dashboard/dbSales';
          }
        });
    } catch (error) {
      // バリデーションエラーが発生した場合の処理
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

            <button
              type="submit"
              className="flex w-full justify-center px-3 py-2.5 shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white"
            >
              ログイン
            </button>
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
      </div>
    </>
  );
};

export default Login;
