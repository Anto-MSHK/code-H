/* eslint-disable class-methods-use-this */
import { config } from 'config/config'
import express from 'express'
import mongoose from 'mongoose'
import user from './routers/userRouter/user.routes'
import task from './routers/taskRouter/task.routes'
import context from './routers/contextRouter/context.routes'

const app = express()
const PORT = config.serverPort

app.use(express.json())
app.use('/auth', user)
app.use('/task', task)
app.use('/context', context)

class Manager {
  public start = async () => {
    try {
      await mongoose.connect(config.dbUrl)
      app.listen(PORT)
    } catch (e) {
      console.log(e)
    }
  }
}

const serverManager = new Manager()
serverManager.start()
