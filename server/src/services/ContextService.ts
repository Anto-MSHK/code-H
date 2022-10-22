import { errorsMSG } from '@src/exceptions/API/errorsConst'
import ContextModel from '@src/models/Context/Context.model'
import TaskModel from '@src/models/Task/Task.model'
import { ObjectId } from 'mongodb'

class ContextService {
  addContext = async (
    name: string,
    creator: typeof ObjectId,
    tasks?: typeof ObjectId[],
    performers?: typeof ObjectId[]
  ) => {
    try {
      if (!name || !creator) {
        throw { status: 'INVALID_DATA', messages: [{ description: errorsMSG.NO_EMPTY }] }
      }

      const context = new ContextModel({
        name,
        creator,
        tasks,
        performers,
      })

      await context.save()

      return context
    } catch (e: any) {
      return []
    }
  }

  changeContext = async (
    id: string,
    name?: string,
    creator?: typeof ObjectId,
    tasks?: typeof ObjectId[],
    performers?: typeof ObjectId[]
  ) => {
    try {
      const candidate = await ContextModel.findOne({ _id: id })

      if (!candidate) {
        throw { status: 'INVALID_DATA', messages: [{ description: errorsMSG.NOT_Z }] }
      }

      await candidate.updateOne({ name, creator, tasks, performers })

      return candidate._id
    } catch (e: any) {
      return []
    }
  }

  deleteContext = async (id: string) => {
    try {
      const candidate = await ContextModel.findOne({ _id: id })

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

export default new ContextService()
