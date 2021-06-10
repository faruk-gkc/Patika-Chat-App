import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("http://localhost:4000");

function App() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socket.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <p>
          <span>{name}:</span> {message}
        </p>
      </div>
    ));
  };

  return (
    <div className="d-flex align-items-center justify-content center m-4 flex-wrap">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <form
              onSubmit={onMessageSubmit}
              className="d-flex flex-column justify-content-between align-items-start"
            >
              <h1 className="display-4">Messenger</h1>
              <div className="mb-5">
                <input
                  type="text"
                  label="Username"
                  value={state.name}
                  name="name"
                  onChange={(e) => onTextChange(e)}
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="message"
                  value={state.message}
                  onChange={(e) => onTextChange(e)}
                  class="form-control"
                  placeholder="Message"
                  aria-label="Message"
                  aria-describedby="basic-addon1"
                />
              </div>
              <button type="submit" class="btn btn-outline-danger mt-4">
                Send Message
              </button>
            </form>
          </div>
          <div className="col-md-5 offset-md-2">
            <div className="render-chat">
              <h1 className="display-4">Chat Log</h1>
              {renderChat()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
