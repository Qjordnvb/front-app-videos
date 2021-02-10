import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Video } from "./interface.video";
import { toast } from "react-toastify";
import * as videoService from "./video-services";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params {
  id?: string;
}

const VideoForm = () => {
  const history = useHistory();
  const params = useParams<Params>();
  const initialState = {
    title: "",
    description: "",
    url: "",
  };

  const [video, setVideo] = useState<Video>(initialState);

  const getVideo = async (id: string) => {
    const res = await videoService.getVideoById(id);
    const { title, description, url } = res.data;
    setVideo({ title, description, url });
  };

  useEffect(() => {
    if (params.id) getVideo(params.id);
  }, [params.id]);

  const handleInputChange = (e: InputChange) =>
    setVideo({ ...video, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      await videoService.createNewVideo(video);
      setVideo(initialState);
      toast.success("New Video Added");
    } else {
      await videoService.updateVideo(params.id, video);
    }
    history.push("/videos");
  };

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New video</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="write a title for video"
                  className="form-control"
                  onChange={handleInputChange}
                  autoFocus
                  value={video.title}
                />
              </div>
              <div className="form-group">
                <input
                  type="url"
                  name="url"
                  placeholder="https://somesite.com"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.url}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  rows={3}
                  placeholder="write a description"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.description}
                />
              </div>
              {params.id ? (
                <button className="btn btn-info">Upted video</button>
              ) : (
                <button className="btn btn-success">Create video</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
