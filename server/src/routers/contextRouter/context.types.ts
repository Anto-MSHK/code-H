import { ObjectId } from 'mongodb'

export type BT_addContext = {
  name: string
  tasks?: typeof ObjectId[]
  performers?: typeof ObjectId[]
}

export type QT_changeContext = {
  id: string
}

export type BT_changeContext = {
  name?: string
  creator?: typeof ObjectId
  tasks?: typeof ObjectId[]
  performers?: typeof ObjectId[]
}
