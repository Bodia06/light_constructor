import createHttpError from 'http-errors'
import { Ceiling } from '../database/models'

import type { NextFunction, Request, Response } from 'express'
import type { apiTypes, ceilingTypes } from '../types'

export const getCeilings = async (
  req: Request<{}, {}, {}, ceilingTypes.CeilingQueryParams>,
  res: Response<apiTypes.ApiResponse<ceilingTypes.CeilingResponseDTO[]>>,
  next: NextFunction
) => {
  const { page = 1, results = 5 } = req.query

  const limit = Number(results)
  const offset = (Number(page) - 1) * Number(results)

  try {
    const foundCeilings = await Ceiling.findAll({
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
  req: Request<ceilingTypes.GetCeilingByIdDTO>,
  res: Response<apiTypes.ApiResponse<ceilingTypes.CeilingResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const foundCeiling = await Ceiling.findByPk(Number(id))

    if (!foundCeiling) {
      return next(createHttpError(404, 'Ceiling not found'))
    }

    return res.status(200).send({
      data: foundCeiling
    })
  } catch (err) {
    next(err)
  }
}

export const createCeiling = async (
  req: Request<{}, {}, ceilingTypes.CreateCeilingDTO>,
  res: Response<apiTypes.ApiResponse<ceilingTypes.CeilingResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { body } = req

    const createCeiling = await Ceiling.create(body)

    res.status(201).send({ data: createCeiling })
  } catch (err) {
    next(err)
  }
}

export const updateCeiling = async (
  req: Request<
    ceilingTypes.GetCeilingByIdDTO,
    {},
    ceilingTypes.CreateCeilingDTO
  >,
  res: Response<apiTypes.ApiResponse<ceilingTypes.CeilingResponseDTO>>,
  next: NextFunction
) => {
  const {
    body,
    params: { id }
  } = req

  try {
    const [_, [updatedCeiling]] = await Ceiling.update(body, {
      where: { id: id },
      returning: true
    })

    if (!updatedCeiling) {
      return next(createHttpError(404, 'Ceiling not found'))
    }

    res.status(200).send({ data: updatedCeiling })
  } catch (err) {
    next(err)
  }
}

export const deleteCeiling = async (
  req: Request<ceilingTypes.GetCeilingByIdDTO>,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id }
  } = req

  try {
    const deletedCount = await Ceiling.destroy({
      where: { id: id }
    })

    if (deletedCount === 0) {
      return next(createHttpError(404, 'Ceiling not found'))
    }

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
