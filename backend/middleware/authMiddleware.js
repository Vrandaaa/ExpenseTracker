const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");
require("dotenv").config();

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found."
            })
        }
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid token.",
                error: error,
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went worng , please try again later.",
            error: err,
        })
    }
}
const getMe = (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
        message:"welcome back user"
    });
};

module.exports = {getMe , auth}
