import express from 'express'

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
