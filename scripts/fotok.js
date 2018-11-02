
var version = 'tibi chat site 2.2 ';
var config = {
  
    apiKey: "AIzaSyBnGDtMhQp2t94mRvEEwiPfv1ydVh0RCv8",
    authDomain: "tibi-tananyag.firebaseapp.com",
    databaseURL: "https://tibi-tananyag.firebaseio.com",
    projectId: "tibi-tananyag",
    storageBucket: "tibi-tananyag.appspot.com",
    messagingSenderId: "756498731601"
  }; 
//console.clear();
firebase.initializeApp(config);
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("file");
var databaseRef = firebase.database();

databaseRef.ref('foto_urls').once('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var key = childSnapshot.key;
    var childData = childSnapshot.val();
    console.log(key, childData); 
    var list = document.getElementById('list');    
    var li = document.createElement('li');
    li.id = "lista";  
    var image = document.createElement('img');
    image.id = "kep";
    image.src = childData.url;  
    li.appendChild(image);   
    var p = document.createElement('p');
    p.textContent = key;
    p.id = "nev";
    li.appendChild(p);   
    list.appendChild(li);
  });
});

function addImage(nev, url) {
  // ref
  var list = document.getElementById('list');  
  var li = document.createElement('li');
  li.id = "lista";  
  var image = document.createElement('img');
  image.id = "kep";
  image.src = url;  
  li.appendChild(image);  
  li.appendChild(image);
  var tibi = document.createElement('tibi');
  console.log(nev);
  tibi.textContent = nev;
  tibi.id = "cucc_nev";
  li.appendChild(tibi);  
  list.appendChild(li);}

fileButton.addEventListener("change", function (event) {
  if (document.getElementById('leiras').value !== false) {
    //   név
    var leirasText = document.getElementById('leiras').value;
    console.log('leiras', leirasText);
    alert("irjál valamit  elöször!");
    //function alert() {     
    //  if (leiras !== null) {        
    //  } else {       }
      //document.getElementById("leiras").innerHTML = leiras;  
    //alert(leiras, 'írj valamit a képről!');
    var file = event.target.files[0];
    //   csinál 
    var storageRef = firebase.storage().ref("/" + leirasText);
    //   feltöltés
    var uploadTask = storageRef.put(file);
    //   mutató
    uploadTask.on(
    "state_changed",
    function progress(snapshot) {
      var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      console.log("A feltöltés " + Math.floor(percentage) + " % kész.");
      switch (snapshot.state) {
        case firebase.storage.TaskState.paused: //  s
          console.log('A feltöltás áll');
          break;
        case firebase.storage.TaskState.running: //  m
          console.log('Halad nyugi');
          break;}
      uploader.value = percentage;
    },
    function error(error) {  console.error(error.message);
    },
    function complete() {
      var downloadUrl = uploadTask.snapshot.downloadURL;
      //  url     mentés db
      databaseRef.ref('foto_urls/' + leirasText).set({
        url: downloadUrl });
      alert('A cucc feltöltve.');
      addImage(leirasText, downloadUrl);
    });
  }
});