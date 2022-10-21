import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

export interface ITask {
  title: string
  body: string
  creator: typeof ObjectId
  performers?: typeof ObjectId[]
  date?: { from: string; to: string }
  isHide?: boolean
}

export interface ITaskDocument extends ITask, Document {}
