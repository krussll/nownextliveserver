const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "*"
    }
});

let content = {
    now: "NOW EVENT",
    next: "NEXT EVENT"
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
    })
});

io.listen(3000)