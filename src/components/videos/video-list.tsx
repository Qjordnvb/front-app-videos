import React, { useEffect, useState } from "react";

import * as videoService from "./video-services";

import { Video } from "./interface.video";
import VideoItem from "./video-item";

const VideoList = (): JSX.Element => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVideos = async () => {
    const res = await videoService.getVideos();

    const formatedVideos = res.data
      .map((video) => {
        return {
          ...video,
          createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
          updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    setVideos(formatedVideos);
    setLoading(false);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  if (loading)
    return (
      <div className="row">
        <div className="col-md-12 my-auto">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );

  if (videos.length === 0) return <div>there are no videos yet</div>;

  return (
    <div className="row">
      {videos.map((video) => {
        return (
          <VideoItem key={video._id} video={video} loadVideos={loadVideos} />
        );
      })}
    </div>
  );
};

export default VideoList;
