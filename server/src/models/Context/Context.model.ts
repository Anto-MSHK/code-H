import { model } from 'mongoose'
import { IContextDocument } from './Context.types'
import ContextSchema from './Context.schema'

export default model<IContextDocument>('Context', ContextSchema)
