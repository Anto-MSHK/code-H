import { Schema } from 'mongoose'
import * as mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const ContextSchema = new Schema({
  name: { type: String, required: true },
  creator: { type: ObjectId, required: true, ref: 'User' },
  tasks: [{ type: ObjectId, required: true, ref: 'Task' }],
  performers: [{ type: ObjectId, ref: 'User' }],
})

export default ContextSchema
