import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MainForm = () => {
  const navigate = useNavigate();
  const [Error, setError] = useState(false);
  const [Data, setData] = useState({ name: "", room: "" });
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const Validation = () => {
    if (!Data.name) {
      setError("Please enter your name");
      return false;
    } else if (!Data.room) {
      setError("Please Select  your room");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const IsValid = Validation();
    if (IsValid) {
      navigate(`/chat/${Data.room}`, { state: Data });
    }
  };
  return (
    <>
      <form onSubmit={HandleSubmit}>
        <div className="container-s w-50 mx-auto bg-white shadow px-3 py-3 border rounded row ">
          <div className="form-group">
            <h1 className="text-center text-warning">Join Chat Room</h1>
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              name="name"
              className="shadow-none form-control"
              placeholder="Please Enter Your Name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-4">
            <select
              className="form-control shadow-none"
              name="room"
              onChange={handleChange}
            >
              <option selected value={"Select"} disabled>
                PLease Select
              </option>
              <option value={"Select"}>Social Room</option>
              <option value="gaming">Gaming Room</option>
              <option value="chat">Code Room</option>
            </select>
          </div>
          <small className="text-danger">{ Error}</small>
          <button className="btn btn-warning mt-4">Submit</button>
        </div>
      </form>
    </>
  );
};
