import React, { useState } from "react";
import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import HomeDisplay from "./Components/HomeDisplay";
import AddBookForm from "./Components/AddBookForm";
import BookDescription from "./Components/BookDescription";
import UpdateBookDesc from "./Components/UpdateBookDesc";
import Login from "./Components/Login";
import Register from "./Components/Register";
import colorbooks from "./colorbooks.png";
import "./App.css";
import flowerbook from "./images/floralbook.png";
import cup from "./images/cup1.png";

function App() {
  return (
    <div className="App">
      <div>
        <div className="welcomehead">
          <div>
            <img src={flowerbook} alt="flowerbook" className="flowerbook" />
          </div>
          <div>
            <h1 className="header">Abiblio•Bookshelf</h1>
            <p className="littleheader">
              Where you never run out of reading material
            </p>
          </div>
          <div>
            <img src={cup} className="cup" alt="bookshelf" />
          </div>
        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Register />} path="/Register" />
          <Route element={<AddBookForm />} path="/AddBook" />
          <Route element={<BookDescription />} path=":id" />
          <Route element={<HomeDisplay />} path="/Home" />
          <Route element={<UpdateBookDesc />} path=":id/Update" />
        </Routes>
      </BrowserRouter>
      <div>
        <img src={colorbooks} className="colorbooks" alt="colorbooks" />
      </div>
    </div>
  );
}

export default App;
