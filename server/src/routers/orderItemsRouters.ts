import { Router } from 'express'
import { orderItemsControllers } from '../controllers'
import { authMiddlewares, validationMiddlewares } from '../middlewares'
import { ORDER_ITEMS_SCHEM_CREATE } from '../utils/validationSchems'

const orderItemsRouters = Router()

orderItemsRouters.use(authMiddlewares.authenticateJWT)

orderItemsRouters.get('/all-order-items', orderItemsControllers.getOrderItems)

orderItemsRouters.get('/order-item/:id', orderItemsControllers.getOrderItemById)

orderItemsRouters.post(
  '/add-order-item',
  validationMiddlewares.validateBody(ORDER_ITEMS_SCHEM_CREATE),
  orderItemsControllers.createOrderItem
)

orderItemsRouters.delete(
  '/delete-order-item/:id',
  orderItemsControllers.deleteOrderItem
)

export default orderItemsRouters
