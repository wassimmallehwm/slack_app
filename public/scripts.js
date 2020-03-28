const username = prompt("Whats your username ?");
const socket = io('http://localhost:9000', {
    query: {
        username: username
    }
});
nsSocket = "";

socket.on('nsList', (nsData) => {
    let namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = "";
    nsData.forEach(ns => {
        namespacesDiv.innerHTML += "<div class='namespace' ns=" + ns.endpoint + "><img src=" + ns.img + "></div>"
    });

    Array.from(document.getElementsByClassName('namespace')).forEach((elm) => {
        elm.addEventListener('click', (e)=> {
            const endpoint = elm.getAttribute('ns');
            joinNs(endpoint);
        })
    })

    joinNs('/wiki');
})
