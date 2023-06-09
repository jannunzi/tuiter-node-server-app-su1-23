import people from "./users.js";
let users = people;

function AuthenticationController(app) {
  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  };
  const register = (req, res) => {
    const user = users.find((user) => user.username === req.body.username);
    if (user) {
      res.sendStatus(403);
      return;
    }
    const newUser = { ...req.body, _id: new Date().getTime() + "" };
    users.push(newUser);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.sendStatus(403);
    }
  };
  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  app.post("/api/login", login);
  app.post("/api/register", register);
  app.get("/api/profile", profile);
  app.post("/api/logout", logout);
}

export default AuthenticationController;
