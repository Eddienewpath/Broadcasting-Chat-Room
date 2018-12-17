// initiat an request and open up a connection to server
let socket = io(); // returns a Socket api. see doc https://socket.io/docs/client-api/
// register a handler for given event 'connect'
//Fired upon a connection including a successful reconnection.
// server will listen for incomming connection request

// client side use normal function declare, avoid using arrow function
// because some browser will not support it. 
socket.on('connect', function (){
    console.log('connected to server');
    
});

socket.on('disconnect', function(){
    console.log('disconnect to server');
});

socket.on('newMessage', function(msg){
    console.log('newEmail', msg);
});
