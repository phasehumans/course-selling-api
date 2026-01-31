import type { Request, Response } from 'express'
import { loginSchema, signupSchema } from '../utils/validation'
import { prisma } from '../db'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signUp = async (req: Request, res: Response) => {
    const parseData = signupSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid inputs',
            error: parseData.error.flatten()
        })
    }

    const { name, email, password, role } = parseData.data

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })
    
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'email already exists',
            })
        }
    
    
        const hashPassword = await bcrypt.hash(password, 10)
    
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword,
                role: role
            }
        })
    
        return res.status(201).json({
            success: true,
            message: "user signup successful",
            data: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        })
    }
}

export const login = async (req: Request, res: Response) => {
    const parseData = loginSchema.safeParse(req.body)

    if(!parseData.success){
        return res.status(400).json({
            success: false,
            message: "invalid inputs",
            error: parseData.error.flatten()
        })
    }

    const {email, password} = parseData.data

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if(!user){
            return res.status(400).json({
                success: false,
                message: "invalid email or password",
            })
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
    
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "invalid email or password",
            })
        }
    
        const token = await jwt.sign({
            id: user.id,
            role: user.role
        },process.env.JWT_SECRET!)
    
        return res.status(200).json({
            success: true,
            message: "user logged in",
            data: {
                token: token
            }
        })
    
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        })
    }

}