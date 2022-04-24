const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const bcryptjs = require("bcryptjs")

exports.signUp = async (req, res) => {
    const { username, password } = req.body
    try {
        const hashPassword = await bcryptjs.hash(password, 12)
        const newUser = await User.create({
            username,
            password: hashPassword
        })
        req.session.user = newUser;
        res.status(201).json({
            status: "Signup success",
            data: {
                user: newUser
            }
        })
    }
    catch (e)
    {
        console.log(e)
        res.status(400).json({
            status: "Signup fail"
        })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({username})
        if (!user)
        {
            return res.status(400).json({
                status: "Login fail",
                message: "User not found"
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if (isCorrect) 
        {
            req.session.user = user;
            res.status(200).json({
                status: "Login success"
            })
        }
        else 
        {
            res.status(400).json({
                status: "Login fail",
                message: "Incorrect username or password"
            })
        }
    }
    catch (e)
    {
        console.log(e)
        res.status(400).json({
            status: "fail"
        })
    }
}

exports.logout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user
        res.status(200).json({
            status: "Logout success"
            })
    }
    else {
        res.status(400).json({
            status: "Logout fail",
            message: "Not login yet"
            })
    }
}