import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            id?: string
            role?: string
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
        })
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & {
            id: string
            role: string
        }

        if (typeof decodedData === 'string') {
            return res.status(400).json({
                success: false,
                message: 'invalid token payload',
            })
        }

        if (decodedData) {
            req.id = decodedData.id
            req.role = decodedData.role
            next()
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'invalid token',
        })
    }
}
