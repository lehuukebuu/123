import express, { NextFunction } from 'express'
import usersRouters from './routes/users.routes'
import databaseService from './services/database.services'
import { Request, Response } from 'express'
import { defaultErrorHandler } from './middlewares/error.middlerware'
const app = express()
app.use(express.json())
const PORT = 3000
databaseService.connect()
app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/users', usersRouters)

app.use(defaultErrorHandler)

//localhost:3000/users/tweets
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`)
})
