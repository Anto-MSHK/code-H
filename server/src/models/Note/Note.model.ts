import { model } from 'mongoose'
import { INoteDocument } from './Note.types'
import NoteSchema from './Note.schema'

export default model<INoteDocument>('Group', NoteSchema)
