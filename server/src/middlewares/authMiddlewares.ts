import { verifyToken, TokenPayload } from '../utils/jwt'

import type { Request, Response, NextFunction } from 'express'

export interface RequestWithUser extends Request {
  user?: {
    id: string
    email: string
    role?: string
  }
}

export const authenticateJWT = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded: TokenPayload = verifyToken(token)

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    }

    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' })
  }
}
