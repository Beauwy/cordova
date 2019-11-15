// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDpGGVZib9xCafbvGhoEj1T1-jJ0ptkab8",
    authDomain: "foodpj-9550d.firebaseapp.com",
    databaseURL: "https://foodpj-9550d.firebaseio.com",
    projectId: "foodpj-9550d",
    storageBucket: "foodpj-9550d.appspot.com",
    messagingSenderId: "603895277613",
    appId: "1:603895277613:web:e330f1b4fe8ad86b0870a4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

var cc;
function cate(cate_id){
  cc  = cate_id;
  document.querySelector('#myNavigator').pushPage('catagory.html')
}

var tt;
function thai(th_id){
  tt  = th_id;
  document.querySelector('#myNavigator').pushPage('menu.html')
}

document.addEventListener('init', function (event) {
  var page = event.target;


  if (page.id === 'homePage') {
    console.log("homePage");


    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

    $("carousel").empty();
    db.collection("restaurant").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().rest_id}" class="recomended_item" onclick="cate(${doc.data().rest_id})">
            <img src="${doc.data().rest_url}" width="120" height="120"></div>
            <div class="recomended_item_title" id="item1_${doc.data().rest_id}">${doc.data().rest_name}</div>
        </ons-carousel-item>`
        $("#carousel").append(item);
      });
    });
  
  


    $("#itemlist").empty();

    db.collection("rest_01").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {   
        
        var item = `
        <ons-list-item tappable  id="menulist${doc.data().r_id}"   onclick="category(${doc.data().r_id})"  style="color:rgb(255, 255, 255);" >      
            
            <img src="${doc.data().r_url}" width="80" height="82"  >
            &nbsp;&nbsp;<p style="  font-size:20px; color:rgb(0, 0, 0);"> ${doc.data().r_name}   </p> 
            <dev class="right">   
            
             </dev>
             
        
        </ons-list-item>   `
        $("#itemlist").append(item);
      });
    });
  
  
  
  
  
  
  
  }

  if (page.id === 'menuPage') {
    console.log("menuPage");

    $("#login").click(function () {
      $("#content")[0].load("login.html");
      $("#sidemenu")[0].close();
    });

    $("#home").click(function () {
      $("#content")[0].load("home.html");
      $("#sidemenu")[0].close();
    });

    $("#location").click(function () {
   //   $("#content")[0].load("location.html");
      document.querySelector('#myNavigator').pushPage('location.html')
      $("#sidemenu")[0].close();
    });
  }

  if (page.id === 'categoryPage') {
    var category = localStorage.getItem("selectedCategory");
    console.log("categoryPage:" + category);

    $("#header").html(category);

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });



    

    $("#carousel2").empty();
    db.collection("rest_01").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `
    
    
    
    
    <ons-list-item tappable  id="menulist${doc.data().r_id}"   onclick="category(${doc.data().r_id})"  style="color:rgb(255, 255, 255);" >      
            
    <img src="${doc.data().r_url}" width="80" height="82"  >
    &nbsp;&nbsp;<p style="  font-size:20px;color:rgb(250, 250, 250)"> ${doc.data().r_name}   </p> 
    <dev class="right">   
    
     </dev>
     

</ons-list-item>  
    
    
    
    
    
    
    
    
    
    
    
    
    
    `
        $("#carousel2").append(item);
      });
    });

  }

  if (page.id === 'loginPage') {
    console.log("loginPage");

    $("#backhomebtn").click(function () {
      $("#content")[0].load("home.html");
    });
  }


  if (page.id === 'LocationPage') {
    console.log("LocationPage");


    page.querySelector('ons-toolbar .center').innerHTML = 'Address';

    var latitude, selectedLatitude;
    var longitude, selectedLongitude;
  
    var onSuccess = function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  
      mapboxgl.accessToken = 'pk.eyJ1IjoibGlsbHkyNzAyIiwiYSI6ImNrMnl6cmV0cTBkb3IzYnBubndjZ2JybnUifQ.G0fYYnNL-b-tCkmFcWttIw';
      var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [longitude, latitude], // starting position [lng, lat]
        zoom: 14 // starting zoom
      });
  
      // selectedLatitude = latitude;
      // selectedLongitude = longitude;
  
      var marker = new mapboxgl.Marker({
        draggable: true
      })
        .setLngLat([longitude, latitude])
        .addTo(map);
      onDragEnd();
      function onDragEnd() {
        var lngLat = marker.getLngLat();
        selectedLatitude = lngLat.lat;
        selectedLongitude = lngLat.lng;
  
        coordinates.style.display = 'block';
        coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
      }
  
      marker.on('dragend', onDragEnd);
    };
  
    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }
  
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  
    $("#setAddress").click(function () {
      console.log("Latitude is " + selectedLatitude + " Longitude is " + selectedLongitude);
      $("#content")[0].load("completeOrder.html");
      // ons.notification.alert();
    });
  
    $("#backbtn").click(function () {
      $("#content")[0].load("foodCategory.html");
    });






  }





});
