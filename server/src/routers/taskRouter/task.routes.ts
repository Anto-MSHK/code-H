import { Router } from 'express'
import { BT_addTask, BT_changeTask, QT_changeTask } from './task.types'
import { check, query } from 'express-validator'
import roleMiddleware from './../../middlewares/roleMiddleware'
import UserController from '@src/controllers/UserController'
import { errorsMSG } from '@src/exceptions/API/errorsConst'
import TaskController from '@src/controllers/TaskController'

const task = Router()

task.get<string, any, any>('/add', [roleMiddleware()], TaskController.getTasks)

task.post<string, any, any, BT_addTask>(
  '/add',
  [check('title', errorsMSG.NO_EMPTY).notEmpty(), check('body', errorsMSG.NO_EMPTY).notEmpty(), roleMiddleware(0)],
  TaskController.addTask
)

task.put<string, any, any, BT_changeTask, QT_changeTask>(
  '/',
  [query('id', errorsMSG.NO_EMPTY).notEmpty(), roleMiddleware(0)],
  TaskController.changeTask
)

task.delete<string, any, any, any, QT_changeTask>(
  '/',
  [query('id', errorsMSG.NO_EMPTY).notEmpty(), roleMiddleware(0)],
  TaskController.deleteTask
)
export default task
