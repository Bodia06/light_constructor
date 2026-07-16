import { Router } from 'express'
import { goodControllers } from '../controllers'
import {
  authMiddlewares,
  cloudinaryMiddlewares,
  roleMiddlewares,
  validationMiddlewares
} from '../middlewares'
import { GOOD_SCHEM_CREATE, GOOD_SCHEM_UPDATE } from '../utils/validationSchems'
import { USER_MANAGER } from '../constants'

const goodRouters = Router()

goodRouters.get('/all-goods', goodControllers.getGoods)

goodRouters.get('/:id', goodControllers.getGoodById)

goodRouters.use(
  authMiddlewares.authenticateJWT,
  roleMiddlewares.authorizeRoles(USER_MANAGER)
)

goodRouters.get(
  '/cloudinary-signature',
  cloudinaryMiddlewares.getCloudinarySignature
)

goodRouters.post(
  '/create-good',
  validationMiddlewares.validateBody(GOOD_SCHEM_CREATE),
  goodControllers.createGood
)

goodRouters.put(
  '/update-good/:id',
  validationMiddlewares.validateBody(GOOD_SCHEM_UPDATE),
  goodControllers.updateGood
)

goodRouters.delete('/delete-good/:id', goodControllers.deleteGood)

export default goodRouters
