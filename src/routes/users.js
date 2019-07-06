const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const validation = require("./validation.js")

router.post("/users", validation.validateUsers,userController.create );
router.post("/users/signIn",userController.signIn);
router.get("/users/signOut", userController.signOut)


module.exports = router;
