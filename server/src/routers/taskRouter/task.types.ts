import { ObjectId } from 'mongodb'

export type BT_addTask = {
  title: string
  body: string
  performers?: typeof ObjectId[]
  date?: { from: string; to: string }
  isHide?: boolean
}

export type QT_changeTask = {
  id: string
}

export type BT_changeTask = {
  title?: string
  body?: string
  performers?: typeof ObjectId[]
  date?: { from: string; to: string }
  isHide?: boolean
}
