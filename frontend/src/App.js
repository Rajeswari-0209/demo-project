import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import logo from "./logo-twitterblue.svg";
import icon from "./sample-icon.jpg";
import heart from "./icon-heart-gray.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Edit from "./Edit";
console.log(logo);
console.log(icon);
console.log(heart);
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/edit/:id">
          <Edit />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  const [tweets, setTweets] = useState("");
  const [newTweet, setNewTweet] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newImage, setNewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "geekyimages");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/techis/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    setImage(file.secure_url);
    setLoading(false);
  };
  const fetchDataFromBackend = () =>
    axios
      .get("https://demo-backend-productions.herokuapp.com/tweets/")
      .then((response) => setTweets(response.data))
      .catch((error) => console.error(error));
  useEffect(fetchDataFromBackend, []);
  const handleNewTweet = () =>
    axios
      .post("https://demo-backend-productions.herokuapp.com/tweets/", {
        name: newTweet,
        body: newBody,
        image: image,
      })
      .then((response) => fetchDataFromBackend())
      .catch((error) => console.error(error));

  const handleDeleteTweet = (id) =>
    axios
      .delete("https://demo-backend-productions.herokuapp.com/tweets/" + String(id) + "/")
      .then((response) => fetchDataFromBackend())
      .catch((error) => console.error(error));
  return (
    <body class="home">
      <div class="container">
        <div className="main">
          <div className="main-header">
            <img src={logo} alt="Logo" class="logo" />
            <h1>Home</h1>
          </div>
          <div class="tweet-post">
            <div class="my-icon">
              <img src={icon} alt="icon" />
            </div>
            <div class="input-area">
              <form>
                <div>
                  <input
                    type="text"
                    placeholder="Name!"
                    onChange={(e) => setNewTweet(e.target.value)}
                    value={newTweet}
                  />
                </div>

                <div>
                  <textarea
                    placeholder="What happening?"
                    onChange={(e) => setNewBody(e.target.value)}
                    value={newBody}
                  ></textarea>
                </div>
                <div></div>
                <div class="bottom-area">
                  <div class="mb-0">
                    {/* <input
                      type="file"
                      onChange={(e) => setNewImage(e.target.value)}
                      value={newImage}
                    /> */}
                    <input
                      type="file"
                      name="file"
                      placeholder="upload file"
                      onChange={uploadImage}
                    ></input>
                  </div>
                  <button class="btn" onClick={() => handleNewTweet()}>
                    Tweet
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="ditch"></div>
          <div class="content">
            <div class="name">
              {tweets.length > 0 &&
                tweets.map((tweet) => (
                  <div class="tweet-post">
                    <div class="my-icon">
                      <img src={icon} alt="icon" />
                    </div>
                    <div>
                      <tr>{tweet.name}</tr>
                      <tr>
                        <p>{tweet.body}</p>
                      </tr>
                      <tr>
                        <img
                          src={tweet.image}
                          alt=""
                          height="300"
                          width="400"
                        />
                      </tr>
                      <tr>
                        <button
                          class="button"
                          onClick={() => handleDeleteTweet(tweet.id)}
                        >
                          Delete
                        </button>
                        <Link to={`/edit/` + tweet.id}>
                          <button class="button">Update</button>
                        </Link>

                        {/* <Link to="/edit">edit</Link> */}
                      </tr>
                      <tr>
                        <div class="like">
                          <p>
                            <img src={heart} alt="heart" />

                            {tweet.like_count}
                          </p>
                        </div>
                      </tr>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
