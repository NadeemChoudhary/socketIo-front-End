import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
const ChatRoom = () => {
  const { state } = useLocation();
  const View = useRef();
  const [msg, setmsg] = useState("");
  const [AllMessages, setAllMessages] = useState([]);
  const [socket, setsocket] = useState("");
  const Send = () => {
    if (msg) {
      const message = {
        time: new Date().toLocaleDateString(),
        msg,
        name: state.name,
      };
      socket.emit("newMessage", { message, Room: state.room });

      // setAllMessages([...AllMessages, message]);
    }
  };
  const handleAuto = (e) => {
    if (e.keyCode === 13) {
      Send();
    }
  };

  useEffect(() => {
    const socket = io("https://socket-io-back-end.vercel.app");
    setsocket(socket);
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      socket.emit("joinRoom", state.room);
    });
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("getLatestMessage", (getLatestMessage) => {
        console.log(getLatestMessage);
        setAllMessages([...AllMessages, getLatestMessage]);
        View?.current.scrollIntoView({ behavior: "smooth" });
        setmsg("");
      });
    }
  }, [socket, AllMessages]);

  return (
    <>
      <div className="container bg-white rounded border shadow p-3 w-50">
        <div className="heading">
          <h1 className="text-warning text-center text-capitalize">
            {state?.room} Chat Room
          </h1>
        </div>
        <div
          className="border  bg-light px-3"
          style={{ height: "400px", overflowY: "scroll", overflowX: "hidden" }}
        >
          {AllMessages.map((message, i) =>
            state.name === message.name ? (
              <div className="row justify-content-end pl-5 ">
                <div className="d-flex flex-column align-items-end m-2 shadow p-2 bg-warning border rounded w-auto " style={{maxWidth : "50%"}}>
                  <div>
                    <strong className="m-1">{message.name}</strong>
                    <small className="text-muted m-1">
                      <small>{message.time}</small>
                    </small>
                  </div>
                  <h4 className="m-1">{message.msg}</h4>
                </div>
              </div>
            ) : (
              <div className="row justify-content-start">
                <div className="d-flex flex-column m-2 p-2 shadow bg-white border rounded w-auto " style={{maxWidth : "50%"}}>
                  <div>
                    <strong className="m-1">{message.name}</strong>
                    <small className="text-mmuted m-1">
                      <small>{message.time}</small>
                    </small>
                  </div>
                  <h4 className="m-1">{message.msg}</h4>
                </div>
              </div>
            )
          )}
          <div ref={View}></div>
        </div>
        <div className="d-flex mt-2" >
          <input
            onChange={(e) => setmsg(e.target.value)}
            type="text"
            name="send"
            id=""
            placeholder="Your Message"
            className="shadow-none form-control"
            value={msg}
            onKeyDown={handleAuto}
          />
          <button onClick={Send} className="btn border bg-warning">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
