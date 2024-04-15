import express from "express";
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import path, { join } from "node:path";
const PORT = 3000
const app = express()
const server = createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(join(path.resolve(), 'index.html'))
})

io.on('connection', (socket) => {
    console.log("A user has connected")
    // recieving when someone send a chat message
    
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
        // sending to all scokets
        io.emit('chat message', msg)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})
server.listen(PORT, () => {
    console.log('Server startet at ' + PORT)
})

