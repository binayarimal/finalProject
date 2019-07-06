const express = require("express");
const router = express.Router();

const collabController = require("../controllers/collabController.js")
router.post("/ShopList/:id/collab", collabController.collab);


module.exports = router;
