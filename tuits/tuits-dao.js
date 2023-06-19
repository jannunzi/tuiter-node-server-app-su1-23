import tuitsModel from "./tuits-model.js";

export const findAllTuits = () =>
  tuitsModel.find().populate("author", "username").exec();

export const findTuitsByAuthorId = (author) => tuitsModel.find({ author });

export const createTuit = (tuit) => tuitsModel.create(tuit);
