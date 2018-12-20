const http = require('http'); // built in
const path = require('path'); // node build in module for resolving ../ path
// join method get rid of ../ path, avoid in and out of a dir
const publicPath = path.join(__dirname, '../public'); // __dirname meaning current dir
const socketIO = require('socket.io')
const express = require('express');
const {generateMessage} = require('./util/message');
const port = process.env.PORT || 3000;
const app = express();
// covert express server into http server. which is needed for config socket.io
const server = http.createServer(app); // see doc for detail
const io = socketIO(server); // this will return websocket server. ready for emittign events.... 
//server public directry
app.use(express.static(publicPath));
//register a event handler for given event for socket.io server
// so the callback function is to handle connection events.
//socket.io server needs a gate to communicate with each client, so socket is the gate
io.on('connection', (socket) => {
    console.log('new user is connected'); 

    //this client socket will receive greeting from server. 
    socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'));

    // client just connecting to the server will not receive this text. 
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));

    // adding second param callback sending ack back to client. 
    socket.on('createMessage', (message, callback) => {
        // console.log(message);
        // emite to everyone who is connecting to the server.
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('sending from server');
        // //everybody but this socket(not server)
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    }); 

    socket.on('disconnect', ()=>{
        console.log('user was disconnected');
    });

    // socket.emit('newMessage', {from: 'me', text: 'hi there', createdAt: 13424});

    // socket.on('createEmail', (newEmail) => {
    //     console.log('emailCreated', newEmail);
    // });
});


server.listen(port, () => {
    console.log(`server is up on port ${port}`);
});




/* Socket.IO primarily uses the WebSocket protocol 
WebSocket is a computer communications protocol, 
providing full-duplex communication channels over a single TCP connection.
WebSocket is a different protocol from HTTP */