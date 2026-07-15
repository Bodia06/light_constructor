import createHttpError from 'http-errors'
import { RequestWithUser } from './authMiddlewares'

import type { Response, NextFunction } from 'express'

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: RequestWithUser, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createHttpError(401, 'Unauthorized. Please log in first.'))
    }

    const userRole = req.user.role

    if (!userRole || !allowedRoles.includes(userRole)) {
      return next(
        createHttpError(
          403,
          'Forbidden. You do not have permission to perform this action.'
        )
      )
    }

    next()
  }
}
