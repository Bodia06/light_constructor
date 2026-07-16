import { Router } from 'express'
import { ceilingSideControllers } from '../controllers'
import { authMiddlewares, validationMiddlewares } from '../middlewares'
import {
  CEILING_SIDE_SCHEM_CREATE,
  CEILING_SIDE_SCHEM_UPDATE
} from '../utils/validationSchems'

const ceilingSidesRouters = Router()

ceilingSidesRouters.use(authMiddlewares.authenticateJWT)

ceilingSidesRouters.post(
  '/create-ceiling-side',
  validationMiddlewares.validateBody(CEILING_SIDE_SCHEM_CREATE),
  ceilingSideControllers.createCeilingSide
)

ceilingSidesRouters.get(
  '/all-ceiling-sides',
  ceilingSideControllers.getCeilingSides
)

ceilingSidesRouters.get('/:id', ceilingSideControllers.getCeilingSidesById)

ceilingSidesRouters.put(
  '/update-ceiling-side/:id',
  validationMiddlewares.validateBody(CEILING_SIDE_SCHEM_UPDATE),
  ceilingSideControllers.updateCeilingSide
)

ceilingSidesRouters.delete(
  '/delete-ceiling-side/:id',
  ceilingSideControllers.deleteCeilingSide
)

export default ceilingSidesRouters
