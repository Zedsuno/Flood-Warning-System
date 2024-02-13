const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  let { email, password } = req.body;

  // Normalize email to ensure consistency
  email = email.toLowerCase();

  try {
    // Log the attempt to find the user
    console.log(`Attempting to find user with email: ${email}`);

    // Find the user in the Login collection
    const user = await User.findOne({ email }).exec();
    if (!user) {
      console.log(`User not found with email: ${email}`);
      return res.status(401).json({ message: 'Login failed: User not found' });
    }

    // User found, attempt to compare passwords
    console.log(`User found in 'Login' collection: ${user}`);
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      console.log(`Incorrect password for user: ${email}`);
      return res.status(401).json({ message: 'Login failed: Incorrect password' });
    }

    // Passwords match, proceed to token generation
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Log successful login
    console.log(`Login successful for user: ${email}`);
    res.status(200).json({ token, userId: user._id, email: user.email });
  } catch (error) {
    // Log the exact error
    console.error(`Error during login for email ${email}:`, error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};





exports.register = async (req, res) => {
  try {
      const { username, email, password } = req.body;
      console.log('Received registration data:', req.body); // Log the incoming registration data

      let user = await User.findOne({ email });
      if (user) {
          console.log('User already exists with email:', email); // Log if user already exists
          return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({ username, email, password });
      
      await user.save();
      console.log('User saved to database:', user);

      const payload = { user: { id: user.id } };
      jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '5d' },
          (err, token) => {
              if (err) throw err;
              console.log('JWT token generated for user:', user); // Log the generated token
              res.status(201).json({ token });
          }
      );
  } catch (err) {
      console.error('Error during registration:', err); // Log the caught error
      res.status(500).send('Server error');
  }
};
