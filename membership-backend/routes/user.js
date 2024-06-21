// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// router.post('/signup', async (req, res) => {
//     const { name, address, email, password } = req.body;
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new User({
//         name,
//         address,
//         email,
//         password: hashedPassword,
//         membership_expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
//       });
//       await user.save();
//       res.status(201).send('User created');
//     } catch (error) {
//       res.status(400).send('Error creating user');
//     }
//   });


//   router.get('/all', async (req, res) => {
//     try {
//       const users = await User.find();
//       res.json(users);
//     } catch (error) {
//       res.status(500).send('Error fetching users');
//     }
//   });
  

// module.exports = router;


const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Add this line

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied. No token provided.');
  
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).send('Invalid token.');
      req.user = decoded;
      next();
    });
  };

// Signup route
router.post('/signup', async (req, res) => {
  const { first_name, last_name,email, password, mobile_phone, address,subscription_plan_id, subscription_status, membership_expiry_date } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      mobile_phone,
      address,
      subscription_plan_id,
      subscription_status: 'not paid',
      membership_expiry_date, // Next year end of September
      
    });
    res.status(201).send('User created');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).send('Error creating user');
  }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        console.error('User not found');
        return res.status(401).send('Invalid email or password');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.error('Invalid password');
        return res.status(401).send('Invalid email or password');
      }
  
      // responsible for generating JSON web Token when a user successfully logs in and then sending this token back to the client
      // This is for authentication (The token serves as proof of the user's identity) - LATER REGENERATE TOKEN FOR SEC AFTER 6 MONTHS?
      const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Server error');
    }
  });

  // Get current user route
  router.get('/me', authenticateToken, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).send('User not found');
  
      res.json({
        name: user.name,
        membership_expiry_date: user.membership_expiry_date
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).send('Server error');
    }
  });

// Get all users route
router.get('/all', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
});

module.exports = router;
