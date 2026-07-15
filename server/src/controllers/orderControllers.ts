import createHttpError from 'http-errors'
import { Order } from '../database/models'

import type { NextFunction, Request, Response } from 'express'
import type { apiTypes, orderTypes } from '../types'

export const getOrder = async (
  req: Request<{}, {}, {}, orderTypes.OrderQueryParams>,
  res: Response<apiTypes.ApiResponse<orderTypes.OrderResponseDTO[]>>,
  next: NextFunction
) => {
  const { page = 1, results = 5 } = req.query

  const limit = Number(results)
  const offset = (Number(page) - 1) * Number(results)

  try {
    const foundOrders = await Order.findAll({
      limit,
      offset,
      order: ['id'],
      raw: true
    })

    if (foundOrders.length === 0) {
      return next(createHttpError(404, 'Orders not found'))
    }

    res.status(200).send({
      data: foundOrders
    })
  } catch (err) {
    next(err)
  }
}

export const getOrderById = async (
  req: Request<orderTypes.GetOrderByIdDTO>,
  res: Response<apiTypes.ApiResponse<orderTypes.OrderResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const foundOrder = await Order.findByPk(Number(id))

    if (!foundOrder) {
      return next(createHttpError(404, 'Order not found'))
    }

    return res.status(200).send({
      data: foundOrder
    })
  } catch (err) {
    next(err)
  }
}

export const createOrder = async (
  req: Request<{}, {}, orderTypes.CreateOrderDTO>,
  res: Response<apiTypes.ApiResponse<orderTypes.OrderResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { body } = req

    const createOrder = await Order.create(body)

    res.status(201).send({ data: createOrder })
  } catch (err) {
    next(err)
  }
}

export const updateOrder = async (
  req: Request<orderTypes.GetOrderByIdDTO, {}, orderTypes.UpdateOrderDTO>,
  res: Response<apiTypes.ApiResponse<orderTypes.OrderResponseDTO>>,
  next: NextFunction
) => {
  const {
    body,
    params: { id }
  } = req

  try {
    const [_, [updatedOrder]] = await Order.update(body, {
      where: { id: id },
      returning: true
    })

    if (!updatedOrder) {
      return next(createHttpError(404, 'Order not found'))
    }

    res.status(200).send({ data: updatedOrder })
  } catch (err) {
    next(err)
  }
}

export const deleteOrder = async (
  req: Request<orderTypes.GetOrderByIdDTO>,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id }
  } = req

  try {
    const deletedCount = await Order.destroy({
      where: { id: id }
    })

    if (deletedCount === 0) {
      return next(createHttpError(404, 'Order not found'))
    }

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
