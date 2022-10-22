import { RequestHandler } from 'express'
import { validationController } from './validationController'
import jwt from 'jsonwebtoken'
import { config } from 'config/config'
import { DataStoredInToken } from './UserController'
import { BT_addTask, BT_changeTask, QT_changeTask } from '@src/routers/taskRouter/task.types'
import { RT } from '@src/routers/ResponseType'
import TaskService from '@src/services/TaskService'
import TaskModel from '@src/models/Task/Task.model'

class TaskController {
  addTask: RequestHandler<Record<string, any>, RT, BT_addTask, any> = async (req, res, next) => {
    try {
      validationController(req, res)
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        throw res.status(400).json({
          status: 'INVALID_DATA',
        })
      }
      const user = jwt.verify(token, config.secret) as DataStoredInToken
      const { title, body, date, isHide, performers } = req.body
      const task = await TaskService.addTask(title, body, user.id, performers, date, isHide)
      return res.json({ status: 'OK', result: task })
    } catch (e) {
      next(e)
    }
  }
  changeTask: RequestHandler<Record<string, any>, RT, BT_changeTask, QT_changeTask> = async (req, res, next) => {
    try {
      validationController(req, res)
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        throw res.status(400).json({
          status: 'INVALID_DATA',
        })
      }
      const user = jwt.verify(token, config.secret) as DataStoredInToken
      const { id } = req.query
      const candidate = await TaskModel.findOne({ _id: id })
      if (!candidate)
        throw res.status(400).json({
          status: 'INVALID_DATA',
        })
      const a = await TaskModel.findOne({ _id: id, creator: user.id })
      if (a || user.role === 'admin') {
        const { title, body, date, isHide, performers } = req.body
        const task = await TaskService.changeTask(candidate._id, title, body, user.id, performers, date, isHide)
        return res.json({ status: 'OK', result: task })
      }
    } catch (e) {
      next(e)
    }
  }
  deleteTask: RequestHandler<Record<string, any>, RT, any, QT_changeTask> = async (req, res, next) => {
    try {
      validationController(req, res)
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        throw res.status(400).json({
          status: 'INVALID_DATA',
        })
      }
      const user = jwt.verify(token, config.secret) as DataStoredInToken
      const { id } = req.query
      const candidate = await TaskModel.findOne({ _id: id })
      if (!candidate)
        throw res.status(400).json({
          status: 'INVALID_DATA',
        })
      const a = await TaskModel.findOne({ _id: id, creator: user.id })
      if (a || user.role === 'admin') {
        const task = await TaskService.deleteTask(candidate._id)
        return res.json({ status: 'OK', result: task })
      }
    } catch (e) {
      next(e)
    }
  }
  getTasks: RequestHandler<Record<string, any>, RT> = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw res.status(400).json({
        status: 'INVALID_DATA',
      })
    }
    const user = jwt.verify(token, config.secret) as DataStoredInToken
    var tasks = []
    if (user.role !== 'user') {
      tasks = await TaskModel.find({ creator: user.id })
    } else tasks = await TaskModel.find({ performers: { $elemMatch: { $eq: user.id } } })
    return res.json({ status: 'OK', result: tasks })
  }
}

export default new TaskController()
