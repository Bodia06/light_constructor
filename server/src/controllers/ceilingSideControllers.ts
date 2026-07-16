import createHttpError from 'http-errors'
import { CeilingSide, Ceiling } from '../database/models'
import { authMiddlewares } from '../middlewares'

import type { NextFunction, Request, Response } from 'express'
import type { apiTypes, ceilingSideTypes } from '../types'

export const getCeilingSides = async (
  req: authMiddlewares.RequestWithUser &
    Request<{}, {}, {}, ceilingSideTypes.CeilingSideQueryParams>,
  res: Response<
    apiTypes.ApiResponse<ceilingSideTypes.CeilingSideResponseDTO[]>
  >,
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

    const foundCeilingSides = await CeilingSide.findAll({
      include: [
        {
          model: Ceiling,
          as: 'ceiling',
          where: { userId: Number(currentUserId) },
          attributes: []
        }
      ],
      limit,
      offset,
      order: ['id'],
      raw: true
    })

    if (foundCeilingSides.length === 0) {
      return next(createHttpError(404, 'Ceiling sides not found'))
    }

    res.status(200).send({
      data: foundCeilingSides
    })
  } catch (err) {
    next(err)
  }
}

export const getCeilingSidesById = async (
  req: authMiddlewares.RequestWithUser &
    Request<ceilingSideTypes.GetCeilingSideByIdDTO>,
  res: Response<apiTypes.ApiResponse<ceilingSideTypes.CeilingSideResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const currentUserId = req.user?.id

    if (!currentUserId) {
      return next(createHttpError(401, 'Unauthorized.'))
    }

    const foundCeilingSide = await CeilingSide.findOne({
      where: { id: Number(id) },
      include: [
        {
          model: Ceiling,
          as: 'ceiling',
          where: { userId: Number(currentUserId) },
          attributes: []
        }
      ]
    })

    if (!foundCeilingSide) {
      return next(
        createHttpError(404, 'Ceiling side not found or access denied')
      )
    }

    return res.status(200).send({
      data: foundCeilingSide
    })
  } catch (err) {
    next(err)
  }
}

export const createCeilingSide = async (
  req: authMiddlewares.RequestWithUser &
    Request<{}, {}, ceilingSideTypes.CreateCeilingSideDTO>,
  res: Response<apiTypes.ApiResponse<ceilingSideTypes.CeilingSideResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { body } = req
    const currentUserId = req.user?.id

    if (!currentUserId) {
      return next(createHttpError(401, 'Unauthorized.'))
    }

    const userCeiling = await Ceiling.findOne({
      where: {
        id: body.ceilingId,
        userId: Number(currentUserId)
      }
    })

    if (!userCeiling) {
      return next(
        createHttpError(403, 'Forbidden. You cannot add sides to this ceiling.')
      )
    }

    const createdCeilingSide = await CeilingSide.create(body)

    res.status(201).send({ data: createdCeilingSide })
  } catch (err) {
    next(err)
  }
}

export const updateCeilingSide = async (
  req: authMiddlewares.RequestWithUser &
    Request<
      ceilingSideTypes.GetCeilingSideByIdDTO,
      {},
      ceilingSideTypes.CreateCeilingSideDTO
    >,
  res: Response<apiTypes.ApiResponse<ceilingSideTypes.CeilingSideResponseDTO>>,
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

    const foundCeilingSide = await CeilingSide.findOne({
      where: { id: Number(id) },
      include: [
        {
          model: Ceiling,
          as: 'ceiling',
          where: { userId: Number(currentUserId) },
          attributes: []
        }
      ]
    })

    if (!foundCeilingSide) {
      return next(
        createHttpError(404, 'Ceiling side not found or access denied')
      )
    }

    const updated = await foundCeilingSide.update(body)

    res.status(200).send({ data: updated })
  } catch (err) {
    next(err)
  }
}

export const deleteCeilingSide = async (
  req: authMiddlewares.RequestWithUser &
    Request<ceilingSideTypes.GetCeilingSideByIdDTO>,
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

    const foundCeilingSide = await CeilingSide.findOne({
      where: { id: Number(id) },
      include: [
        {
          model: Ceiling,
          as: 'ceiling',
          where: { userId: Number(currentUserId) },
          attributes: []
        }
      ]
    })

    if (!foundCeilingSide) {
      return next(
        createHttpError(404, 'Ceiling side not found or access denied')
      )
    }

    await foundCeilingSide.destroy()

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
