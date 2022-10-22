import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

export interface IContext {
  name: string
  creator: typeof ObjectId
  tasks: typeof ObjectId[]
  performers: typeof ObjectId[]
}

export interface IContextDocument extends IContext, Document {}
