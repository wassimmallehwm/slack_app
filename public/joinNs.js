function joinNs(endpoint) {
    if(nsSocket){
        nsSocket.close();
        document.querySelector('#user-input').removeEventListener('submit', formSubmission);
    }
    nsSocket = io('http://localhost:9000' + endpoint);
    nsSocket.on('nsRoomLoad', (rooms) => {
        roomList = document.querySelector('.room-list');
        roomList.innerHTML = "";
        rooms.forEach((room) => {
            let glyph;
            if (room.privateRoom) {
                glyph = 'lock'
            } else {
                glyph = 'globe'
            }
            roomList.innerHTML += "<li class='room'><span class='glyphicon glyphicon-" + glyph + "'></span>"
                + room.roomTitle + "</li>";
        })

        let roomNodes = document.getElementsByClassName('room');
        Array.from(roomNodes).forEach((elm) => {
            elm.addEventListener('click', (e) => {
                joinRoom(e.target.innerText);
            })
        })

        const topRoom = document.querySelector('.room');
        const topRoomName = topRoom.innerText;
        joinRoom(topRoomName);
    })

    nsSocket.on('messageToClient', (msg) => {
        const messagesUl = document.querySelector('#messages');
        messagesUl.innerHTML += buildHtml(msg);
        messagesUl.scrollTo(0, messagesUl.scrollHeight);
    })

    document.querySelector('.message-form').addEventListener('submit', formSubmission)

}

function formSubmission(event) {
    event.preventDefault();
    const msg = document.querySelector('#user-message').value;
    nsSocket.emit('messageToServer', {msg: msg});
    document.querySelector('#user-input').reset();
}

function buildHtml(msg){
    const convertedDate = new Date(msg.time).toLocaleString();
    const html = 
    "<li class='msg-item'>" + 
        "<div class='user-image'>" +
            "<img src=" + msg.avatar + " />" +
        "</div>" + 
        "<div class='user-message'>" + 
            "<div class='user-name-time'>" + msg.username + 
                "<span class='msg-time'>" + convertedDate + "</span>" +
            "</div>" +
            "<div class='message-text'>" + msg.text + "</div>" +
        "</div>" +
    "</li>";
    return html;
}