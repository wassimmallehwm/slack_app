function joinRoom(roomName) {

    document.querySelector('.curr-room-text').innerHTML = "<h3>" + 
        roomName +"</h3>";

    nsSocket.emit('joinRoom', roomName, (mermbersNumber) => {
        //update the members total number
        document.querySelector('.curr-room-num-users').innerHTML = mermbersNumber
            + "<span class='glyphicon glyphicon-user'></span>";

    });

    nsSocket.on('historyCatchUp', (history) => {
        const messagesUl = document.querySelector('#messages');
        messagesUl.innerHTML = "";
        history.forEach(msg => {
            const newMsg = buildHtml(msg);
            messagesUl.innerHTML += newMsg;
        });
        messagesUl.scrollTo(0, messagesUl.scrollHeight);
    })

    nsSocket.on('updateMembers', (numMembers) => {
        document.querySelector('.curr-room-num-users').innerHTML = numMembers
            + "<span class='glyphicon glyphicon-user'></span>";
        
    })

    let searchBox = document.querySelector('#search-box');
    searchBox.addEventListener('input', (e) => {
        let messages = Array.from(document.getElementsByClassName('message-text'));
        let msgs = Array.from(document.getElementsByClassName('msg-item'));
        msgs.forEach((msgDiv) => {
            msg = msgDiv.lastElementChild.lastElementChild;
            const msgItem = msg.innerText.toLowerCase();
            const searchBoxData = e.target.value.toLowerCase();
            if(msgItem.indexOf(searchBoxData) === -1){
                msgDiv.style.display = "none";
            } else {
                msgDiv.style.display = "flex";
            }
        })
    })
}
