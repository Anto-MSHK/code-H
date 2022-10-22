import { Schema } from 'mongoose'
import * as mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const date = {
  from: { type: String },
  to: { type: String },
}

const TaskSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  creator: { type: ObjectId, required: true, ref: 'User' },
  performers: [{ type: ObjectId, ref: 'User' }],
  date,
})

export default TaskSchema
