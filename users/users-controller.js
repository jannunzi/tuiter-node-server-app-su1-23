import people from "./users.js";
let users = people;

function UsersController(app) {
  const findAllUsers = (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else if (username) {
      const user = users.find((user) => user.username === username);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else {
      setTimeout(() => {
        // res.sendStatus(404);
        res.json(users);
      }, 2000);
    }
  };
  const findUserById = (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user._id === id);
    res.json(user);
  };
  const createUser = (req, res) => {
    const newUser = { ...req.body, _id: new Date().getTime() + "" };
    users.push(newUser);
    res.json(newUser);
  };
  const deleteUser = (req, res) => {
    const id = req.params.id;
    users = users.filter((user) => user._id !== id);
    res.sendStatus(200);
  };
  const updateUser = (req, res) => {
    const id = req.params.id;
    const newUser = req.body;
    users = users.map((user) =>
      user._id === id ? { ...user, ...newUser } : user
    );
    res.sendStatus(200);
  };

  app.get("/users", findAllUsers);
  app.get("/users/:id", findUserById);
  app.post("/users", createUser);
  app.delete("/users/:id", deleteUser);
  app.put("/users/:id", updateUser);
}

export default UsersController;
