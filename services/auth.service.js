import { User } from '../schemas/user.schema.js'
import bcrypt from 'bcryptjs'
import gravatar from 'gravatar'
import { nanoid } from 'nanoid'
import jwt from 'jsonwebtoken'

// Register user
export const registerUser = async (data) => {
  const { name, password, email } = data

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  const avatarURL = gravatar.url(email, { protocol: 'https' })
  const verificationToken = nanoid()

  //find an existing user
  const checkUser = await User.findOne({ email })

  if (checkUser) {
    return { error: `User already registered` }
  }

  const user = new User({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verify: false,
    verificationToken,
  })
  await user.save()

  return user
}

// Login
export const loginUser = async (data) => {
  const { password, email } = data
  const user = await User.findOne({ email })

  if (!user) {
    return {
      error: 'User probably does not exist, check the correctness of the data',
    }
  }

  const passwordCompare = await bcrypt.compare(password, user.password)

  // Login auth error
  if (!user || !passwordCompare) {
    return { error: 'Email or password is wrong' }
  }

  // Login success response
  const payload = {
    id: user._id,
  }

  const { TOKEN_KEY } = process.env

  const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '7d' })
  await User.findByIdAndUpdate(user._id, { token })
  return { user, token }
}

// Logout
export const logoutUser = async (id) => {
  await User.findByIdAndUpdate({ _id: id }, { token: null }, { new: true })
  return
}

// user logged
export const currentUser = async (id) => {
  const user = await User.findById(id)

  if (!user) {
    return { error: 'Unauthorized' }
  }
  return {user}
}
