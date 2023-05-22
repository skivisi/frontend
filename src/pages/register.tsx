import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Register = () => {
  // 入社年月選択の記述
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            パワプロに登録☝️
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm my-2 px-4 py-2 border-2 border-blue-200 rounded-md bg-blue-200">
          <form className="space-y-6" action="#" method="POST">
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
                />
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
                />
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
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900"></label>
              <div className="mt-2">
                <select className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset">
                  <option value="" disabled selected hidden>
                    所属
                  </option>
                  <option value="エンジニア">エンジニア</option>
                  <option value="営業">営業</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900"></label>
              <div className="mt-2">
                <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 ">
                  <option value="" disabled selected hidden>
                    業務状況
                  </option>
                  <option value="待機中">待機中</option>
                  <option value="アサイン中">アサイン中</option>
                </select>
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
                />
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
                />
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
}


export default Register;
