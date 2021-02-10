import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import VideoList from "./components/videos/video-list";
import VideoForm from "./components/videos/video-form";
import Navbar from "./components/navbar/navbar";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "bootswatch/dist/lux/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route
            exact
            path="/"
            component={VideoList}
          />
          <Route
            path="/new-video"
            component={VideoForm}
          />
          <Route
            path="/update/:id"
            component={VideoForm}
          />
        </Switch>
        <ToastContainer />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
