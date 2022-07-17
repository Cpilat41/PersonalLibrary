import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
let bookshelf = require("../images/bookshelf.png");
let openbook = require("../images/openbook1.png");

const BookDescription = () => {
  const { id } = useParams();
  const [BookDesc, setBookDesc] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/bookshelf/${id}`)
      .then((res) => {
        console.log(res.data);
        setBookDesc(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="secondaryheader">
        <h1>Book Description:</h1>
        <div>
          <button className="btn">
            <Link to="/Home">Home</Link>
          </button>
          <button className="btn">
            <Link to="/addbook">Add</Link>
          </button>
          <button className="btn">
            <Link to="/Register">Register</Link>
          </button>
          <button className="btn">
            <Link to="/">Log In</Link>
          </button>
          <button className="btn">
            <Link to="/logout">Log Out</Link>
          </button>
        </div>
      </div>
      <div>
        <img src={openbook} className="bookshelf" alt="bookshelf" />
        <h1 className="title">{BookDesc.title}</h1>
      </div>
      <div className="row">
        <div className="left-col">
          <span className="desc">Written By:</span> {BookDesc.author}
          <br></br>
          <br></br>
          <span className="desc">Description: </span>
          <br></br>
          {BookDesc.description}
          <br></br>
          <br></br>
          <span className="desc">Have you read this book yet? </span>
          <br></br>
          {BookDesc.haveRead}
        </div>
        <div className="right-col">
          <span className="desc">Favorite Quote:</span>
          <br></br> "{BookDesc.favoriteQuote}"<br></br>
          <br></br>
          <span className="desc">Best place to read this book?</span>
          <br></br>
          {BookDesc.bestRead}
        </div>
      </div>
    </div>
  );
};

export default BookDescription;
