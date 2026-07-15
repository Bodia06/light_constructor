import createHttpError from 'http-errors'
import { OrderItem } from '../database/models'

import type { NextFunction, Request, Response } from 'express'
import type { apiTypes, orderItemTypes } from '../types'

export const getOrderItem = async (
  req: Request<{}, {}, {}, orderItemTypes.OrderItemQueryParams>,
  res: Response<apiTypes.ApiResponse<orderItemTypes.OrderItemrResponseDTO[]>>,
  next: NextFunction
) => {
  const { page = 1, results = 5 } = req.query

  const limit = Number(results)
  const offset = (Number(page) - 1) * Number(results)

  try {
    const foundOrderItems = await OrderItem.findAll({
      limit,
      offset,
      order: ['id'],
      raw: true
    })

    if (foundOrderItems.length === 0) {
      return next(createHttpError(404, 'Order items not found'))
    }

    res.status(200).send({
      data: foundOrderItems
    })
  } catch (err) {
    next(err)
  }
}

export const getOrderItemById = async (
  req: Request<orderItemTypes.GetOrderItemByIdDTO>,
  res: Response<apiTypes.ApiResponse<orderItemTypes.OrderItemrResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const foundOrderItem = await OrderItem.findByPk(Number(id))

    if (!foundOrderItem) {
      return next(createHttpError(404, 'Order item not found'))
    }

    return res.status(200).send({
      data: foundOrderItem
    })
  } catch (err) {
    next(err)
  }
}

export const createOrderItem = async (
  req: Request<{}, {}, orderItemTypes.CrateOrderItemDTO>,
  res: Response<apiTypes.ApiResponse<orderItemTypes.OrderItemrResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { body } = req

    const createOrderItem = await OrderItem.create(body)

    res.status(201).send({ data: createOrderItem })
  } catch (err) {
    next(err)
  }
}

export const updateOrderItem = async (
  req: Request<
    orderItemTypes.GetOrderItemByIdDTO,
    {},
    orderItemTypes.CrateOrderItemDTO
  >,
  res: Response<apiTypes.ApiResponse<orderItemTypes.OrderItemrResponseDTO>>,
  next: NextFunction
) => {
  const {
    body,
    params: { id }
  } = req

  try {
    const [_, [updatedOrderItem]] = await OrderItem.update(body, {
      where: { id: id },
      returning: true
    })

    if (!updatedOrderItem) {
      return next(createHttpError(404, 'Order item not found'))
    }

    res.status(200).send({ data: updatedOrderItem })
  } catch (err) {
    next(err)
  }
}

export const deleteOrderItem = async (
  req: Request<orderItemTypes.GetOrderItemByIdDTO>,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id }
  } = req

  try {
    const deletedCount = await OrderItem.destroy({
      where: { id: id }
    })

    if (deletedCount === 0) {
      return next(createHttpError(404, 'Order item not found'))
    }

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
