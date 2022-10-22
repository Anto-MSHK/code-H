import { errorsMSG } from '@src/exceptions/API/errorsConst'
import TaskModel from '@src/models/Task/Task.model'
import { ObjectId } from 'mongodb'

class TaskService {
  addTask = async (
    title: string,
    body: string,
    creator: typeof ObjectId,
    performers?: typeof ObjectId[],
    date?: { from: string; to: string },
    isHide?: boolean
  ) => {
    try {
      if (!title || !body || !creator) {
        throw { status: 'INVALID_DATA', messages: [{ description: errorsMSG.NO_EMPTY }] }
      }

      const task = new TaskModel({
        title,
        body,
        creator,
        date,
        performers,
        isHide,
      })

      await task.save()

      return task
    } catch (e: any) {
      return []
    }
  }

  changeTask = async (
    id: string,
    title?: string,
    body?: string,
    creator?: typeof ObjectId,
    performers?: typeof ObjectId[],
    date?: { from: string; to: string },
    isHide?: boolean
  ) => {
    try {
      const candidate = await TaskModel.findOne({ _id: id })

      if (!candidate) {
        throw { status: 'INVALID_DATA', messages: [{ description: errorsMSG.NOT_Z }] }
      }

      await candidate.updateOne({ title, body, creator, performers, date, isHide })

      return candidate._id
    } catch (e: any) {
      return []
    }
  }

  deleteTask = async (id: string) => {
    try {
      const candidate = await TaskModel.findOne({ _id: id })

      if (!candidate) {
        throw { status: 'INVALID_DATA', messages: [{ description: errorsMSG.NOT_Z }] }
      }

      await candidate.deleteOne({ _id: id })

      return candidate._id
    } catch (e: any) {
      return []
    }
  }
}

export default new TaskService()
