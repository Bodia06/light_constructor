import createHttpError from 'http-errors'
import { Good } from '../database/models'

import type { NextFunction, Request, Response } from 'express'
import type { RequestWithUser } from '../middlewares/authMiddlewares'
import type { apiTypes, goodTypes } from '../types'

export const getGoods = async (
  req: Request<{}, {}, {}, goodTypes.GoodQueryParams>,
  res: Response<apiTypes.ApiResponse<goodTypes.GoodResponseDTO[]>>,
  next: NextFunction
) => {
  const { page = 1, results = 5 } = req.query

  const limit = Number(results)
  const offset = (Number(page) - 1) * Number(results)

  try {
    const foundGoods = await Good.findAll({
      limit,
      offset,
      order: ['id'],
      raw: true
    })

    if (foundGoods.length === 0) {
      return next(createHttpError(404, 'Goods not found'))
    }

    res.status(200).send({
      data: foundGoods
    })
  } catch (err) {
    next(err)
  }
}

export const getGoodById = async (
  req: Request<goodTypes.GetGoodByIdDTO>,
  res: Response<apiTypes.ApiResponse<goodTypes.GoodResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const foundGood = await Good.findByPk(Number(id))

    if (!foundGood) {
      return next(createHttpError(404, 'Good not found'))
    }

    return res.status(200).send({
      data: foundGood
    })
  } catch (err) {
    next(err)
  }
}

export const createGood = async (
  req: RequestWithUser & Request<{}, {}, goodTypes.CreateGoodDTO>,
  res: Response<apiTypes.ApiResponse<goodTypes.GoodResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { body } = req

    const createGood = await Good.create(body)

    res.status(201).send({ data: createGood })
  } catch (err) {
    next(err)
  }
}

export const updateGood = async (
  req: RequestWithUser &
    Request<goodTypes.GetGoodByIdDTO, {}, goodTypes.UpdateGoodDTO>,
  res: Response<apiTypes.ApiResponse<goodTypes.GoodResponseDTO>>,
  next: NextFunction
) => {
  const {
    body,
    params: { id }
  } = req

  try {
    const [_, [updatedGood]] = await Good.update(body, {
      where: { id: id },
      returning: true
    })

    if (!updatedGood) {
      return next(createHttpError(404, 'Good not found'))
    }

    res.status(200).send({ data: updatedGood })
  } catch (err) {
    next(err)
  }
}

export const deleteGood = async (
  req: RequestWithUser & Request<goodTypes.GetGoodByIdDTO>,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id }
  } = req

  try {
    const deletedCount = await Good.destroy({
      where: { id: id }
    })

    if (deletedCount === 0) {
      return next(createHttpError(404, 'Good not found'))
    }

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
