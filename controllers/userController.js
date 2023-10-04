const { register, login } = require("../services/userService.js");

const userController = require("express").Router();

userController.get("/register", async (req, res) => {
  try {
    res.render("register", {
      title: "Register",
    });
  } catch (err) {
    console.log(err);
  }
});

userController.post("/register", async (req, res) => {
  try {
    const token = await register(req.body);
    res.cookie('auth',token,{httpOnly : true})
    res.redirect('/')
  } catch (err) {
    console.log(err);
  }
});

userController.get("/login", async (req, res) => {
  try {
    res.render("login", {
      title: "Login",
    });
  } catch (err) {
    console.log(err);
  }
});

userController.post("/login", async (req, res) => {
  try {
    const token = await login(req.body);
    res.cookie('auth',token,{httpOnly : true})
    res.redirect('/')
  } catch (err) {
    console.log(err);
  }
});

module.exports = userController;
