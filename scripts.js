const ip_addr = document.getElementById("ip");
var socket;
var gyroscope;
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

function failedgyro(WebSocket){
    console.log("Gyroscope query failed");
    socket.send("Gyro failed :<");
}
function passedgyro(PermissionStatus){
    if (result.state === "denied") {
                console.log("Permission to use gyroscope sensor is denied.");
                socket.send("no gyroscope :(");
                
            }
        else if (result.state === "granted"){
            console.log("Permission to use gyroscope sensor exists");
            socket.send("yes gyroscope :)");
            setupgyro();
        }
        else if (result.state === "prompt"){
            console.log("Permission to use gyroscope sensor needs to be granted");
            socket.send("gyroscope prompt :/");
        }
        else{
            console.log("Gyroscope error");
            socket.send("Gyroscope unknown :3");
        }
}
async function setupgyro(){
    gyroscope = new Gyroscope({frequency: 60});
    gyroscope.addEventListener("reading", (e) => {
        console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
        console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
        console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);
        socket.send(`Angular velocity along the X-axis ${gyroscope.x}`);
        socket.send(`Angular velocity along the Y-axis ${gyroscope.y}`);
        socket.send(`Angular velocity along the Z-axis ${gyroscope.z}`);
    });
}

async function test(){
    //console.log("beginning await");
    result = await navigator.permissions.query({name: "gyroscope"});
    //console.log("done await, starting if/else");
    if(result){
        console.log("if true, running command");
        passedgyro(result);
    }else{
        console.log("else true, running command");
        failedgyro(socket);
    }
    //console.log("if/else block done");
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

