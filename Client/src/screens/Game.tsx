import { useEffect, useState } from "react";
import ChessBoard from "../components/ChessBoard";
import useSocket from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

interface MovePayload {
  from: string;
  to: string;
}

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started,setStarted] = useState(false)
  // {from:string,to:string}
  const [movePayload, setMovePayload] = useState<MovePayload[]>([]);
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      console.log("socketMessage",message.payload)

      switch (message.type) {
        case INIT_GAME:
          setStarted(true)
          // setChess(new Chess());
          setBoard(chess.board());
          break;
        case MOVE:
          const move = message.payload;
          setMovePayload((prev) => ([move, ...prev]));
          chess.move(move);
          setBoard(chess.board());
          break;
        case GAME_OVER:
          console.log("game Over")
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;
  console.log(movePayload)
  return (
    <div className="justify-center flex bg-slate-800 h-full">
      <div className="pt-8 max-w-screen-lg w-full h-full">
        <div className="grid grid-cols-6 gap-4 w-full h-full">
          <div className="col-span-4 w-full flex justify-center h-full">
            <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} />
          </div>
          <div className="col-span-2 bg-slate-900 w-full flex justify-center text-white h-full">
            <div className="pt-8 ">
              {!started&&<button
                className="px-8 py-2 text-2xl bg-green-500 hover:bg-green-700 text-white font-bold rounded"
                onClick={() =>
                  socket.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    })
                  )
                }
              >
                Play
              </button>}
            </div>
            <ul>
                    {movePayload.map((move, index) => (
                        <li key={index}>{`From: ${move.from}, To: ${move.to}`}</li>
                    ))}
                </ul> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
