import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './config/ConnectDB.js'
import routes from './routes/UserRoutes.js'

dotenv.config()
ConnectDB()

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json())

app.use('/api', routes)

app.listen(PORT, () => {
    console.log('server start on : ', PORT)
})