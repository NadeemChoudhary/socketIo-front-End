import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainForm } from "./Components/MainForm";
import ChatRoom from "./Components/ChatRoom";
function App() {
  return (
    <>
      <div className="container w-100 d-flex justify-content-center align-items-center" style={{height : '100vh'}}>
        <Router>
          <Routes>
            <Route index element={<MainForm />}></Route>
            <Route
              path={"/chat/:roomName"}
              element={<ChatRoom />}
            ></Route>
            <Route path="*" element={<h1>NOT FOUND</h1>}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
