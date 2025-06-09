


const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const usermodel = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




router.get('/register', (req, res)=>{
    res.render('register'); 
})

   router.post('/register',
    body('email').trim().isEmail().isLength({ min:8}),
    body('password').trim().isLength({ min: 5}),
    body('username').trim().isLength({ min: 3}),
   async (req, res) => {
       const errors =validationResult(req);

        if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: 'Invalid Data'
        })
        }
     const {email, username, password} = req.body ;

     const hashPassword = await bcrypt.hash(password, 10);
 
     const newUser =await usermodel.create({
        email, username, password: hashPassword
     })

    //  res.json(newUser)
    // res.redirect('/user/login')
    res.status(200).json({
        success: true,
        message: 'User registered successfully'
      });
      
 })


 router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login',
    body('email').trim().isLength({ min:3}),
    body('password').trim().isLength({ min:5}),
   async (req, res) => {
     const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid Data'
            })
        }
        const {email, password} = req.body;
        const user = await usermodel.findOne({ 
            email: email
        });
        if(!user){
            return res.status(400).json({message: 'Username or password is incorrect'})
        
    }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            // return res.status(400).json({message: 'Username or password is not correct'})
            return res.status(400).json({ message: 'Username or password is incorrect' })

        }
      
        const token = jwt.sign({
            userId: user._Id,
            email: user.email,
            username: user.username
            },
            process.env.JWT_SECRET,
          )
          res.cookie('token', token)
        //   res.send('loged in')
        // res.redirect('/stay')
        res.status(200).json({
            success: true,
            message: 'Login successful',
            redirect: '/stay'
          });
          
             
          }
        )


// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Logout Error:', err);
      return res.redirect('/');
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.redirect('/');
  });
});

module.exports = router;

