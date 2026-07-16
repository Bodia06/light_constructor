import createHttpError from 'http-errors'

import type { Request, Response, NextFunction } from 'express'
import type { AnyObjectSchema } from 'yup'

export const validateBody = (schema: AnyObjectSchema) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validatedBody = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      })
      req.body = validatedBody
      next()
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const messages = error.inner.map((err: any) => err.message).join(', ')
        return next(createHttpError(400, `Validation Error: ${messages}`))
      }
      next(error)
    }
  }
}
