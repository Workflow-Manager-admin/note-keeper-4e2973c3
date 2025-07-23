//
// Controller for user auth/register endpoints.
//
const userService = require('../services/user');
const { signToken } = require('../services/jwt');

/**
 * User registration controller.
 * Expects { username, email, password }
 */
// PUBLIC_INTERFACE
async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    // Ensure email is unique
    const existing = await userService.authenticateUser(email, password);
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }
    const user = await userService.createUser(username, email, password);
    return res.status(201).json({ id: user.id, username: user.username, email: user.email });
  } catch (err) {
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
}

/**
 * User login controller.
 * Expects { email, password }. Returns { token }
 */
// PUBLIC_INTERFACE
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });
    const user = await userService.authenticateUser(email, password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });
    const token = signToken({ user_id: user.id, email: user.email });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
}

/**
 * Get current user profile (if authenticated).
 */
async function profile(req, res) {
  try {
    const user = await userService.getUserById(req.user.user_id);
    if (user) return res.json({ user });
    return res.status(404).json({ message: 'User not found.' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to get profile', error: err.message });
  }
}

module.exports = {
  register,
  login,
  profile,
};
