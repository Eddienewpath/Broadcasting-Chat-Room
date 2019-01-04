// initiat an request and open up a connection to server
let socket = io(); // returns a Socket api. see doc https://socket.io/docs/client-api/
// register a handler for given event 'connect'
//Fired upon a connection including a successful reconnection.
// server will listen for incomming connection request
// myChat.plugin(ChatEngineCore.plugin['chat-engine-emoji']());
function scrollToBottom(){
    //selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    //heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}
// client side use normal function declare, avoid using arrow function
// because some browser will not support it. 
socket.on('connect', function (){
    // console.log('connected to server');
    let param = jQuery.deparam(window.location.search); // key value pair 
    // server will hear for join event
    socket.emit('join', param, function(err){
        if(err){
            alert(err);
            // change the page to root
            window.location.href = '/'; 
        }else{
            console.log('no err');
        }
    });
    
});

socket.on('disconnect', function(){
    console.log('disconnect to server');
});

socket.on('updateUserList', function(users){
    let ol = jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

socket.on('newMessage', function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');
    // let li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
    let template = jQuery('#message-template').html(); // return in btw message-template
    let html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    }); //return template just rendered 
    
    jQuery('#messages').append(html); // added the temp to the list 
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');
    // let li = jQuery('<li></li>');
    // // open a new tab  _blank
    // let a = jQuery('<a target="_blank">my current location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom()
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