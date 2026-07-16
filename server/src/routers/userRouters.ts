import { Router } from 'express'
import { userControllers } from '../controllers'
import {
  authMiddlewares,
  roleMiddlewares,
  validationMiddlewares
} from '../middlewares'
import { USER_SCHEM_CREATE, USER_SCHEM_UPDATE } from '../utils/validationSchems'
import { USER_ADMIN } from '../constants'

const userRouters = Router()

userRouters.post(
  '/registration',
  validationMiddlewares.validateBody(USER_SCHEM_CREATE),
  userControllers.createUser
)

userRouters.post('/login', userControllers.loginUser)

userRouters.use(authMiddlewares.authenticateJWT)

userRouters.get(
  '/all-user',
  roleMiddlewares.authorizeRoles(USER_ADMIN),
  userControllers.getUsers
)

userRouters.get('/:id', userControllers.getUserById)

userRouters.put(
  '/update-user/:id',
  validationMiddlewares.validateBody(USER_SCHEM_UPDATE),
  userControllers.updateUser
)

userRouters.delete('/delete-user/:id', userControllers.deleteUser)

export default userRouters
