import { io } from "./socket.io.esm.min.js";
var socket = io("http://localhost:3000");

const cv = document.createElement("canvas");
const cx = cv.getContext("2d");
document.querySelector("#cvDiv").appendChild(cv);
const cb = cv.getBoundingClientRect();
const resolution = 1;
const cw = cv.width = cb.width * resolution;
const ch = cv.height = cb.height * resolution;

const btni = document.querySelector("#btni");
const iname = document.querySelector("#name");

var im = new Image(cw, ch);
im.src = "bkg.png";
var players = [];
var playerInstance;


class Player {
    constructor(id, x, y, col = "black") {
        this.id = id;
        this.x = x;
        this.y = y;
        this.col = col;

        players.push(this)
    }
    render() {
        cx.fillStyle = this.col;
        cx.fillRect(this.x, this.y, 50, 50);

    }
}


window.onload = (e) => {
    // cx.drawImage(im, 0, 0)
    setInterval(() => {
        cx.clearRect(0, 0, cw, ch);

        players.forEach((e) => {
            e.render();
            e.x++
        });
    }, 1000 / 60);
 
}






btni.addEventListener('submit', (e) => {
    e.preventDefault()
    socket.emit('uname', iname.value);
})

socket.on('infos', e => {
    let id = e.id;
    let x = e.x;
    let y = e.y;
    let col = e.col;
    playerInstance = new Player(id, x, y, col);
    playerInstance.col="blue"
})

socket.on('others', e=>{
    let id = e.id;
    let x = e.x;
    let y = e.y;
    let col = e.col;
    var p = new Player(id, x, y, col);
})
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