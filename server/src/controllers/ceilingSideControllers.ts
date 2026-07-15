import createHttpError from 'http-errors'
import { CeilingSide } from '../database/models'

import type { NextFunction, Request, Response } from 'express'
import type { apiTypes, ceilingSideTypes } from '../types'

export const getCeilingSides = async (
  req: Request<{}, {}, {}, ceilingSideTypes.CeilingSideQueryParams>,
  res: Response<
    apiTypes.ApiResponse<ceilingSideTypes.CeilingSideResponseDTO[]>
  >,
  next: NextFunction
) => {
  const { page = 1, results = 5 } = req.query

  const limit = Number(results)
  const offset = (Number(page) - 1) * Number(results)

  try {
    const foundCeilingSides = await CeilingSide.findAll({
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
  req: Request<ceilingSideTypes.GetCeilingSideByIdDTO>,
  res: Response<apiTypes.ApiResponse<ceilingSideTypes.CeilingSideResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const foundCeilingSide = await CeilingSide.findByPk(Number(id))

    if (!foundCeilingSide) {
      return next(createHttpError(404, 'Ceiling side not found'))
    }

    return res.status(200).send({
      data: foundCeilingSide
    })
  } catch (err) {
    next(err)
  }
}

export const createCeilingSide = async (
  req: Request<{}, {}, ceilingSideTypes.CreateCeilingSideDTO>,
  res: Response<apiTypes.ApiResponse<ceilingSideTypes.CeilingSideResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { body } = req

    const createCeilingSide = await CeilingSide.create(body)

    res.status(201).send({ data: createCeilingSide })
  } catch (err) {
    next(err)
  }
}

export const updateCeilingSide = async (
  req: Request<
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
    const [_, [updatedCeilingSide]] = await CeilingSide.update(body, {
      where: { id: id },
      returning: true
    })

    if (!updatedCeilingSide) {
      return next(createHttpError(404, 'Ceiling side not found'))
    }

    res.status(200).send({ data: updatedCeilingSide })
  } catch (err) {
    next(err)
  }
}

export const deleteCeilingSide = async (
  req: Request<ceilingSideTypes.GetCeilingSideByIdDTO>,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id }
  } = req

  try {
    const deletedCount = await CeilingSide.destroy({
      where: { id: id }
    })

    if (deletedCount === 0) {
      return next(createHttpError(404, 'Ceiling side not found'))
    }

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
