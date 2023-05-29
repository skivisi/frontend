import Header from "@/components/header";
import Footer from "@/components/footer";

// 管理者DB

const DbAdmin = () => {
  return (
    <>
    <Header />
      <div className="flex justify-center mt-48 ">
        <div className="relative">
          <button className="font-semibold text-white py-4 my-8 mr-16 w-80 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-2 border-white border-solid">
            申請通知
          </button>
          <div
            className="absolute flex items-center justify-center ml-1 h-10 w-10 rounded-full bg-blue-500 text-white font-bold"
            style={{ top: '17%',right: "15%"}}
          >
            3
          </div>
        </div>

        <button className="font-semibold text-white py-4 my-8 ml-16 w-80 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-2 border-white border-solid">
          マイページへ移動
        </button>
      </div>
      <div className="absolute w-full" style={{bottom:"0%"}}>
      <Footer />
      </div>
    </>
  );
};

export default DbAdmin;
