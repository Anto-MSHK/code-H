import { RequestHandler } from 'express'
import { validationController } from './validationController'
import User from '@src/models/User/User.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUserDocument } from '../models/User/User.types'
import { BT_login, BT_reg, QT_addRights, QT_removeRights } from '@src/routers/userRouter/user.types'
import UserTokenService from '@src/services/UserTokenService'
import { RT } from '@src/routers/ResponseType'
import { errorsMSG } from '@src/exceptions/API/errorsConst'
import { config } from 'config/config'
import { ObjectId } from 'mongodb'

interface TokenData {
  token: string
  expiresIn: string
}
export interface DataStoredInToken {
  id: typeof ObjectId
  role: string
}

const generateAccessToken = (user: IUserDocument): TokenData => {
  const expiresIn = '24h'
  const secret = config.secret
  const payload: DataStoredInToken = {
    id: user._id,
    role: user.role,
  }
  return {
    expiresIn,
    token: jwt.sign(payload, secret, { expiresIn }),
  }
}

class UserController {
  addRights: RequestHandler<Record<string, any>, RT, any, QT_addRights> = async (req, res, next) => {
    try {
      validationController(req, res)

      const { id } = req.query
      const candidate = await User.findOne({ _id: id })

      if (!candidate) {
        throw res.status(400).json({ status: 'INVALID_DATA', messages: [{ description: errorsMSG.NOT_Z }] })
      }

      await candidate.updateOne({ role: 'tutor' })

      return res.json({ status: 'OK' })
    } catch (e) {
      next(e)
    }
  }

  removeRights: RequestHandler<Record<string, any>, RT, any, QT_removeRights> = async (req, res, next) => {
    try {
      validationController(req, res)

      const { id } = req.query
      const candidate = await User.findOne({ _id: id })

      if (!candidate) {
        throw res.status(400).json({ status: 'INVALID_DATA', messages: [{ description: errorsMSG.NOT_Z }] })
      }

      await candidate.updateOne({ role: 'user' })

      return res.json({ status: 'OK' })
    } catch (e) {
      next(e)
    }
  }

  registration: RequestHandler<Record<string, any>, RT, BT_reg, any> = async (req, res, next) => {
    try {
      validationController(req, res)

      const { firstName, lastName, number, email, password } = req.body
      const candidate = await User.findOne({ email, number })

      if (candidate) {
        throw res.status(400).json({ status: 'INVALID_DATA', messages: [{ description: errorsMSG.IS_EXIST }] })
      }

      const hashPassword = bcrypt.hashSync(password, 7)

      const user = new User({
        firstName,
        lastName,
        number,
        email,
        password: hashPassword,
        role: 'user',
      })

      await user.save()

      const tokens = UserTokenService.generateTokens({ id: user._id, role: user.role })
      await UserTokenService.saveToken(user._id, tokens.refreshToken)
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.json({ status: 'OK', result: { ...tokens, user: { id: user._id, role: user.role } } })
    } catch (e) {
      next(e)
    }
  }

  login: RequestHandler<Record<string, any>, RT, BT_login, any> = async (req, res, next) => {
    try {
      validationController(req, res)

      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        throw res.status(400).json({ status: 'INVALID_DATA' })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        throw res.status(400).json({ status: 'INVALID_DATA', messages: [{ description: errorsMSG.NOT_TRUE }] })
      }
      const tokens = UserTokenService.generateTokens({ id: user._id, role: user.role })
      await UserTokenService.saveToken(user._id, tokens.refreshToken)
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.json({ status: 'OK', result: { ...tokens, user: { id: user._id, role: user.role } } })
    } catch (e) {
      next(e)
    }
  }

  getAllUsers: RequestHandler<Record<string, any>, RT, BT_login, any> = async (req, res, next) => {
    try {
      const users = await User.find()
      return res.json({ result: users, status: 'OK' })
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()
