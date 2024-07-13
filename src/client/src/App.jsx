// CSS
import "./CSS/index.css";

//Components
import Chat from "./Components/Chat.jsx";
import { useEffect, useRef } from "react";

//socket
import { io } from "socket.io-client";

const socket = io({
  autoConnect: false
})

export default function App() {
  const nameRef = useRef("");

  useEffect(() => {
    setTimeout(() => {
      let n = prompt("Enter your name: ");
      if (!n) n = "Guest";
      nameRef.current = n;
      socket.on("connect", () => socket.emit("join", n));
      socket.connect();
    }, 500);
  }, []);

  return (
    <div>
      <div className="mainDiv">
        <Chat name={nameRef} socket={socket}/>
      </div>
    </div>
  );
}
