import { Schema } from 'mongoose'
import * as mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const ContextSchema = new Schema({
  name: { type: String, required: true },
  tasks: [{ type: ObjectId, required: true, ref: 'Task' }],
  creators: [{ type: ObjectId, required: true, ref: 'User' }],
  performers: [{ type: ObjectId, ref: 'User' }],
})

export default ContextSchema
