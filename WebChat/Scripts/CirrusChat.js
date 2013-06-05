﻿$(function () {
    // Declare a proxy to reference the hub. 
    var chat = $.connection.chatHub;
    // Create a function that the hub can call to broadcast messages.
    chat.client.broadcastMessage = function (name, message) {
        // Html encode display name and message. 
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        // Add the message to the page. 
        $('#messages').append(encodedName + ": " + encodedMsg + '\n');
        $('#messages').scrollTop($('#messages')[0].scrollHeight);
    };

    // Get the user name and store it to prepend to messages.
    $('#displayname').val(prompt('Enter your name:', ''));
    //// Set initial focus to message input box.  
    //$('#message').focus();
    // Start the connection.
    $.connection.hub.start().done(function () {
        $('#sendmessage').click(function () {
            // Call the Send method on the hub. 
            chat.server.send($('#displayname').val(), $('#message').val());
            // Clear text box and reset focus for next comment. 
            $('#message').val('').focus();
        });
    });

    $('#message').live("keypress", function (e) {
        if (e.keyCode == 13) {
            $('#sendmessage').click();
        }
    });
});