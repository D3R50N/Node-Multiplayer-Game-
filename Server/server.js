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
    // users.select.all();
    io.emit('update', users);
}

io.on('connection', (socket) => {  
    console.log("connected"); 
    clear()
    let sid = socket.id; 
    let user = new lib.User(sid, lib.rand(600), lib.rand(600),"red");
    socket.emit('infos',user)
    lib.users.all.forEach(su => {
        if (su.id != sid)
            socket.emit('newOpponent', su);
    });
    updateUsers(); 

    socket.on('changeName', (n) => {
        users.select.user(sid).name = n; 
        updateUsers();

    });
    socket.on('newUser', (u) => {
        socket.broadcast.emit('newOpponent', u);

    });
    socket.on('disconnect', () => {
        io.emit('remove', sid);
        lib.users.remove.user(sid);

        updateUsers(); 

    })
}) 

   