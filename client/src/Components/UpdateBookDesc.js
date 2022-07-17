import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
let openbook1 = require("../images/openbook1.png");

const UpdateBookDesc = (prop) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [favoriteQuote, setFavoriteQuote] = useState("");
  const [haveRead, setHaveRead] = useState("");
  const [bestRead, setBestRead] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/bookshelf/${id}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setDescription(res.data.description);
        setFavoriteQuote(res.data.favoriteQuote);
        setHaveRead(res.data.haveRead);
        setBestRead(res.data.bestRead);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateBookHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/bookshelf/${id}`, {
        title,
        author,
        description,
        favoriteQuote,
        haveRead,
        bestRead,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="secondaryheader">
        <h1>Update Book Description:</h1>
        <div>
          <button className="btn">
            <Link to="/home">Home</Link>
          </button>
          <button className="btn">
            <Link to="/addbook">Add</Link>
          </button>

        </div>
      </div>
      <div>
        <form onSubmit={updateBookHandler}>
          <img src={openbook1} className="bookshelf" alt="poaring tea" />
          <div className="row">
            <div className="left-col">
              <label>Title:</label>
              <br></br>
              <input
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br></br>
              <label>Author:</label>
              <br></br>
              <input
                name="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <br></br>
              <label className="textareadesc">Description:</label>
              <br></br>
              <input
                name="description"
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br></br>
            </div>
            <div className="right-col">
              <label>Favorite Quote:</label>
              <br></br>
              <input
                name="favoriteQuote"
                type="text"
                value={favoriteQuote}
                onChange={(e) => setFavoriteQuote(e.target.value)}
              />
              <br></br>
              <label>Have you read this book yet?</label>
              <br></br>
              <select
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
                When or where do you like to read this book?<br></br>
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
                <option value="By a fireplace">By a Fireplace</option>
                <option value="On a picnic">On a Picnic</option>
              </select>
              {""} <br></br>
            </div>
          </div>
          <input type="submit" value="Update Book!" className="updatebook"/>
        </form>
      </div>
    </div>
  );
};
export default UpdateBookDesc;
