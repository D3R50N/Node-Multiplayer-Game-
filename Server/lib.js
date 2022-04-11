
const { log } = require("console"); 

class Users {
    all = [];
    select = {
        all: () => {
            
            log(this.all);
        },
        user: (id) => {
            let found = false;
            this.all.forEach((e) => {

                if (e.id == id) {
                    console.log("User ", e);
                    found = true;
                }
            })

            if (!found)
                log("Not found");

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
                    this.all = this.all.slice(1);

                }
            })

            if (!found)
                log("No changes");

        }
    }
}

const users = new Users();


class User {
    constructor(id) {
        this.id = id;
        this.name = "Unknown"
        users.all.push(this)
    }

    showId() {
        console.log(this.id);
    }
}

module.exports = { Users, User,users }
