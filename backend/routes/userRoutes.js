const express = require("express");
const router = express.Router();

const {signUpHandler , loginHandler} = require("../controllers/Auth");

router.post("/signup" , signUpHandler);
router.post("/login" , loginHandler);

module.exports = router;