import { RequestHandler } from 'express'
import { validationController } from './validationController'
import jwt from 'jsonwebtoken'
import { config } from 'config/config'
import { DataStoredInToken } from './UserController'
import { RT } from '@src/routers/ResponseType'
import { BT_addContext, BT_changeContext, QT_changeContext } from '@src/routers/contextRouter/context.types'
import ContextService from '@src/services/ContextService'
import ContextModel from '@src/models/Context/Context.model'
import TaskModel from '@src/models/Task/Task.model'

class ContextController {
  addContext: RequestHandler<Record<string, any>, RT, BT_addContext, any> = async (req, res, next) => {
    try {
      validationController(req, res)
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        throw res.status(400).json({
          status: 'INVALID_DATA',
        })
      }
      const user = jwt.verify(token, config.secret) as DataStoredInToken
      var { name, tasks, performers } = req.body
      var a: any[] = []
      if (tasks)
        await Promise.all<any>(
          tasks?.map(async task => {
            const cur_task = await TaskModel.findOne({ _id: task })
            if (cur_task && cur_task.performers)
              cur_task.performers.map(perf => {
                a.push(perf)
              })
          })
        )
      if (performers) a = [...a, ...performers]
      const context = await ContextService.addContext(name, user.id, tasks, [...a])
      return res.json({ status: 'OK', result: context })
    } catch (e) {
      next(e)
    }
  }
  changeContext: RequestHandler<Record<string, any>, RT, BT_changeContext, QT_changeContext> = async (
    req,
    res,
    next
  ) => {
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
      const candidate = await ContextModel.findOne({ _id: id })
      var task
      if (!candidate)
        throw res.status(400).json({
          status: 'INVALID_DATA',
        })
      const a = await ContextModel.findOne({ _id: id, creator: user.id })
      if (a || user.role === 'admin') {
        const { name, tasks, performers } = req.body
        task = await ContextService.changeContext(candidate._id, name, user.id, tasks, performers)
      }
      return res.json({ status: 'OK', result: task })
    } catch (e) {
      next(e)
    }
  }
  deleteContext: RequestHandler<Record<string, any>, RT, any, QT_changeContext> = async (req, res, next) => {
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
      const candidate = await ContextModel.findOne({ _id: id })
      if (!candidate)
        throw res.status(400).json({
          status: 'INVALID_DATA',
        })
      const a = await ContextModel.findOne({ _id: id, creator: user.id })
      if (a || user.role === 'admin') {
        const context = await ContextService.deleteContext(candidate._id)
        return res.json({ status: 'OK', result: context })
      }
    } catch (e) {
      next(e)
    }
  }

  getContexts: RequestHandler<Record<string, any>, RT> = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw res.status(400).json({
        status: 'INVALID_DATA',
      })
    }
    const user = jwt.verify(token, config.secret) as DataStoredInToken
    var context = []
    if (user.role !== 'user') {
      context = await ContextModel.find({ creator: user.id })
    } else context = await ContextModel.find({ performers: { $elemMatch: { $eq: user.id } } })
    return res.json({ status: 'OK', result: context })
  }
}

export default new ContextController()
