const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions = { origin: '*' };
//app.options("*", cors(corsOptions))
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "https://www.nownext.live",
      methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.write(`<h1>Socket IO Start on Port : ${PORT}</h1>`);
    res.end();
});

let content = {
    "space1": {
        "title": "Space 1",
        "now": {
            "title": "Test 1",
            "subtitle": "Group A"
        },
        "next": {
            "title": "Test 2",
            "subtitle": "Group B"
        }
    },
    "space2": {
        "title": "Space 2",
        "now": {
            "title": "Test 3",
            "subtitle": "Group C"
        },
        "next": {
            "title": "Test 4",
            "subtitle": "Group D"
        }
    },
    "space3": {
        "title": "Space 3",
        "now": {
            "title": "Test 5",
            "subtitle": "Group E"
        },
        "next": {
            "title": "Test 6",
            "subtitle": "Group F"
        }
    },
    "space4": {
        "title": "Space 4",
        "now": {
            "title": "Test 7",
            "subtitle": "Group G"
        },
        "next": {
            "title": "Test 8",
            "subtitle": "Group H"
        }
    },
    "space5": {
        "title": "Space 5",
        "now": {
            "title": "Test 9",
            "subtitle": "Group I"
        },
        "next": {
            "title": "Test 10",
            "subtitle": "Group J"
        }
    },
    "space6": {
        "title": "Space 6",
        "now": {
            "title": "Test 11",
            "subtitle": "Group K"
        },
        "next": {
            "title": "Test 12",
            "subtitle": "Group L"
        }
    }
}

const users = []

const getUserRoom = (id) => {return users.find(i => i.id == id).room; }
const setUserRoom = (id, room) => {
    var foundIndex = users.findIndex(x => x.id == id);
    if (foundIndex == -1) return;

    var u = users.find(i => i.id == id);
    u.room = room;
    users[foundIndex] = u;
}
const getUsersInRoom = (room) => {
    return users.filter(u => u.room == room).length;
}

const setUserRole = (id, role) => {
    var foundIndex = users.findIndex(x => x.id == id);
    if (foundIndex == -1) return;

    var u = users.find(i => i.id == id);
    u.role = role;
    users[foundIndex] = u;
}

io.on("connection", (s) => {
    users.push({id: s.id, room: "", role: ""});
    s.emit("update", content);

    // DISCONNECT LOGIC
    s.on('disconnect', function() {
        const index = users.findIndex(x => x.id == s.id);
        if (index > -1) users.splice(index, 1); 
    });

    s.on("save", (c) => {
        content = c.data;
        let roomName = getUserRoom(s.id)
        console.log(roomName)
        s.to(roomName).emit("update", content);
    })

    s.on("room-request", (d) => {
        s.join(d.room)

        setUserRole(s.id, d.role);
        setUserRoom(s.id, d.room);

        s.to(d.room).emit("room-status", { msg:`${s.id} joined`, count: getUsersInRoom(d.room) });
        s.emit("init-load", content);
    })
});

server.listen(PORT, () => {
    console.log('listening on *:3000');
});
