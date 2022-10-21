import { ObjectId } from 'mongodb'
import { Schema } from 'mongoose'

const TokenSchema = new Schema({
  user_id: { type: ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
})

export default TokenSchema
