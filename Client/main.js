import { io } from "./socket.io.esm.min.js";
var socket = io("http://localhost:3000");

const cv = document.createElement("canvas");
const cx = cv.getContext("2d");
document.body.appendChild(cv);
const cb = cv.getBoundingClientRect();
const resolution = 1;
const cw = cv.width = cb.width * resolution;
const ch = cv.height = cb.height * resolution;

const btn = document.querySelector("#btn");
const iname = document.querySelector("#name");

var im = new Image(cw,ch);
im.src = "bkg.png";



window.onload = (e) => {
    cx.drawImage(im, 0, 0)
    cx.fillRect(20, 20, 50, 50);
}
btn.addEventListener('click', (e) => {
    socket.emit('uname', iname.value);
})

socket.on('update', (t) => {
    console.log(t.all); 
})