import * as dao from "./album-dao.js";

export default function AlbumController(app) {
  const findAllAlbums = async (req, res) => {
    const albums = await dao.findAllAlbums();
    res.json(albums);
  };
  const findAlbumById = async (req, res) => {
    const id = req.params.id;
    const album = await dao.findAlbumById(id);
    res.json(album);
  };
  const findAlbumByAlbumId = async (req, res) => {
    const albumId = req.params.albumId;
    const album = await dao.findAlbumByAlbumId(albumId);
    res.json(album);
  };
  const createAlbum = async (req, res) => {
    const album = req.body;
    const newAlbum = await dao.createAlbum(album);
    res.json(newAlbum);
  };

  const likeAlbum = async (req, res) => {
    const albumId = req.params.albumId;
    const album = await dao.findAlbumByAlbumId(albumId);
    let album123 = null;
    if (album) {
      album.likes = album.likes + 1;
      await album.save();
      album123 = album;
    } else {
      const newAlbum = await dao.createAlbum({
        ...req.body,
        albumId,
        likes: 1,
      });
      album123 = newAlbum;
    }
    const currentUser = req.session["currentUser"];
    console.log("req.session", req.session);
    const userId = currentUser._id;
    await dao.createLike(album123._id, userId);
    res.json(album123);
  };

  const findAlbumsILike = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    const likes = await dao.findLikesForUser(userId);
    const albums = likes.map((like) => like.album);
    res.json(albums);
  };

  app.get("/api/albums", findAllAlbums);
  app.get("/api/albums/:id", findAlbumById);
  app.get("/api/albums/albumId/:albumId", findAlbumByAlbumId);
  app.post("/api/albums", createAlbum);
  app.post("/api/albums/albumId/:albumId/like", likeAlbum);
  app.get("/api/albums/i/like", findAlbumsILike);
}
