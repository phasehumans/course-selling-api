import type { Request, Response } from 'express'
import { createLessonSchema } from '../utils/validation'
import { success } from 'zod'
import { prisma } from '../db'
import { id } from 'zod/locales'

export const addLesson = async (req: Request, res: Response) => {
    const parseData = createLessonSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid inputs',
            error: parseData.error.flatten(),
        })
    }
    const { title, content, courseId } = parseData.data
    const instructorId = req.id

    try {
        const course = await prisma.course.findUnique({
            where: {
                instructorId: instructorId,
                id: courseId,
            },
        })

        if (!course) {
            return res.status(400).json({
                success: false,
                message: 'invalid course id',
            })
        }

        const lesson = await prisma.lesson.create({
            data: {
                title: title,
                content: content,
                courseId: courseId,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'lessons added',
            data: lesson,
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message,
        })
    }
}

export const getLesson = async (req: Request, res: Response) => {
    const courseId = req.params.courseId as string

    try {
        const lesson = await prisma.lesson.findMany({
            where: {
                courseId: courseId,
            },
        })

        if (!lesson) {
            return res.status(400).json({
                success: false,
                message: 'course not found',
            })
        }

        return res.status(200).json({
            success: false,
            message: 'course lessons',
            data: lesson,
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message,
        })
    }
}
