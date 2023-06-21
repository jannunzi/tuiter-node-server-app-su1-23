import albumModel from "./album-schema.js";
import likesModel from "./likes-schema.js";

export const findAllAlbums = () => albumModel.find();
export const findAlbumById = (id) => albumModel.findById(id);
export const findAlbumByAlbumId = (albumId) => albumModel.findOne({ albumId });
export const createAlbum = (album) => albumModel.create(album);

export const createLike = (id, userId) =>
  likesModel.create({ album: id, user: userId });

export const findLikesForUser = (userId) =>
  likesModel.find({ user: userId }).populate("album").exec();
