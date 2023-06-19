import * as usersDao from "./users-dao.js";
// import people from "./users.js";
// let users = people;

function UsersController(app) {
  const findAllUsers = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
      // const user = users.find(
      //   (user) => user.username === username && user.password === password
      // );
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else if (username) {
      // const user = users.find((user) => user.username === username);
      const user = await usersDao.findUserByUsername(username);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else {
      // setTimeout(() => {
      // res.sendStatus(404);
      const users = await usersDao.findAllUsers();
      res.json(users);
      // }, 2000);
    }
  };
  const findUserById = async (req, res) => {
    const id = req.params.id;
    // const user = users.find((user) => user._id === id);
    const user = await usersDao.findUserById(id);
    res.json(user);
  };
  const createUser = async (req, res) => {
    const newUser = await usersDao.createUser(req.body);
    res.json(newUser);
  };
  const deleteUser = async (req, res) => {
    const id = req.params.id;
    // users = users.filter((user) => user._id !== id);
    await usersDao.deleteUser(id);
    res.sendStatus(200);
  };
  const updateUser = async (req, res) => {
    const id = req.params.id;
    const status = await usersDao.updateUser(id, req.body);
    // const newUser = req.body;
    // users = users.map((user) =>
    //   user._id === id ? { ...user, ...newUser } : user
    // );
    res.json(status);
  };

  app.get("/users", findAllUsers);
  app.get("/users/:id", findUserById);
  app.post("/users", createUser);
  app.delete("/users/:id", deleteUser);
  app.put("/users/:id", updateUser);
}

export default UsersController;
