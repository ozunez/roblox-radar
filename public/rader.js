const socket = io();

const canvas = document.getElementById("radar");
const ctx = canvas.getContext("2d");

let players = [];

socket.on("radar", data => {
    players = data.players || [];
});

function draw(){

    ctx.clearRect(0,0,700,700);

    ctx.fillStyle="#315b82";
    ctx.fillRect(0,0,700,700);

    ctx.strokeStyle="#6ca8ff";

    for(let i=1;i<=6;i++){

        ctx.beginPath();
        ctx.arc(350,350,i*50,0,Math.PI*2);
        ctx.stroke();

    }

    ctx.beginPath();
    ctx.moveTo(350,0);
    ctx.lineTo(350,700);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,350);
    ctx.lineTo(700,350);
    ctx.stroke();

    ctx.fillStyle="white";
    ctx.font="16px Arial";

    for(const p of players){

        let scale=4;

        let x=350+p.x/scale;
        let y=350-p.z/scale;

        ctx.beginPath();
        ctx.arc(x,y,6,0,Math.PI*2);
        ctx.fill();

        ctx.fillText(p.name,x+10,y);
    }

    requestAnimationFrame(draw);
}

draw();
