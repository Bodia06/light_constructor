export const USER_ROLES = ['admin', 'manager', 'buyer'] as const

export const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'
