const User = require('../../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports = {
    getUsers,
    getUser,
    addUser,
    signUp,
    signIn,
    signOut
}

async function getUsers(req, res) {
    // res.send({users: "All User goes here!"})
    res.send(await User.find())
}

async function getUser(req, res) {
    const username = req.query.username
    const user = await User.findOne({ username })
    if (user) {
        return res.json(user);
    }
    res.status(404).send(`User not found with username: ${username}`)
}

async function addUser(req, res) {
    try {
        const userObj = req.body;
        const docRes = await User.create({
            username: userObj.username,
            password: userObj.password
        })
        res.json(docRes)
    } catch (error) {
        res.send(error)
    }
}

async function signUp(req, res) {
    try {
        // hash the password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const userObj = req.body;
        const docRes = await User.create({
            username: userObj.username,
            password: userObj.password
        })
        res.json({ signUp: `Signed up successfully. Your username is: ${docRes.username}` })
    } catch (error) {
        res.send(error)
    }
}

async function signIn(req, res) {
    try {
        // check if the user exists
        const user = await User.findOne({ username: req.body.username }).select('+password');
        // res.json(user)
        if (user) {
            //check if password matches
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                // sign token and send it in response
                const token =  jwt.sign({ username: user.username }, process.env.SECRET);
                res.json({token, username: user.username });
            } else {
                res.status(400).json({ error: "Password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "Username doesn't exist"});
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}

async function signOut(req, res) {
    try {
        token = undefined;
        res.send('Logout successfully');
    } catch (error) {
        res.status(400).json({ error });
    }
}