import { io } from "./socket.io.esm.min.js";
var socket = io.connect("http://localhost:3000");
socket.on('connect_error', () => {
    // alert("Erreur de coonexion")
    document.querySelector('#err').style.display = "block";
    document.querySelector('#load').style.display = "none";
})
socket.on('connect', () => {
    document.querySelector('#load_container').style.display = "none";
})
socket.on('connecting', () => {
    alert()
})
const cv = document.createElement("canvas");
const cx = cv.getContext("2d");
document.querySelector("#cvDiv").appendChild(cv);
const cb = cv.getBoundingClientRect();
const resolution = 2;
const cw = cv.width = cb.width * resolution;
const ch = cv.height = cb.height * resolution;


const btni = document.querySelector("#btni");
const iname = document.querySelector("#name");

var im = new Image(cw, ch);
im.src = "bkg.png";
var players = [];
var playersId = [];
var playerInstance;


class Player {
    constructor(id, x, y, col = "black") {
        this.id = id;
        this.x = x;
        this.y = y;
        this.col = col;

        players.push(this)
        playersId.push(id);
    }
    render() {
        cx.beginPath();
        cx.lineWidth = 4;
        cx.strokeStyle = this.col;
        cx.arc(this.x, this.y, 30, 0, Math.PI * 2)
        cx.stroke();
        cx.closePath();
    }
}

window.addEventListener('click', e => {
    playerInstance.x = e.clientX;
    playerInstance.y = e.clientY;

})


window.onload = (e) => {
    // cx.drawImage(im, 0, 0)
    let counter = 0;
    setInterval(() => {
        cx.clearRect(0, 0, cw, ch);
        players.forEach(player => {
            if (player.id != playerInstance.id)
                player.render();
        })
        if (playerInstance) {
            playerInstance.render();
        }
        socket.emit("newUser", playerInstance);


    }, 1000 / 60);

}






btni.addEventListener('submit', (e) => {
    e.preventDefault()
    socket.emit('changeName', iname.value);
})

socket.on('infos', e => {
    let id = e.id;
    let x = e.x;
    let y = e.y;
    let col = e.col;
    playerInstance = new Player(id, x, y, col);

    playerInstance.col = "blue";
    socket.emit("newUser", playerInstance);

})

socket.on('newOpponent', e => {
    let id = e.id;
    let x = e.x;
    let y = e.y;
    let col = e.col;
    let p;
    if (!playersId.includes(id)) {
        p = new Player(id, x, y, col);
    }
    else {
        let index = playersId.indexOf(id);
        players[index].x = x;
        players[index].y = y;
    }
    p.col = 'red'

})
socket.on('remove', id => {
    let index = playersId.indexOf(id);
    playersId.splice(index, 1);
    players.splice(index, 1);
});
socket.on('update', (t) => {
    var list = [];
    list = t.all;
    var ol = document.querySelector('#list');
    ol.innerHTML = '';
    list.forEach((e) => {
        let li = document.createElement('li');
        let name = e.name;
        li.innerHTML = "<b>" + name + "</b> ";// + e.id + ")";
        ol.appendChild(li);
    })
})