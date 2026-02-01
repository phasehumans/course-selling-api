import { Router } from 'express'
import { authMiddleware, checkRoleInstructor,} from '../middleware/auth.middleware'
import { createCourse } from '../controller/course.controller'

const courseRouter = Router()

courseRouter.use(authMiddleware)
courseRouter.post('/', checkRoleInstructor, createCourse)
courseRouter.get('/', )
courseRouter.get('/:id')
courseRouter.patch('/:id')
courseRouter.delete('/:id')

export default courseRouter
