/* eslint-disable camelcase */
import { Router } from 'express'
import { BT_login, BT_reg, QT_addRights, QT_removeRights } from './user.types'
import { check } from 'express-validator'
import roleMiddleware from './../../middlewares/roleMiddleware'
import UserController from '@src/controllers/UserController'
import { errorsMSG } from '@src/exceptions/API/errorsConst'

const user = Router()

user.put<string, any, any, any, QT_addRights>(
  '/addRights',
  [check('id', errorsMSG.NO_EMPTY).notEmpty(), roleMiddleware(1)],
  UserController.addRights
)
user.put<string, any, any, any, QT_removeRights>(
  '/removeRights',
  [check('id', errorsMSG.NO_EMPTY).notEmpty(), roleMiddleware(1)],
  UserController.removeRights
)
user.post<string, any, any, BT_reg>(
  '/register',
  [
    check('firstName', errorsMSG.NO_EMPTY).notEmpty(),
    check('lastName', errorsMSG.NO_EMPTY).notEmpty(),
    check('number', errorsMSG.NO_EMPTY).notEmpty(),
    check('email', errorsMSG.NO_EMAIL).notEmpty().isEmail(),
    check('password', errorsMSG.MIN_MAX(4, 10)).isLength({ min: 4, max: 10 }),
  ],
  UserController.registration
)
user.post<string, any, any, BT_login>(
  '/login',
  [check('email', errorsMSG.NO_EMAIL).notEmpty().isEmail(), check('password', errorsMSG.NO_EMPTY).notEmpty()],
  UserController.login
)
// user.post<string, any, any, BT_login>(
//   '/logout',
//   [check('login', errorsMSG.NO_EMPTY).notEmpty(), check('password', errorsMSG.NO_EMPTY).notEmpty()],
//   AuthController.login
// )
user.get('/refresh')
user.get<string>('/all', roleMiddleware(0), UserController.getAllUsers)

export default user
