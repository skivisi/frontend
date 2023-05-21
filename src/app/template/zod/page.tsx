/*
# Zod template
公式: https://zod.dev/
参考: https://reffect.co.jp/react/zod-validation
- 型定義、バリデーションモジュール
=> 依存関係がなくパッケージも軽い。
*/

// http://127.0.0.1:3000/template/zod

// appRouter pages.tsxはサーバーコンポーネント扱いになるのでhooksを利用できない。
// 'use client'を書くことで回避できる
'use client';

// zodのインポート
import { z } from 'zod';
import { useState } from 'react';

// オブジェクトスキーマ作成
const User = z.object({
  // 型定義
  email: z
    .string()
    // オプションで詳細指定(url, email等)。
    .email({ message: '正しいメールアドレスを入力してください' }), // 引数でチェックに引っかかった時のメッセージを変更できる（変更しない場合英語のため）
  password: z.string().min(4, { message: '4文字以上入力してくだ' }),
});

// オブジェクトスキーマを型として流用できる
type User = z.infer<typeof User>;

export default function ZodTemplate() {
  // テキストフィールドに入力された値を格納
  const [user, setUser] = useState<User>({ email: '', password: '' });
  // エラー文を格納
  const [error, setError] = useState<any>(null);

  // ボタン発火イベント
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // `User`スキーマをもとに`user`ステートをバリデーションチェック
      // https://zod.dev/?id=parse  .parse()について
      const validated = User.parse(user);
      console.log(user);
      
      // チェック通過後の処理(非同期関数など)
      await AsyncTask(validated);

    } catch (e: any) {
      // バリデーションに引っかかった場合エラー文を`error`にセット
      // https://zod.dev/ERROR_HANDLING?id=flattening-errors .flatten()について
      setError(e.flatten().fieldErrors);
      console.log(e.flatten().fieldErrors);
    }

  };

  const AsyncTask = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      <h1 className=" text-4xl m-5">zod テンプレート</h1>
      <p>zodの基本的な用途・用法</p>

      <form action="">
        <div className="m-2">
          <label htmlFor="email">メール</label>
          <input
            type="text"
            id="email"
            name="emali"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />
        </div>

        {/* `email`に関するエラーを出力 */}
        {error?.email && (
          <div className="text-red-400">{error.email}</div>
        )}

        <div className="m-2">
          <label htmlFor="password">パスワード</label>
          <input
            type="text"
            id="password"
            name="password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </div>

        {/* `Password`に関するエラーを出力 */}
        {error?.password && (
          <div className="text-red-400">{error.password}</div>
        )}

        <div className="">
          <button
            type="button"
            className="bg-blue-400 px-6 py-2 rounded-md"
            onClick={handleSubmit}
          >
            決定
          </button>
        </div>
      </form>
    </>
  );
}
