import type { Request, Response } from 'express'
import { purchaseCourseSchema } from '../utils/validation'
import { success } from 'zod'
import { prisma } from '../db'

export const purchaseCourse = async (req: Request, res: Response) => {
    const parseData = purchaseCourseSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(200).json({
            success: false,
            message: 'invalid inputs',
            error: parseData.error.flatten(),
        })
    }

    try {
        const { courseId } = parseData.data
        const userId = req.id as string

        await prisma.purchase.create({
            data: {
                userId: userId,
                courseId: courseId,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'course purchase succesfull',
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message,
        })
    }
}

export const getPurchaseCourses = async (req: Request, res: Response) => {
    const userId = req.params.id as string

    try {
        const courses = await prisma.purchase.findMany({
            where: {
                userId: userId,
            },
        })

        if (courses) {
            return res.status(400).json({
                success: false,
                message: 'courses not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'purchase courses',
            data: courses,
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message,
        })
    }
}
