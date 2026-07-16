import { Router } from 'express'
import { orderControllers } from '../controllers'
import { authMiddlewares, validationMiddlewares } from '../middlewares'
import { ORDER_SCHEM_CREATE } from '../utils/validationSchems'

const orderRouters = Router()

orderRouters.use(authMiddlewares.authenticateJWT)

orderRouters.get('/all-orders', orderControllers.getOrders)

orderRouters.get('/:id', orderControllers.getOrderById)

orderRouters.post(
  '/create-order',
  validationMiddlewares.validateBody(ORDER_SCHEM_CREATE),
  orderControllers.createOrder
)

orderRouters.delete('/delete-order/:id', orderControllers.deleteOrder)

export default orderRouters
