const lib = require('./lib');
const http = require("http");
const express = require("express");
const app = express();
const { clear, log } = require('console');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin :'*'
    } 
});
const port = 3000;

server.listen(port, (err) => {
    clear();
    if (err) {
        log("Erreur lors du démarage du serveur");
    }
    else {
        log(`Server démarré sur http://localhost:${port}/`);
    } 
})

// app.use(express.static(__dirname));
const users = lib.users;

function updateUsers() {
    io.emit('update', users);
}

io.on('connection', (socket) => {
    console.log("connected");
    let sid = socket.id;
    user = new lib.User(sid);
    users.select.all();
    socket.on('uname', (n) => {
        user.name = n;
        users.select.all();
        updateUsers();
    })
    socket.on('disconnect', () => {
        users.remove.user(sid);

    })
})

