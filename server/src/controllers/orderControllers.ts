import createHttpError from 'http-errors'
import { Order } from '../database/models'
import { authMiddlewares } from '../middlewares'

import type { NextFunction, Request, Response } from 'express'
import type { apiTypes, orderTypes } from '../types'

export const getOrders = async (
  req: authMiddlewares.RequestWithUser &
    Request<{}, {}, {}, orderTypes.OrderQueryParams>,
  res: Response<apiTypes.ApiResponse<orderTypes.OrderResponseDTO[]>>,
  next: NextFunction
) => {
  const { page = 1, results = 5 } = req.query

  const limit = Number(results)
  const offset = (Number(page) - 1) * Number(results)

  try {
    const currentUserId = req.user?.id
    const currentUserRole = req.user?.role

    if (!currentUserId) {
      return next(
        createHttpError(401, 'Unauthorized. Access token is missing.')
      )
    }

    const whereCondition: any = {}
    if (currentUserRole !== 'admin' && currentUserRole !== 'manager') {
      whereCondition.userId = Number(currentUserId)
    }

    const foundOrders = await Order.findAll({
      where: whereCondition,
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
  req: authMiddlewares.RequestWithUser & Request<orderTypes.GetOrderByIdDTO>,
  res: Response<apiTypes.ApiResponse<orderTypes.OrderResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const currentUserId = req.user?.id
    const currentUserRole = req.user?.role

    if (!currentUserId) {
      return next(createHttpError(401, 'Unauthorized.'))
    }

    const foundOrder = await Order.findByPk(Number(id))

    if (!foundOrder) {
      return next(createHttpError(404, 'Order not found'))
    }

    if (
      currentUserRole !== 'admin' &&
      currentUserRole !== 'manager' &&
      foundOrder.userId !== Number(currentUserId)
    ) {
      return next(
        createHttpError(403, 'Forbidden. You do not have access to this order.')
      )
    }

    return res.status(200).send({
      data: foundOrder
    })
  } catch (err) {
    next(err)
  }
}

export const createOrder = async (
  req: authMiddlewares.RequestWithUser &
    Request<{}, {}, orderTypes.CreateOrderDTO>,
  res: Response<apiTypes.ApiResponse<orderTypes.OrderResponseDTO>>,
  next: NextFunction
) => {
  try {
    const currentUserId = req.user?.id

    if (!currentUserId) {
      return next(createHttpError(401, 'Unauthorized.'))
    }

    const orderData = {
      ...req.body,
      userId: Number(currentUserId)
    }

    const createdOrder = await Order.create(orderData as any)

    res.status(201).send({ data: createdOrder })
  } catch (err) {
    next(err)
  }
}

export const deleteOrder = async (
  req: authMiddlewares.RequestWithUser & Request<orderTypes.GetOrderByIdDTO>,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id }
  } = req

  try {
    const currentUserId = req.user?.id
    const currentUserRole = req.user?.role

    if (!currentUserId) {
      return next(createHttpError(401, 'Unauthorized.'))
    }

    const foundOrder = await Order.findByPk(Number(id))

    if (!foundOrder) {
      return next(createHttpError(404, 'Order not found'))
    }

    if (
      currentUserRole !== 'admin' &&
      currentUserRole !== 'manager' &&
      foundOrder.userId !== Number(currentUserId)
    ) {
      return next(
        createHttpError(403, 'Forbidden. You cannot delete this order.')
      )
    }

    await Order.destroy({
      where: { id: id }
    })

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
