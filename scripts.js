const ip_addr = document.getElementById("ip");
var socket;
//var gyroscope;
var secureContext = 0;
//var gyroscopeExists;
if (window.isSecureContext) {
  // Page is a secure context so service workers are now available
  console.log("In secure context");
  secureContext = 1;
  //if (typeof Gyroscope === "function"){
  //  gyroscope = new Gyroscope();
  //  gyroscopeExists = 1;
  //}
  navigator.permissions.query({name: "gyroscope"}).then((result) => {
  if (result.state === "denied") {
        console.log("Permission to use gyroscope sensor is denied.");
        return;
        }
    // Use the sensor.
    });}
function submit() {
    if (ip_addr.value != "") 
    socket = new WebSocket("ws://"+ ip_addr.value +":3000");
    const con_setup = document.getElementById("connection-setup");
    con_setup.remove();
    //console.log("ws://"+ ip_addr.value +":3000");
}

// const socket = new WebSocket("ws://10.249.64.132:3000");
//     socket.addEventListener("open", (event) => {
//         socket.send("Hello Server!");
//     });


function test(){
    console.log("test");
    socket.send("Test");
    socket.send("1");
    if(window.isSecureContext){
        socket.send("Coming from browser in secure context");
    }else{
        socket.send("Coming from browser in unsecure context");
        socket.send(secureContext)
    }
    //if(gyroscopeExists = 1){
    //    socket.send("Gyroscope exists");
    //}else{
    //    socket.send("Gyroscope does not exist");
    //}
};button

