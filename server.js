const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

let radarData = {
    players: []
};

app.post("/update", (req, res) => {
    radarData = req.body;

    io.emit("radar", radarData);

    res.sendStatus(200);
});

io.on("connection", (socket) => {
    console.log("Viewer Connected");

    socket.emit("radar", radarData);
});

server.listen(PORT, () => {
    console.log("Radar running on port " + PORT);
});
