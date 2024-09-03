import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

const ChessBoard = ({
  board,
  socket,
  setBoard,
  chess,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: any;
  chess: any;
}) => {
  console.log("board", board);
  const [from, setFrom] = useState<null | Square>(null);
  return (
    <div className="text-white-200 ">
      {(board || []).map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareIndex = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;
            //   console.log("squareIndex=", squareIndex, from);
              return (
                <div
                  key={j}
                //   draggable={true}
                  onClick={() => {
                    if (!from) {
                      setFrom(squareIndex);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareIndex,
                            },
                          },
                        })
                      );
                      setFrom(null);
                      chess.move({ from, to: squareIndex });
                      setBoard(chess.board());
                    }
                  }}
                  className={`w-16 h-16 ${
                    (i + j) % 2 == 0 ? "bg-white" : "bg-green-500"
                  }`}
                >
                  {/* <div className="w-full justify-center flex h-full"> */}
                  <div className="h-full justify-center flex items-center flex-col cursor-pointer">
                    {square ? (
                      <img
                        className="w-8"
                        src={`/src/assets/${
                          square?.color === "b"
                            ? square?.type
                            : `${square?.type?.toUpperCase()} white`
                        }.svg`}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
