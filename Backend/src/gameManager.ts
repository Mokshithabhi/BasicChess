import { WebSocket } from "ws";
import { Game } from "./game";
import { INIT_GAME, MOVE } from "./message";

export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addPlayer(socket: WebSocket) {
    this.users.push(socket);
    this.handleUser(socket);
  }

  removePlayer(socket: WebSocket) {
    this.users = this.users.filter((game) => game !== socket);
  }
  private handleUser(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      
      if ((message.type = INIT_GAME)) {
        if (this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }

      if ((message.type = MOVE)) {
        const game = this.games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );
        if(game){
          console.log("message==",message?.payload?.move)
            game.makeMove(socket,message?.payload?.move)
        }
      }
    });
  }
}
