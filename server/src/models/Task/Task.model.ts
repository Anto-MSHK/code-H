import { model } from 'mongoose'
import { ITaskDocument } from './Task.types'
import TaskSchema from './Task.schema'

export default model<ITaskDocument>('Task', TaskSchema)
