const { Server } = require("socket.io");
const http = require("http");

module.exports = function (app) {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("message", (msg) => {
      console.log("Message received: " + msg);

      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected: ", socket.id);
    });
  });
  server.listen(3000);
};
