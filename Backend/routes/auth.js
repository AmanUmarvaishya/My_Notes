const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const User = require('../model/User');

const GoogleLogin = require("../controller/GoogleLogin");


router.get("/google", GoogleLogin);
router.post('/signup', [
  body('email').isEmail().exists(),
  body('username').isLength({ min: 3 }),
  body('password').isLength({ min: 6 })
], validate, async (req, res) => {
  const { username, password ,email} = req.body;
  console.log(username)
  try {
    const userExist = await User.findOne({ email })
    if (userExist ) return res.status(400).json({ msg: 'email already exist ' });

    const hash = await bcrypt.hash(password, 10);
    const user = await new User({ username, password: hash ,email})
    await user.save();
    console.log(user)
    res.json({ msg: 'User created' });
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/login', [
  body('email').exists(),
  body('password').exists()
], validate, async (req, res) => {
  const { email, password } = req.body;
  console.log('right',email)
  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user || !await bcrypt.compare(password, user.password)) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE });
    res.json({ token });
    
  } catch (error) {
    console.log('not')
  }
});

module.exports = router;
