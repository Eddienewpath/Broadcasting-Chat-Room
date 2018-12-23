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

socket.on('newMessage', function(message){
    console.log('newMessage', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    let li = jQuery('<li></li>');
    // open a new tab  _blank
    let a = jQuery('<a target="_blank">my current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

// example of ack
// socket.emit('createMessage', {from: 'suki', text: 'hi there'},  function(ack){
//     console.log('received it', ack);
// });

// on is the event listener e -> event
jQuery('#message-form').on('submit', function(e){
    e.preventDefault(); // prevent default full page refresh when submit a form
    let messageTextBox = jQuery('[name=message');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(){
        // clear the message box
        messageTextBox.val('');
    });
});

// add listener for geolocation button 
let locationButtion = jQuery('#send-location');
// click event listener 
// modern browser has builtin geolocation api. 
locationButtion.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    // disable the button during the brower fetching the location info and sending
    locationButtion.attr('disabled', 'disabled').text('sending location...');
    navigator.geolocation.getCurrentPosition( 
        // successful fetch 
        function(postion){
            // once the location is done fetching/encounter err enable the send locaton button again 
            locationButtion.removeAttr('disabled').text('Send location');;
            // console.log(postion);
            socket.emit('createLocationMessage', {
                latitude: postion.coords.latitude,
                longitude: postion.coords.longitude
            });
    },
    // denied permission for accessing location
    function(){
        locationButtion.removeAttr('disabled').text('Send location');
        alert('unbale to fetch the location')
    });
});