const userQueries = require("../db/Queries.user.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
module.exports = {
  create(req, res, next){
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if(err){
        res.send(err);
        console.log(err)
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send("success")
        })
      }
    });
  },
  signIn(req, res, next){
      passport.authenticate("local")(req, res, function () {
        if(!req.user){
          res.send("error")
        } else {
          res.send(req.user);
        }
      })
    },
  signOut(req, res, next){
  req.logout();
  res.send("You've successfully signed out!");
}


}
