import axios from "axios";
import { Video } from "./interface.video";

const API = "http://localhost:8000";

export const getVideos = async () => {
  return await axios.get<Video[]>(`${API}/videos`);
};

export const createNewVideo = async (video: Video) => {
  return await axios.post(`${API}/videos`, video);
};

export const deleteVideoById = async (id: string) => {
  return await axios.delete(`${API}/videos/${id}`);
};

export const getVideoById = async (id: string) => {
  return await axios.get<Video>(`${API}/videos/${id}`);
};

export const updateVideo = async (id: string, video: Video) => {
  return await axios.put<Video>(`${API}/videos/${id}`, video);
};
