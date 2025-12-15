import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './config/ConnectDB.js'
import routes from './routes/UserRoutes.js'
import cors from 'cors'

dotenv.config()
ConnectDB()

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use(cors({
    origin : ['http://localhost:4000', 'https://authentication-be-gooz.onrender.com']
}))



app.use('/api', routes)

app.listen(PORT, () => {
    console.log('server start on : ', PORT)
})