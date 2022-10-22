import { NextFunction, Request, RequestHandler, Response } from 'express'
import jwt from 'jsonwebtoken'
import { DataStoredInToken } from '@src/controllers/UserController'
import { RT } from '../routers/ResponseType'
import { config } from 'config/config'

const roleMiddleware =
  (rightsLevel: number = -1): RequestHandler<Record<string, any>, RT> =>
  (req, res, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        return res.status(400).json({
          status: 'INVALID_DATA',
        })
      }
      const user = jwt.verify(token, config.secret) as DataStoredInToken

      switch (rightsLevel) {
        case -1:
          if (user.role) {
            next()
          } else {
            res.status(400).json({
              status: 'INVALID_DATA',
            })
          }
          break
        case 0:
          if (user.role !== 'user') {
            next()
          } else {
            res.status(400).json({
              status: 'INVALID_DATA',
            })
          }
          break
        case 1:
          if (user.role === 'admin') {
            next()
          } else {
            res.status(400).json({
              status: 'INVALID_DATA',
            })
          }
          break
        default:
          res.status(500).json({ status: 'UNKNOWN_ERROR' })
          break
      }
    } catch (e) {
      return res.status(400).json({
        status: 'INVALID_DATA',
      })
    }
  }
export default roleMiddleware
