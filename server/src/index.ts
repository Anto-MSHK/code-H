import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import fs from 'fs'
const app = express()
const PORT = config.get('serverPort')

app.use(express.json())

class Manager {
  public start = async () => {
    try {
    } catch (e) {
      console.log(e)
    }
  }
}

const serverManager = new Manager()
serverManager.start()
