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
    "NDST3": {
    "space1": {
        "title": "Space 1",
        "sessions": [
            {
                "title": "Test 1",
                "subtitle": "Group A",
                "time": ""
            },
            {
                "title": "Test 2",
                "subtitle": "Group B",
                "time": ""
            },
            {
                "title": "Test 3",
                "subtitle": "",
                "time": ""
            },
            {
                "title": "Test 4",
                "subtitle": "",
                "time": ""
            }
        ],
        "nowIndex": 2
    },
    "space2": {
        "title": "Space 2",
        "sessions": [
            {
                "title": "Test 3",
                "subtitle": "Group C",
                "time": ""
            },
            {
                "title": "Test 4",
                "subtitle": "Group D",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            }
        ],
        "nowIndex": 1
    },
    "space3": {
        "title": "Space 3",
        "sessions": [
            {
                "title": "Test 5",
                "subtitle": "Group E",
                "time": ""
            },
            {
                "title": "Test 6",
                "subtitle": "Group F",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            }
        ],
        "nowIndex": 1
    },
    "space4": {
        "title": "Space 4",
        "sessions": [
            {
                "title": "Test 7",
                "subtitle": "Group G",
                "time": ""
            },
            {
                "title": "Test 8",
                "subtitle": "Group H",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            }
        ],
        "nowIndex": 1
    },
    "space5": {
        "title": "Space 5",
        "sessions": [
            {
                "title": "Test 9",
                "subtitle": "Group I",
                "time": ""
            },
            {
                "title": "Test 10",
                "subtitle": "Group J",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            }
        ],
        "nowIndex": 0
    },
    "space6": {
        "title": "Space 6",
        "sessions": [
            {
                "title": "Test 11",
                "subtitle": "Group K",
                "time": ""
            },
            {
                "title": "Test 12",
                "subtitle": "Group L",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            }
        ],
        "nowIndex": 0
    },
    "title": "North District Sports"
},
"YT4E3": {
    "space1": {
        "title": "Space 1",
        "sessions": [
            {
                "title": "Test 1",
                "subtitle": "Group A",
                "time": ""
            },
            {
                "title": "Test 2",
                "subtitle": "Group B",
                "time": ""
            },
            {
                "title": "Test 3",
                "subtitle": "",
                "time": ""
            },
            {
                "title": "Test 4",
                "subtitle": "",
                "time": ""
            }
        ],
        "nowIndex": 0
    },
    "space2": {
        "title": "Space 2",
        "sessions": [
            {
                "title": "Test 3",
                "subtitle": "Group C",
                "time": ""
            },
            {
                "title": "Test 4",
                "subtitle": "Group D",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            }
        ],
        "nowIndex": 0
    },
    "space3": {
        "title": "Space 3",
        "sessions": [
            {
                "title": "Test 5",
                "subtitle": "Group E",
                "time": ""
            },
            {
                "title": "Test 6",
                "subtitle": "Group F",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            }
        ],
        "nowIndex": 0
    },
    "space4": {
        "title": "Space 4",
        "sessions": [
            {
                "title": "Test 7",
                "subtitle": "Group G",
                "time": ""
            },
            {
                "title": "Test 8",
                "subtitle": "Group H",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            }
        ],
        "nowIndex": 0
    },
    "space5": {
        "title": "Space 5",
        "sessions": [
            {
                "title": "Test 9",
                "subtitle": "Group I",
                "time": ""
            },
            {
                "title": "Test 10",
                "subtitle": "Group J",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            }
        ],
        "nowIndex": 0
    },
    "space6": {
        "title": "Space 6",
        "sessions": [
            {
                "title": "Test 11",
                "subtitle": "Group K",
                "time": ""
            },
            {
                "title": "Test 12",
                "subtitle": "Group L",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            },
            {
                "title": "",
                "subtitle": "",
                "time": ""
            }
        ],
        "nowIndex": 0
    },
    "title": "North District Sports"
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
const getUsersInRoomCount = (room) => {
    return users.filter(u => u.room == room).length;
}

const getUsersInRoom = (room) => {
    return users.filter(u => u.room == room);
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
    
    // DISCONNECT LOGIC
    s.on('disconnect', function() {
        const index = users.findIndex(x => x.id == s.id);
        if (index > -1) users.splice(index, 1); 
    });

    s.on("save", (c) => {
        let roomName = getUserRoom(s.id)
        content[roomName] = c.data;
        console.log(roomName)
        s.to(roomName).emit("update", content[roomName]);
    })

    s.on("room-request", (d) => {
        s.join(d.room)

        setUserRole(s.id, d.role);
        setUserRoom(s.id, d.room);

        s.emit("room-status", { count: getUsersInRoomCount(d.room), users: getUsersInRoom(d.room) });
        s.to(d.room).emit("room-status", { msg:`${s.id} joined`, count: getUsersInRoomCount(d.room), users: getUsersInRoom(d.room) });
        s.emit("init-load", content[d.room]);
    })
});

server.listen(PORT, () => {
    console.log('listening on *:3000');
});
