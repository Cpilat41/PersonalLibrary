import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
let openbook = require("../images/openbook1.png");

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [favoriteQuote, setFavoriteQuote] = useState("");
  const [haveRead, setHaveRead] = useState("");
  const [bestRead, setBestRead] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log({
      title,
      author,
      description,
      favoriteQuote,
      haveRead,
      bestRead,
    });
    axios
      .post(
        "http://localhost:8000/api/bookshelf/addbook",
        {
          title,
          author,
          description,
          favoriteQuote,
          haveRead,
          bestRead,
        },
        {
          withCredentials: true
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.error.errors);
        setErrors(err.response.data.error.errors);
      });
  };

  return (
    <div>
      <div>
        <div className="secondaryheader">
          <h1 className="header">Add books to your Bookshelf</h1>
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
        <form onSubmit={onSubmitHandler} className="form">
          <img src={openbook} className="bookshelf" alt="bookshelf" />
          <div className="row">
            <div className="left-col">
              <label>Title: </label>
              <br></br>
              <input
                placeholder="Book Title..."
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {/* {errors.title ? <p>{errors.title.message}</p> : null} */}
              <br></br>
              <label>By: </label>
              <br></br>
              <input
                placeholder="Author..."
                name="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              {/* {errors.author ? <p>{errors.author.message}</p> : null} */}
              <br></br>
              <label>Description: </label>
              <br></br>
              <input
                placeholder="Short Description..."
                className="textareadesc"
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* {errors.description ? <p>{errors.description.message}</p> : null} */}
              <br></br>
            </div>
            <div className="right-col">
              <label>Favorite Quote: </label>
              <br></br>
              <input
                placeholder="Quote..."
                name="favoriteQuote"
                type="text"
                value={favoriteQuote}
                onChange={(e) => setFavoriteQuote(e.target.value)}
              />
              <div>
                <label>Have you read this book yet?</label>
                <br></br>
                <select
                  className="dropdown"
                  name="haveRead"
                  ids="haveRead"
                  onChange={(e) => setHaveRead(e.target.value)}
                >
                  <option value="">------</option>
                  <option value="Yes">Yes!</option>
                  <option value="No">Not yet!</option>
                </select>
                {""}
                <br></br>
                <label>
                  Best time or place to read this book?<br></br>
                </label>
                <select
                  name="bestRead"
                  ids="bestRead"
                  onChange={(e) => setBestRead(e.target.value)}
                >
                  <option value="">------</option>
                  <option value="Hiking/Camping">Hiking/Camping</option>
                  <option value="When it's cold">When it's Cold</option>
                  <option value="Spooky Season">Spooky Season</option>
                  <option value="On a Rainy Day">On a Rainy Day</option>
                  <option value="By a fireplace">By a fireplace</option>
                  <option value="On a picnic">On a picnic</option>
                </select>
                {""} <br></br>
              </div>
            </div>
          </div>
          <div>
            <input type="submit" value="Add Book!" className="Addbookbtn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
