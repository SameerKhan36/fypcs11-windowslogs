import { io } from "socket.io-client";

// const serverURl = "http://172.104.174.187:4078";
const serverURl = "http://localhost:4078";
const socket = io(serverURl);

//Event emitters.

export const emitData = (data) => {
    console.log('windows-logs event triggered!')
  socket.emit("windows-logs", data);
};

//Event listeners.

export const listenerData = (lines) => {
  socket.on("windows-logs",(d) => {
    // const {lineData} = d;
    console.log('listened windows-logs event');
    // console.log(d)
    // const myDiv = document.getElementById("data").innerHTML
    console.log("listened: ", d)
    // if (d) {
    //   lines(oldArr => [...oldArr, d])
    // }

  })
}