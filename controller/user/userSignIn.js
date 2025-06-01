const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken')

const JWT_SECRET = "mySuperSecretKey123"  // Ideally from env in production

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body

    if (!email) {
      throw new Error("Please provide email")
    }
    if (!password) {
      throw new Error("Please provide password")
    }

    const user = await userModel.findOne({ email })

    if (!user) {
      throw new Error("User not found")
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      }

      const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: 60 * 60 * 8 })

      const tokenOption = {
        httpOnly: true, // secure from JS access
        secure: process.env.NODE_ENV === 'production', // only over HTTPS in prod
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // allow cross-origin in prod
        maxAge: 60 * 60 * 8 * 1000 // 8 hours
      }

      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login successfully",
        data: token,
        success: true,
        error: false,
      })
    } else {
      throw new Error("Please check Password")
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

module.exports = userSignInController
