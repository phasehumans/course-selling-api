import type { Request, Response } from 'express'
import { createCourseSchema, updateCourseSchema } from '../utils/validation'
import { prisma } from '../db'

export const createCourse = async (req: Request, res: Response) => {
    const parseData = createCourseSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid inputs',
            error: parseData.error.flatten(),
        })
    }

    const { title, description, price } = parseData.data
    const instructorId = req.id

    try {
        const course = await prisma.course.create({
            data: {
                title: title,
                description: description,
                price: price,
                instructorId: instructorId!,
            },
        })

        return res.status(201).json({
            success: true,
            message: 'course created',
            data: course,
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message,
        })
    }
}

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const allCourses = await prisma.course.findMany({})

        if (!allCourses) {
            return res.status(400).json({
                success: false,
                message: 'courses not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'all courses',
            data: allCourses,
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message,
        })
    }
}

export const getCourseById = async (req: Request, res: Response) => {
    const courseId = req.params.id as string

    try {
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
        })

        if (!course) {
            return res.status(400).json({
                success: false,
                message: 'course not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'course details',
            data: course,
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message,
        })
    }
}

export const updateCourseById = async (req: Request, res: Response) => {
    const parseData = updateCourseSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid inputs',
            error: parseData.error.flatten(),
        })
    }

    const { title, description, price } = parseData.data
    const instructorId = req.id
    const courseId = req.params.id as string

    try {
        const course = await prisma.course.update({
            where: {
                instructorId: instructorId,
                id: courseId,
            },

            data: {
                title: title,
                description: description,
                price: price,
            },
        })

        if (!course) {
            return res.status(400).json({
                success: false,
                message: 'course not found',
            })
        }

        return res.status(200).json({
            success: false,
            message: 'course updated',
            data: course,
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message,
        })
    }
}

export const deleteCourseById = async (req: Request, res: Response) => {
    const courseId = req.params.id as string
    const instructorId = req.id

    try {
        await prisma.course.delete({
            where: {
                id: courseId,
                instructorId: instructorId,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'course deleted',
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message,
        })
    }
}
