import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes'
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', authRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`)
})
