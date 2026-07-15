import createHttpError from 'http-errors'
import cloudinary from '../utils/cloudinary'
import { ALLOWED_FOLDERS } from '../constants'

import type { NextFunction, Request, Response } from 'express'

export const getCloudinarySignature = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { type } = req.query

    if (!type || typeof type !== 'string' || !ALLOWED_FOLDERS[type]) {
      return next(
        createHttpError(
          400,
          `Invalid or missing upload type. Allowed types: ${Object.keys(
            ALLOWED_FOLDERS
          ).join(', ')}`
        )
      )
    }

    const folder = ALLOWED_FOLDERS[type]
    const timestamp = Math.round(new Date().getTime() / 1000)

    const apiSecret = process.env.CLOUDINARY_API_SECRET
    if (!apiSecret) {
      return next(
        createHttpError(
          500,
          'Cloudinary configuration is missing on the server.'
        )
      )
    }

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: folder
      },
      apiSecret
    )

    return res.status(200).json({
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder
    })
  } catch (error) {
    return next(createHttpError(500, 'Failed to generate signature'))
  }
}
