const express = require("express");
const router = express.Router();

const {signUpHandler , loginHandler , logoutHandler} = require("../controllers/Auth");
const{auth , getMe} = require("../middleware/authMiddleware");


router.post("/signup" , signUpHandler);
router.post("/login" , loginHandler);
router.post("/logout" , logoutHandler);
router.get("/me",auth , getMe);


module.exports = router;