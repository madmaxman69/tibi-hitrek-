
 charset="utf-8";

var config = {
        apiKey: "AIzaSyAfEjZHu8OkfAlBxvWvseH_pTTT1nG7Xho",
        authDomain: "tibi-hirek.firebaseapp.com",
        databaseURL: "https://tibi-hirek.firebaseio.com",
        projectId: "tibi-hirek",
        storageBucket: "tibi-hirek.appspot.com",
        messagingSenderId: "3187137114"

    };
alert('Ha ide belépsz viselkedj jól vagy haladj tovább !');
document.addEventListener('DOMContentLoaded', function() {
    var messagesList = document.getElementById('messages'),
        textInput = document.getElementById('text'),
        sendButton = document.getElementById('send'),
        login = document.getElementById('login'),
        googleLogin = document.getElementById('google'),
        facebookLogin = document.getElementById('facebook'),
        vendegLogin = document.getElementById('vendeg'),
        signedIn = document.getElementById('loggedin'),
        logout = document.getElementById('logout'),
        usernameElm = document.getElementById('username'),
        password = document.getElementById('password'),
        username = "1 Senki",
        uploader = document.getElementById('uploader');
        dataArea = document.getElementById("load-data");
      
    var app = firebase.initializeApp(config);
    var database = app.database();
    var auth = app.auth();
    var storage = app.storage();
    var databaseRef = database.ref().child('chat');  
    const settings = {
      timestampsInSnapshots: true
    };
    var database = firebase.database();     
      
    sendButton.addEventListener('click', function(ti) {
        var chat = {
            name: username,
            uzenet: textInput.value, 
            datum: Date()
           // timestamp: ServerValue.TIMESTAMP
                };
        databaseRef.push().set(chat);
        textInput.value = '';
    });
    formatDatum = datum => {        
      const months = new Array(
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        );       
        const month = d.getMonth();    
        const day = d.getDate();      
        let year = d.getFullYear();         
        const hours = d.getHours();      
        const minutes = ("0" + d.getMinutes()).slice(-2);
         return (
          day + " " + months[month] + " '" + year + " - " + hours + ":" + minutes
        );
      };      
    databaseRef.on('child_added', function(snapshot) {
        var chat = snapshot.val();
        addUzenet (chat);   
        });
 //  belépések   1-1 a firebase oldalról
    // Sign in with Google
    googleLogin.addEventListener('click', function(ti) {
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    });     

    // Sign in with Facebook
    window.fbAsyncInit = function() {
        facebook.init({
          appId      : '246709482692974',
          xfbml      : true,
          version    : 'v2.12'
        });
        facebook.AppEvents.logPageView();      };
    
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    facebookLogin.addEventListener('click', function(ti) {
        var provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;           
            var user = result.user;
            // a f___om tele van de ez nem müködik rendesen
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
                    });
    });    
            //vendég
    vendegLogin.addEventListener('click', function(ti) {
        auth.signInAnonymously().catch(function(error) {           
            var errorCode = error.code;
            var errorMessage = error.message;           
        });
    });
    //kilép
    logout.addEventListener('click', function(ti) {
        auth.signOut();
    });  
    auth.onAuthStateChanged(function(user) {
        if (user) {
            if (user.isAnonymous) {
                setUsername('Vendég')
            } else {
                setUsername(user.displayName)
            }
        } else { setUsername("1 Senki"); }
    });
    function setUsername(newUsername) {
        if (newUsername == null) {
            newUsername = "1 Senki" ;
            alert('lépj be')
        }        
        username = newUsername;
        var isLoggedIn = username != '1 Senki';     
        usernameElm.innerText = newUsername;
        usernameElm.style.fontWeight= "normal";
        usernameElm.style.fontSize= "12";
        logout.style.display = isLoggedIn ? '' : 'none'; 
        // belép  gombok 
        facebookLogin.style.display = isLoggedIn ? 'none' : '';
        googleLogin.style.display = isLoggedIn ? 'none' : '';
        vendegLogin.style.display = isLoggedIn ? 'none' : '';    }
        // Kép feltölt
  function handleFileSelect(ti) {
    var file = ti.target.files[0];    
    var storageRef = storage.ref().child('chat_kep'); 
   var photoRef = storageRef.child(file.name);   
    var uploadTask = photoRef.put(file);
    uploadTask.on('state_changed', null, null, function() {      
      var downloadUrl = uploadTask.snapshot.downloadURL;
      // url be szövegdobozba
      textInput.value = downloadUrl;
    });
  }
  file.addEventListener('change', handleFileSelect, false);  
  
   
    function addUzenet(chat) {
        var li = document.createElement('li');
        var nameElm = document.createElement('h6' );
        nameElm.innerText = chat.name;
        li.appendChild(nameElm);
        var datumElm = document.createElement("li") ;
        datumElm.innerText = chat.datum ;
        li.appendChild(datumElm ) ;        
        li.className = 'H7';
        if (chat.uzenet.indexOf("https://firebasestorage.googleapis.com/") == 0 ||          
        chat.uzenet.indexOf("data:image/") == 0) {
            var imgElm = document.createElement("img");
            imgElm.src = chat.uzenet;
            li.appendChild(imgElm);
        } else {           
            var uzenetElm = document.createElement("snap");
            uzenetElm.innerText = chat.uzenet  ;
            li.appendChild(uzenetElm ) + "<hr>";    
            }
        messagesList.appendChild(li);     
        li.scrollIntoView(false);
        sendButton.scrollIntoView(false);
    }
    setUsername('1 Senki') ;  
});
