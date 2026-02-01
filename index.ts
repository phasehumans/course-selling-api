import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes'
import courseRouter from './routes/course.routes'
import lessonRouter from './routes/lesson.routes'
import purchaseRouter from './routes/purchase.routes'
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', authRouter)
;(app.use('/api/v1/courses', courseRouter), app.use('/api/v1/lessons', lessonRouter))
app.use('api/v1/purchases', purchaseRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`)
})
