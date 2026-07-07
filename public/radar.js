const socket = io();

socket.on("radar", (data) => {
    console.log("Radar Update:", data);
});
