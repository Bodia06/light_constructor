import { Router } from 'express'
import userRouters from './userRouters'
import goodRouters from './goodRouters'
import orderRouters from './orderRouters'
import orderItemsRouters from './orderItemsRouters'
import ceilingRouters from './ceilingRouters'
import ceilingSidesRouters from './ceilingSidesRouters'

const router = Router()

router.use('/user', userRouters)

router.use('/good', goodRouters)

router.use('/order', orderRouters)

router.use('/order-items', orderItemsRouters)

router.use('/ceiling', ceilingRouters)

router.use('/ceiling-sides', ceilingSidesRouters)

export default router
