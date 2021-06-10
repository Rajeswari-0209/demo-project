import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import logo from "./logo-twitterblue.svg";
import icon from "./sample-icon.jpg";
import heart from "./icon-heart-gray.svg";
console.log(logo);
console.log(icon);
console.log(heart);
function Edit() {
  // PLEASE READ DOCUMENTATION ABOUT useParams AND useHistory.
  // IT IS VERY IMPORTANT FOR FUNCTIONAL COMPONENTS.
  const { id } = useParams();
  const history = useHistory();
  useEffect(
    () =>
      axios
        .get("http://localhost:8000/tweets/" + id + "/")
        .then((response) =>
          setEditTweet({
            id: response.data.id,
            name: response.data.name,
            body: response.data.body,
            image: response.data.image,
          })
        )
        .catch((error) => console.error(error)),
    [id]
  );
  // Reading docs helps a lot when implementing new things.
  // @see https://reactrouter.com/web/guides/quick-start
  const [editTweet, setEditTweet] = useState({ id: "", name: "" });
  const handleUpdateTweet = () =>
    axios
      .put("http://localhost:8000/tweets/" + id + "/", {
        name: editTweet.name,
        body: editTweet.body,
      })
      .then((response) => history.push("/"))
      .catch((error) => console.error(error));

  return (
    <body class="home">
      <div class="container">
        <div className="main">
          <div className="main-header">
            <img src={logo} alt="Logo" class="logo" />
            <h1>Edit</h1>
          </div>
          <div class="tweet-post">
            <div class="my-icon">
              <img src={icon} alt="icon" />
            </div>
            <div class="input-area">
              <input
                type="text"
                placeholder="Edit tweet!"
                onChange={(e) =>
                  setEditTweet({ ...editTweet, name: e.target.value })
                }
                value={editTweet.name}
              />

              <textarea
                placeholder="What happening?"
                onChange={(e) =>
                  setEditTweet({ ...editTweet, body: e.target.value })
                }
                value={editTweet.body}
              ></textarea>
              <img src={editTweet.image} alt="" height="300" width="400" />
              <button class="btn" onClick={() => handleUpdateTweet()}>
                Update
              </button>
            </div>
          </div>
          <div class="ditch"></div>
        </div>
      </div>
    </body>
  );
}

export default Edit;
