var firebaseConfig = { apiKey: "AIzaSyBe7_CUCt7PN1JpDs8kprQWcjb4YyA5ttg",
authDomain: "potairu.firebaseapp.com",
databaseURL: "https://potairu-default-rtdb.firebaseio.com",
projectId: "potairu", storageBucket: "potairu.appspot.com",
messagingSenderId: "122974715041",
appId: "1:122974715041:web:be4714c2be144633e1c4e0",
measurementId: "G-8WFTTFKWRE" };
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("userName");
roomname = localStorage.getItem("room_name");

function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomname).push({
        name:username,
        message:msg,
        like:0
    });

    document.getElementById("msg").value = "";
}
function getData() { firebase.database().ref("/"+roomname).on('value', function(snapshot)
{
document.getElementById("output").innerHTML = "";
snapshot.forEach(function(childSnapshot)
{ childKey = childSnapshot.key;
    childData = childSnapshot.val();
    if(childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;

        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick2.png'></h4>";
        message_with_tag = " <h4 class='message_h4'>" + message + "</h4>";
        like_button ="<button class='btn bt' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='gliphycon gliphycon-tumbs-up'>👍Like: "+like+"</span></button><hr>";

        row = name_with_tag + message_with_tag +like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
    
    }  });  }); }
    getData();

    function logout() {
        localStorage.removeItem("userName");
        localStorage.removeItem("room_name");
        window.location = "index.html";
    }

    function updateLike(messageId)
    {
        console.log("botão like pressionado - " + messageId);
        button_id = messageId;
        likes = document.getElementById(button_id).value;
        updateLikes = Number(likes) + 1;
        console.log(updateLikes);
        firebase.database().ref(roomname).child(messageId).update({
            like : updateLikes
        });

    }
