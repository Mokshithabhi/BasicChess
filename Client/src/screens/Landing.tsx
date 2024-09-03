import { useNavigate } from "react-router-dom";
import chess from "../assets/chess.png";

const Landing = () => {
  return (
    <div className="flex justify-start  bg-gray-800 w-full gap-3 text-white">
      <ChessSideBar />
      <ChessLandingPage />
    </div>
  );
};

export default Landing;

const ChessSideBar = () => {
  return (
    <div className="flex text-white flex-col w-1/7 bg-[rgba(0,0,0,.2)] h-screen px-5 py-5 gap-10">
      <div>chess1</div>
      <div>chess1</div>
      <div>chess1</div>
    </div>
  );
};

const ChessLandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-8 my-[70px] mx-[92px] justify-start ">
      <div>
        <img src={chess} alt="chess" width={"500px"} />
      </div>
      <div className="flex flex-col mx-10 gap-9">
        <div className="font-bold leading-[1.13] text-[clamp(3.6rem,4vw,4.8rem)]">
          Play Chess Online on the #2 Site!
        </div>
        <button
          className="bg-[#81b64c] p-[1.8rem] text-[clamp(2.4rem, 3vw, 2.8rem)] font-bold"
          onClick={() => navigate("/game")}
        >
          Play Online
        </button>
        {/* <button className="bg-[hsla(0,0%,100%,.1)] p-[1.8rem] text-[clamp(2.4rem, 3vw, 2.8rem)] font-bold ">
          Play Computer
        </button> */}
      </div>
    </div>
  );
};
