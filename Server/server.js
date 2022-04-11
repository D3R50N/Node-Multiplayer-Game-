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
    clear()
    let sid = socket.id;
    let user = new lib.User(sid, lib.rand(200), lib.rand(200),"orange");
    //users.select.all();
    updateUsers();
    socket.emit('infos', user);
    lib.users.all.forEach(e => {
        if (e.id != sid)
            socket.emit('others', e);

    })
    socket.broadcast.emit('others', user);

    socket.on('uname', (n) => { 
        user.name = n;
       // users.select.all();
        console.log("User ", users.select.user(sid));

        updateUsers();
    })
    socket.on('disconnect', () => {
        users.remove.user(sid);

    })
})

