import type { Request, Response } from "express"
import { createCourseSchema } from "../utils/validation"
import { success } from "zod"
import { prisma } from "../db"


export const createCourse = async (req:Request, res: Response) => {
    const parseData = createCourseSchema.safeParse(req.body)

    if(!parseData.success){
        return res.status(400).json({
            success: false,
            message: "invalid inputs",
            error: parseData.error.flatten()
        })
    }

    const {title, description, price} = parseData.data
    const instructorId = req.id

    try {
        const course = await prisma.course.create({
            data: {
                title: title,
                description: description,
                price: price,
                instructorId: instructorId!
            }
        })
    
        return res.status(201).json({
            success: true,
            message: "course created",
            data: course
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        })
    }

}