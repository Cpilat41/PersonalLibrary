import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
let openbook = require("../images/openbook1.png");


const HomeDisplay = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/Bookshelf/home")
      .then((res) => {
        console.log(res.data);
        setAllBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHandler = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/bookshelf/${idFromBelow}`)
      .then((res) => {
        console.log("deleted successfully");
        console.log(res);
        const filteredBooks = allBooks.filter((book) => {
          return book._id !== idFromBelow;
        });
        setAllBooks(filteredBooks);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = (e) => {
    axios
      .post(
        `http://localhost:8000/api/users/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="secondaryheader">
        <h1>Welcome!</h1> 

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
          <button onClick={logout} className="btn">
            Log Out
          </button>
        </div>
      </div>
      <Link to="/addbook">
        <img src={openbook} className="bookshelf" alt="bookshelf" />
      </Link>
      <div className="displaytable">
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Update</th>
            <th>Read?</th>
            <th>Best Place to read?</th>
            <th>Remove Book</th>
          </tr>
          {allBooks.map((book, index) => {
            {
              console.log(book);
            }
            return (
              <tr key={index}>
                <td>
                  <Link to={`/${book._id}`}>{book.title}</Link>
                </td>
                <td>{book.author}</td>
                <td>
                  <Link to={`/${book._id}/update`}>Update</Link>
                </td>
                <td>{book.haveRead}</td>
                <td>{book.bestRead}</td>
                <td className="button">
                  <button
                    onClick={() => deleteHandler(book._id, index)}
                    className="bounce_button"
                  >
                    Delete
                  </button>

                  {/* Delete button */}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default HomeDisplay;
