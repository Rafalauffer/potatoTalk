var firebaseConfig = { apiKey: "AIzaSyBe7_CUCt7PN1JpDs8kprQWcjb4YyA5ttg",
authDomain: "potairu.firebaseapp.com",
databaseURL: "https://potairu-default-rtdb.firebaseio.com",
projectId: "potairu", storageBucket: "potairu.appspot.com",
messagingSenderId: "122974715041",
appId: "1:122974715041:web:be4714c2be144633e1c4e0",
measurementId: "G-8WFTTFKWRE" };
firebase.initializeApp(firebaseConfig);
username = localStorage.getItem("userName");
document.getElementById("user_name").innerHTML = "Seja bem-vindo "+username+" ao PotatoTalk!"

function addRoom()
{
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose : "adding room name"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "PotatoTalk_page.html";
}

function getData() { firebase.database().ref("/").on('value', function(snapshot)
{document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot)
{ childKey = childSnapshot.key;
    roomnames= childKey;
    row = "<div class='roomName'id="+roomnames+" onclick='redirect_roomname(this.id)'>#"+roomnames+"</div><hr>";
    document.getElementById("output").innerHTML += row;
});
});
}
getData();
function redirect_roomname(name)
{
    localStorage.setItem("room_name", name);
    window.location = "PotatoTalk_page.html";
}

function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}