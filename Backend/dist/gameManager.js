"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const game_1 = require("./game");
const message_1 = require("./message");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addPlayer(socket) {
        this.users.push(socket);
        this.handleUser(socket);
    }
    removePlayer(socket) {
        this.users = this.users.filter((game) => game !== socket);
    }
    handleUser(socket) {
        socket.on("message", (data) => {
            var _a, _b;
            const message = JSON.parse(data.toString());
            if ((message.type = message_1.INIT_GAME)) {
                if (this.pendingUser) {
                    const game = new game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if ((message.type = message_1.MOVE)) {
                const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
                if (game) {
                    console.log("message==", (_a = message === null || message === void 0 ? void 0 : message.payload) === null || _a === void 0 ? void 0 : _a.move);
                    game.makeMove(socket, (_b = message === null || message === void 0 ? void 0 : message.payload) === null || _b === void 0 ? void 0 : _b.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
