import createHttpError from 'http-errors'
import { Ceiling } from '../database/models'
import { authMiddlewares } from '../middlewares'

import type { NextFunction, Request, Response } from 'express'
import type { apiTypes, ceilingTypes } from '../types'

export const getCeilings = async (
  req: authMiddlewares.RequestWithUser &
    Request<{}, {}, {}, ceilingTypes.CeilingQueryParams>,
  res: Response<apiTypes.ApiResponse<ceilingTypes.CeilingResponseDTO[]>>,
  next: NextFunction
) => {
  const { page = 1, results = 5 } = req.query

  const limit = Number(results)
  const offset = (Number(page) - 1) * Number(results)

  try {
    const currentUserId = req.user?.id

    if (!currentUserId) {
      return next(createHttpError(401, 'Unauthorized. Please log in first.'))
    }

    const foundCeilings = await Ceiling.findAll({
      where: {
        userId: Number(currentUserId)
      },
      limit,
      offset,
      order: ['id'],
      raw: true
    })

    if (foundCeilings.length === 0) {
      return next(createHttpError(404, 'Ceilings not found'))
    }

    res.status(200).send({
      data: foundCeilings
    })
  } catch (err) {
    next(err)
  }
}

export const getCeilingById = async (
  req: authMiddlewares.RequestWithUser &
    Request<ceilingTypes.GetCeilingByIdDTO>,
  res: Response<apiTypes.ApiResponse<ceilingTypes.CeilingResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const currentUserId = req.user?.id

    if (!currentUserId) {
      return next(createHttpError(401, 'Unauthorized.'))
    }

    const foundCeiling = await Ceiling.findByPk(Number(id))

    if (!foundCeiling) {
      return next(createHttpError(404, 'Ceiling not found'))
    }

    if ((foundCeiling as any).userId !== Number(currentUserId)) {
      return next(
        createHttpError(
          403,
          'Forbidden. You do not have access to this ceiling.'
        )
      )
    }

    return res.status(200).send({
      data: foundCeiling
    })
  } catch (err) {
    next(err)
  }
}

export const createCeiling = async (
  req: authMiddlewares.RequestWithUser &
    Request<{}, {}, ceilingTypes.CreateCeilingDTO>,
  res: Response<apiTypes.ApiResponse<ceilingTypes.CeilingResponseDTO>>,
  next: NextFunction
) => {
  try {
    const currentUserId = req.user?.id

    if (!currentUserId) {
      return next(createHttpError(401, 'Unauthorized.'))
    }

    const ceilingData = {
      ...req.body,
      userId: Number(currentUserId)
    }

    const createdCeiling = await Ceiling.create(ceilingData as any)

    res.status(201).send({ data: createdCeiling })
  } catch (err) {
    next(err)
  }
}

export const updateCeiling = async (
  req: authMiddlewares.RequestWithUser &
    Request<ceilingTypes.GetCeilingByIdDTO, {}, ceilingTypes.CreateCeilingDTO>,
  res: Response<apiTypes.ApiResponse<ceilingTypes.CeilingResponseDTO>>,
  next: NextFunction
) => {
  const {
    body,
    params: { id }
  } = req

  try {
    const currentUserId = req.user?.id

    if (!currentUserId) {
      return next(createHttpError(401, 'Unauthorized.'))
    }

    const foundCeiling = await Ceiling.findByPk(Number(id))

    if (!foundCeiling) {
      return next(createHttpError(404, 'Ceiling not found'))
    }

    if ((foundCeiling as any).userId !== Number(currentUserId)) {
      return next(
        createHttpError(403, 'Forbidden. You cannot update this ceiling.')
      )
    }

    const [_, [updatedCeiling]] = await Ceiling.update(body, {
      where: { id: id },
      returning: true
    })

    res.status(200).send({ data: updatedCeiling })
  } catch (err) {
    next(err)
  }
}

export const deleteCeiling = async (
  req: authMiddlewares.RequestWithUser &
    Request<ceilingTypes.GetCeilingByIdDTO>,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id }
  } = req

  try {
    const currentUserId = req.user?.id

    if (!currentUserId) {
      return next(createHttpError(401, 'Unauthorized.'))
    }

    const foundCeiling = await Ceiling.findByPk(Number(id))

    if (!foundCeiling) {
      return next(createHttpError(404, 'Ceiling not found'))
    }

    if ((foundCeiling as any).userId !== Number(currentUserId)) {
      return next(
        createHttpError(403, 'Forbidden. You cannot delete this ceiling.')
      )
    }

    await Ceiling.destroy({
      where: { id: id }
    })

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
