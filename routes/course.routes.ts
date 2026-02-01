import { Router } from 'express'
import { authMiddleware, checkRoleInstructor } from '../middleware/auth.middleware'
import {
    createCourse,
    deleteCourseById,
    getAllCourses,
    getCourseById,
    updateCourseById,
} from '../controller/course.controller'

const courseRouter = Router()

courseRouter.use(authMiddleware)
courseRouter.post('/', checkRoleInstructor, createCourse)
courseRouter.get('/', getAllCourses)
courseRouter.get('/:id', getCourseById)
courseRouter.patch('/:id', checkRoleInstructor, updateCourseById)
courseRouter.delete('/:id', checkRoleInstructor, deleteCourseById)

export default courseRouter
