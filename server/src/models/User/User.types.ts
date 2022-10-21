import { Document } from 'mongoose'

export interface IUser {
  firstName: string
  lastName: string
  number: string
  password: string
  email: string
  role: 'admin' | 'tutor' | 'user'
}

export interface IUserDocument extends IUser, Document {}
