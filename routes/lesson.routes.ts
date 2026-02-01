import { Router } from 'express'
import { authMiddleware, checkRoleInstructor } from '../middleware/auth.middleware'
import { addLesson, getLesson } from '../controller/lesson.controller'

const lessonRouter = Router()

lessonRouter.use(authMiddleware)
lessonRouter.post('/', checkRoleInstructor, addLesson)
lessonRouter.get('/:courseId/lesson', getLesson)

export default lessonRouter
