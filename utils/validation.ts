import { z } from 'zod'

export const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['STUDENT', 'INSTRUCTOR']),
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const createCourseSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.int(),
})

export const updateCourseSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.int().optional(),
})

export const createLessonSchema = z.object({
    title: z.string(),
    content: z.string(),
    courseId: z.string()
})

