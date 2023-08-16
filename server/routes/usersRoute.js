const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
require('dotenv').config({path:__dirname+'/../../.env'})

// register
router.post('/register', async(req, res) => {
    try {
        // check if user already exists
        let user = await User.findOne({username: req.body.username});
        if (user){
            return res.send({
                success: false,
                message: "User already exists"
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword; // replace plaintext password with its hashed version
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            message: 'new user created successfully',
            data: null,
            success: true
        })
    } catch(error){
        console.log('usersRoute post register error')
        res.send({
            message: error.message,
            success: false
        })
    }
});

// login
router.post('/login', async(req, res) => {
    try{
        let user = await User.findOne({username: req.body.username});
        if (!user){
            return res.send({
                message: "User does not exist",
                success: false,
            });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword){
            return res.send({
                success: false,
                message: "Invalid Password",
            })
        }

        // generate token
        const token = jwt.sign({userId: user._id}, process.env.jwt_secret, {expiresIn: '1d'});
        res.send({
            message: "User logged in successfully",
            data: token,
            success: true,
        });
    }catch(error){
        console.log('usersRoute post loging error')
        res.send({
            message: error.message,
            success: false,
        });
    }
});

router.post('/get-user-info-by-id', authMiddleware, async(req, res)=>{
    try{
        const user = await User.findById(req.body.userId);
        user.password = ""; // we shouldn't send the password to the user.
        res.send({
            message: "User info fetched successfully",
            data: user,
            success: true,
        });
    }catch(error){
        console.log('usersRoute post get user info by id error')
        res.send({
            message: error.message,
            success: false,
        });
    }
});

module.exports =  router;