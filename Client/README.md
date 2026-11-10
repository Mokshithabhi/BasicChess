# React + TypeScript + Vite

# Chess Multiplayer

Play a game of chess against another player in real time.

## How to Play

1. Make sure the game server is running and open the game in two browser windows or on two devices.
2. Both players connect to the game and click **Play**. The server matches the first two players waiting to play.
3. To move, click the square containing your piece, then click the square you want to move it to.
4. Players take turns. White moves first.

## Chess Rules

- The goal is to checkmate your opponent's king: put it under attack so it has no legal move to escape.
- Each piece moves differently: pawns move forward and capture diagonally; rooks move horizontally or vertically; bishops move diagonally; queens move in any straight line; knights move in an L shape and can jump over pieces; kings move one square in any direction.
- You cannot make a move that leaves your own king in check.
- A player wins by checkmate. A game is a draw if neither player can make a legal move and the king is not in check (stalemate).

## Controls

- Click a piece to select its starting square.
- Click another square to submit the move.
- Moves are sent to the server and relayed to the other player.


