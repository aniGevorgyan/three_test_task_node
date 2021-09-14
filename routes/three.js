const express=require("express");
const router=express.Router();
const { lastPosition, getList, getOne } = require("../controllers/threeController");

router.post("/", lastPosition);
router.get("/", getList);
router.get("/:id", getOne);

module.exports = router;
