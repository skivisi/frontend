'use client';
import { useState } from 'react';
import '../globals.css';
import Skillview from '@/components/mypage/Skillview';
import Specview from '@/components/mypage/Specview';

function Home() {

  const mock = () =>{}
  return (
    <div className='w-full'>
      <p className='ml-20 mt-20'>{'******'}のプロフィール! ▼</p>
      {/* スイッチのボタン スペックシート切り替え */}
      <div className="flex justify-center mt-10">
        <button onClick={mock} className='mr-20 px-8 bg-black text-white text-2xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-b from-zinc-800 via-zinc-500 to-zinc-800 border-x-4 border-t-4 border-zinc-500 hover:scale-110 transition-all'>L</button>
        <div className="mr-5">
        <button onClick={mock} className=' w-32 bg-blue-700 text-white text-xl font-black border-x-4 border-t-4 border-blue-300 rounded-t-2xl px-5 py-3'>スペック</button>
        </div>
        <div className="ml-5">

        <button onClick={mock} className=' w-32 bg-blue-950 text-zinc-500 text-xl font-black border-x-4 border-t-4 border-zinc-500 rounded-t-2xl px-5 py-3'>スキル</button>
        </div>
        <button onClick={mock} className='ml-20 px-8 bg-black text-white text-2xl rounded-tr-3xl rounded-tl-lg bg-gradient-to-b from-zinc-800 via-zinc-500 to-zinc-800 border-x-4 border-t-4 border-zinc-500 hover:scale-110 transition-all'>R</button>
      </div>

      <section className="bg-blue-200 text-sky-900 max-w-4xl p-10 shadow-xl m-auto border-4 border-sky-800">
        {/* L スペックシートの内容 */}
        <Skillview />
        <Specview />
        {/* R スキルシートの内容 */}
      </section>
    </div>
  );
}

export default Home;
