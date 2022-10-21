import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

export interface INote {
  title?: string
  body: string
  creator: typeof ObjectId
  byTask: typeof ObjectId
}

export interface INoteDocument extends INote, Document {}
