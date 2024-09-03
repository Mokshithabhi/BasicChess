import { WebSocketServer } from "ws";
import { GameManager } from "./gameManager";

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on("connection", function connection(ws) {
  gameManager.addPlayer(ws);

  ws.on("disconnect", () => gameManager.removePlayer(ws));

  ws.on("error", (error) => {
    console.error("WebSocket error:", error.message);
  });

  // ws.on("message", function message(data) {
  //   console.log("Received message:", `${data}`);
  // });

  // ws.send("Welcome to the WebSocket server");
});

wss.on("error", (error) => {
  console.error("WebSocket server error:", error.message);
});

console.log("WebSocket server is running on ws://localhost:8080");
