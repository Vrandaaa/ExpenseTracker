const UserData = require("../models/UserData");
const userData = require("../models/UserData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");

const signUpHandler = async (req, res) => {
    const { email, password , name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({
            success: false,
            message: "please fill the details."
        })
    }
    const userExists = await userData.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "User already exists."
        })
    }
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
        return res.status(400).json({
            success: false,
            messgae: "There is some error in hashing the password.",
            error: error
        })
    }

    const user = await userData.create({
        name:name, email: email, password: hashedPassword
    })
    return res.status(200).json({
        success: true,
        message: "Entry created in database "
    })
}

const loginHandler = async (req, res) => {
    console.log("LOGIN CONTROLLER HIT");
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "please fill the details."
        })
    }
    let user = await UserData.findOne({ email });
    if (!user) {
        return res.status(500).json({
            success: false,
            message: "New user please signup first."
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        const payload = {
            // email : user.email,
            id: user._id,
        }
        const token = jwt.sign(payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "2h",
            }
        );

        user = user.toObject();
        user.password = undefined;
        user.token = token;
        return res.status(200).json({
            success: true,
            user: user,
            message: "login Successfull."
        })
    }
    return res.status(400).json({
        success: false,
        // user:user,
        message: "Password didn't match."
    })
}

module.exports = { signUpHandler, loginHandler };