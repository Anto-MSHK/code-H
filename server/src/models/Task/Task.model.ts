import { model } from 'mongoose'
import { ITaskDocument } from './Task.types'
import GroupSchema from './Task.schema'

export default model<ITaskDocument>('Task', GroupSchema)
