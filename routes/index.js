const express = require('express');
const router = express.Router();
const threeRoute = require("./three");

router.use('/three', threeRoute);

module.exports = router;
