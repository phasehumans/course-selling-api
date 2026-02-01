import { Router } from 'express'
import { authMiddleware, checkRoleInstructor,} from '../middleware/auth.middleware'

const courseRouter = Router()

courseRouter.use(authMiddleware)
courseRouter.post('/', checkRoleInstructor,  )
courseRouter.get('/')
courseRouter.get('/:id')
courseRouter.patch('/:id')
courseRouter.delete('/:id')

export default courseRouter
