const express = require("express");
const router = express.Router();

const itemsController = require("../controllers/itemsController.js")

router.post("/shopList/:id/create", itemsController.create);
router.post("/shopList/:id/items/:id/delete", itemsController.destroy);
router.post("/shopList/:id/items/:id/mark", itemsController.mark);
router.post("/shopList/:id/items/:id/unMark", itemsController.unMark);

module.exports = router;
