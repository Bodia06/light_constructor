import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants'

import type { tockenPayloads } from '../types'

export const generateToken = (payload: tockenPayloads.TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

export const verifyToken = (token: string): tockenPayloads.TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as tockenPayloads.TokenPayload
}
