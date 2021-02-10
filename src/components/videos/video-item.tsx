import React from "react";
import { Video } from "./interface.video";
import ReactPlayer from "react-player";
import "./video.css";
import { useHistory } from "react-router-dom";
import * as videoService from "./video-services";

interface Props {
  video: Video;
  loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {
  const history = useHistory();

  const handleDelete = async (id: string) => {
    await videoService.deleteVideoById(id);
    return loadVideos();
  };

  return (
    <div className="col-md-4 p-4">
      <div
        className="card card-body video-card"
        style={{
          height: "30rem",
          cursor: "pointer",
        }}
      >
        <div className="d-flex justify-content-between">
          <h1
            style={{ width: "100%" }}
            onClick={() => history.push(`/update/${video._id}`)}
          >
            {video.title}
          </h1>
          <span
            className="text-danger"
            onClick={() => video._id && handleDelete(video._id)}
          >
            X
          </span>
        </div>
        <p>{video.description}</p>
        <div className="embed-responsive embed-responsive-16by9">
          <ReactPlayer url={video.url} />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
