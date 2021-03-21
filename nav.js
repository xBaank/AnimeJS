function openNav() {
  
var x = window.matchMedia("screen and (max-width: 750px)");

if(x.matches) {
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("mySidenav").style.textAlign = "center";
}
else {
  document.getElementById("mySidenav").style.width = "20%";
  document.getElementById("mySidenav").style.textAlign = "left";
}


}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


  