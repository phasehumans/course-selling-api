import { Router } from 'express'

const courseRouter = Router()

courseRouter.post('/')
courseRouter.get('/')
courseRouter.get('/:id')
courseRouter.patch('/:id')
courseRouter.delete('/:id')

export default courseRouter
