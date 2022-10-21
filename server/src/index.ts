/* eslint-disable class-methods-use-this */
import { config } from 'config/config'
import express from 'express'
import mongoose from 'mongoose'
import user from './routers/userRouter/user.routes'

const app = express()
const PORT = config.serverPort

app.use(express.json())
app.use(user)

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
