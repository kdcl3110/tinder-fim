const http = require("http");
// const http = require("https");
require("dotenv").config();
const app = require("./src/app");
const Socket = require("socket.io");
const fs = require("fs");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "4000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app, "10.2.101.12");
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port, '0.0.0.0');

const io = Socket(server, {
  pingTimeout: 60000,
  pingInterval: 20000,
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", async (socket) => {
  console.log("socket");
  socket.on("disconnect", async () => {
    console.log("déconnexion");
  });

  // try {
  //   const matches = await getMatchedMovie()
  //   socket.emit(`matches:list`, matches);
  // } catch (error) {
  //   console.log("errrr", error);
  // }
});

io.on("error", (error) => {
  console.error("Socket.IO Server Error:", error);
});
