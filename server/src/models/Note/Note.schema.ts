import { Schema } from 'mongoose'
import * as mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const NoteSchema = new Schema({
  title: { type: String },
  body: { type: String, required: true },
  creator: { type: ObjectId, required: true, ref: 'User' },
  byTask: { type: ObjectId, require: true, ref: 'Task' },
})

export default NoteSchema
