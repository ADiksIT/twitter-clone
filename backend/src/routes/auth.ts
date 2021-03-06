import express, { Request, Response } from 'express'
import { check, validationResult, Result } from 'express-validator'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import { auth } from '../middleware/authCheker'
import { IToken, IUser } from '../interfaces'
import User from '../models/User'
import Posts from '../models/Posts'

dotenv.config()

const router: express.Router = express.Router()

const JWT: string = process.env.ACCESS_TOKEN_SECRET || ''
const COOKIE_TITLE: string = process.env.COOKIE_TITLE || ''

const maxAge: number = 3 * 24 * 60 * 60 * 10

const createToken = (id: number) =>
  jwt.sign({ id }, JWT, {
    expiresIn: maxAge,
  })

router.post(
  '/register',
  [
    check('email', 'Email is not corrected').isEmail(),
    check('password', 'Min length 8 symbols').isLength({ min: 8 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors: Result = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Auth has been failed',
        })
      }

      const {
        email,
        password,
        name,
        phone,
        birthday,
        firstName,
        lastName,
      }: IUser = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'This person already register' })
      }

      const hashedPassword: string = await bcryptjs.hash(password, 10)

      const user: IUser = new User({
        email,
        password: hashedPassword,
        name,
        phone,
        birthday,
        firstName,
        lastName,
      })

      const posts = await new Posts({ author: user.id })

      if (!posts) {
        res.status(400).json({ message: 'Error, posts not has created' })
      }

      user.postsId = posts.id

      await posts.save()
      await user.save()

      res.status(201).json({
        message: 'user created',
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
          email: user.email,
          name: user.name,
          phone: user.phone,
          birthday: user.birthday,
        },
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong, try again',
        error: error.message,
      })
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Enter corrected email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors: Result = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Auth has been failed',
        })
      }

      const { email, password } = req.body
      const user: IUser | null = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: "User don't find" })
      }

      const isMatch = await bcryptjs.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: "Login data isn't correct" })
      }

      const candidateToken = req.cookies[COOKIE_TITLE]
      if (candidateToken) {
        return res.status(400).json({ message: 'you already authorize' })
      }

      const token: string = createToken(user._id)

      user.tokens = user.tokens.concat({ token })

      res.cookie(COOKIE_TITLE, token, { httpOnly: true, maxAge: maxAge })

      await user.save()

      res.status(200).json({
        message: 'login has been successful',
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
          email: user.email,
          name: user.name,
          phone: user.phone,
          birthday: user.birthday,
          token,
        },
      })
    } catch (error) {
      res.send(500).json({
        message: 'Something went wrong, try again',
        error: error.message,
      })
    }
  }
)

router.get('/logout', auth, async (req: Request, res: Response) => {
  try {
    res.locals.user.tokens = res.locals.user.tokens.filter((token: IToken) => {
      return token.token !== res.locals.token
    })

    await res.locals.user.save()

    res
      .status(200)
      .cookie(COOKIE_TITLE, '', { maxAge: 1 })
      .json({ message: 'logout' })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong, try again',
      error: error.message,
    })
  }
})

export { router as auth }
