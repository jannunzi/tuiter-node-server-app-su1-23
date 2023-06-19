import * as tuitsDao from "./tuits-dao.js";

function TuitsController(app) {
  const findAllTuits = async (req, res) => {
    const tuits = await tuitsDao.findAllTuits();
    res.json(tuits);
  };
  const findTuitsByAuthorId = async (req, res) => {
    const author = req.params.author;
    const tuits = await tuitsDao.findTuitsByAuthorId(author);
    res.json(tuits);
  };
  const findMyTuits = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const tuits = await tuitsDao.findTuitsByAuthorId(currentUser._id);
    res.json(tuits);
  };
  const createTuit = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const newTuit = { ...req.body, author: currentUser._id };
    const actualTuit = await tuitsDao.createTuit(newTuit);
    res.json(actualTuit);
  };

  app.get("/api/tuits", findAllTuits);
  app.get("/api/tuits/:author", findTuitsByAuthorId);
  app.post("/api/tuits", createTuit);
  app.get("/api/my-tuits", findMyTuits);
}

export default TuitsController;
