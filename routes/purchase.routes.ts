import { Router } from 'express'
import { authMiddleware, checkRoleStudent } from '../middleware/auth.middleware'
import { getPurchaseCourses, purchaseCourse } from '../controller/purchase.controller'

const purchaseRouter = Router()

purchaseRouter.use(authMiddleware)
purchaseRouter.post('/', checkRoleStudent, purchaseCourse)
purchaseRouter.get('/users/:id', getPurchaseCourses)

export default purchaseRouter
