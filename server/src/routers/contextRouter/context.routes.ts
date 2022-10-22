import { Router } from 'express'
import { check, query } from 'express-validator'
import roleMiddleware from './../../middlewares/roleMiddleware'
import UserController from '@src/controllers/UserController'
import { errorsMSG } from '@src/exceptions/API/errorsConst'
import TaskController from '@src/controllers/TaskController'
import { BT_addContext, BT_changeContext, QT_changeContext } from './context.types'
import ContextController from '@src/controllers/ContextController'

const context = Router()

context.get<string, any, any>('/', [roleMiddleware()], ContextController.getContexts)

context.post<string, any, any, BT_addContext>(
  '/add',
  [check('name', errorsMSG.NO_EMPTY).notEmpty(), roleMiddleware(0)],
  ContextController.addContext
)

context.put<string, any, any, BT_changeContext, QT_changeContext>(
  '/',
  [query('id', errorsMSG.NO_EMPTY).notEmpty(), roleMiddleware(0)],
  ContextController.changeContext
)

context.delete<string, any, any, any, QT_changeContext>(
  '/',
  [query('id', errorsMSG.NO_EMPTY).notEmpty(), roleMiddleware(0)],
  ContextController.deleteContext
)
export default context
