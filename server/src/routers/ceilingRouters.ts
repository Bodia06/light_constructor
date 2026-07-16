import { Router } from 'express'
import { ceilingControllers } from '../controllers'
import { authMiddlewares, validationMiddlewares } from '../middlewares'
import {
  CEILING_SHCEM_CREATE,
  CEILING_SHCEM_UPDATE
} from '../utils/validationSchems'

const ceilingRouters = Router()

ceilingRouters.use(authMiddlewares.authenticateJWT)

ceilingRouters.post(
  '/create-ceiling',
  validationMiddlewares.validateBody(CEILING_SHCEM_CREATE),
  ceilingControllers.createCeiling
)
ceilingRouters.get('/all-ceilings', ceilingControllers.getCeilings)

ceilingRouters.get('/:id', ceilingControllers.getCeilingById)

ceilingRouters.put(
  '/update-ceiling/:id',
  validationMiddlewares.validateBody(CEILING_SHCEM_UPDATE),
  ceilingControllers.updateCeiling
)

ceilingRouters.delete('/delete-ceiling/:id', ceilingControllers.deleteCeiling)

export default ceilingRouters
