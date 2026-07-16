import createHttpError from 'http-errors'
import { User } from '../database/models'
import { generateToken } from '../utils/jwt'
import { authMiddlewares } from '../middlewares'

import type { NextFunction, Request, Response } from 'express'
import type { userTypes, apiTypes } from '../types'

export const getUsers = async (
  req: authMiddlewares.RequestWithUser &
    Request<{}, {}, {}, userTypes.UserQueryParams>,
  res: Response<apiTypes.ApiResponse<userTypes.UserResponseDTO[]>>,
  next: NextFunction
) => {
  const { page = 1, results = 5 } = req.query

  const limit = Number(results)
  const offset = (Number(page) - 1) * Number(results)
  try {
    const foundUsers = await User.findAll({
      limit,
      offset,
      order: ['id'],
      raw: true
    })

    if (foundUsers.length === 0) {
      return next(createHttpError(404, 'Users not found'))
    }

    res.status(200).send({
      data: foundUsers
    })
  } catch (err) {
    next(err)
  }
}

export const getUserById = async (
  req: Request<userTypes.GetUserByIdDTO>,
  res: Response<apiTypes.ApiResponse<userTypes.UserResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const foundUser = await User.findByPk(Number(id))

    if (!foundUser) {
      return next(createHttpError(404, 'User not found'))
    }

    return res.status(200).send({
      data: foundUser
    })
  } catch (err) {
    next(err)
  }
}

export const createUser = async (
  req: Request<{}, {}, userTypes.CreateUserDTO>,
  res: Response<apiTypes.ApiResponse<userTypes.UserResponseDTO>>,
  next: NextFunction
) => {
  try {
    const { body } = req

    const createUser = await User.create(body)

    res.status(201).send({ data: createUser })
  } catch (err) {
    next(err)
  }
}

export const loginUser = async (
  req: Request<{}, {}, userTypes.LoginUserDTO>,
  res: Response<apiTypes.ApiResponse<userTypes.LoginResponseDTO>>,
  next: NextFunction
) => {
  const { email, password } = req.body

  try {
    const foundUser = await User.findOne({
      where: { email }
    })

    if (!foundUser) {
      return next(createHttpError(401, 'Invalid email or password'))
    }

    const isPasswordCorrect = password === foundUser.password

    if (!isPasswordCorrect) {
      return next(createHttpError(401, 'Invalid email or password'))
    }

    const tokenPayload = {
      id: foundUser.id.toString(),
      email: foundUser.email,
      role: foundUser.role
    }

    const token = generateToken(tokenPayload)

    const userPlain = foundUser.get({ plain: true })
    const {
      password: _,
      createdAt,
      updatedAt,
      ...userResponse
    } = userPlain as any

    res.status(200).send({
      data: {
        token,
        user: userResponse as userTypes.UserResponseDTO
      }
    })
  } catch (err) {
    next(err)
  }
}

export const updateUser = async (
  req: authMiddlewares.RequestWithUser &
    Request<userTypes.GetUserByIdDTO, {}, userTypes.UpdateUserDTO>,
  res: Response<apiTypes.ApiResponse<userTypes.UserResponseDTO>>,
  next: NextFunction
) => {
  const {
    body,
    params: { id }
  } = req

  try {
    const [_, [updatedUser]] = await User.update(body, {
      where: { id: id },
      returning: true
    })

    if (!updatedUser) {
      return next(createHttpError(404, 'User not found'))
    }

    res.status(200).send({ data: updatedUser })
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (
  req: Request<userTypes.GetUserByIdDTO>,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { id }
  } = req

  try {
    const deletedCount = await User.destroy({
      where: { id: id }
    })

    if (deletedCount === 0) {
      return next(createHttpError(404, 'User not found'))
    }

    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
