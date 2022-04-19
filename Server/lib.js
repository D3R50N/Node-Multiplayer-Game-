
const { log } = require("console"); 

class Users {
    all = [];
    select = {
        all: () => {
            
            log(this.all);
        },
        user: (id) => {
            let found = false;
            let user;
            this.all.forEach((e) => {

                if (e.id == id) {
                    found = true;
                    user = e;
                }
            })

            if (!found)
                return ("Not found");
            else 
                return user;

        }
    };
    remove = {
        all: () => {
            this.all = [];
        },
        user: (id) => {
            let found = false;
            this.all.forEach((e) => {
                let index = this.all.indexOf(e);
                if (e.id == id) {
                    log("Deleted ", e.name);
                     this.all.splice(index,1);
                    found = true;
                }
            })

            if (!found)
                log("No changes");

        }
    }
}

const users = new Users();


class User {
    constructor(id,x,y,col) {
        this.id = id;
        this.col = col;
        this.x = x;
        this.y = y;
        this.name = "Unknown"
        users.all.push(this)
    }

    showId() {
        console.log(this.id);
    }
}

var rand = (max, min = 0) => {
    return parseInt(Math.random() * (max - min)) + min;
}

module.exports = { Users, User,users,rand }
