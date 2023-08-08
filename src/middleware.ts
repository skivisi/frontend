import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// トップページにアクセスされた際の挙動

export function middleware(request: NextRequest) {
  // 管理者クッキーを持っている場合、管理者ダッシュボードにリダイレクト
  if (request.cookies.has('adminId')) {
    return NextResponse.rewrite(
      new URL('/dashboard/dbAdmin', request.url)
    );
    // ユーザークッキーを持っている場合、ユーザーダッシュボードにリダイレクト
  } else if (request.cookies.has('userId')) {
    return NextResponse.rewrite(
      new URL('/dashboard/dbEngineer', request.url)
    );
    // 何もない場合ログインページにリダイレクト
  } else {
    return NextResponse.rewrite(new URL('/login', request.url));
  }
}

export const config = {
  matcher: '/',
};
