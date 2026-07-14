import type { NextFunction, Request, Response } from 'express'
import type { HttpError } from 'http-errors'

export const errorHandler = (
  err: HttpError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (res.headersSent) {
    return
  }

  const status = 'status' in err ? err.status : 500
  const message = err.message || 'Server Error'

  res.status(status).send({ message, status })
}
