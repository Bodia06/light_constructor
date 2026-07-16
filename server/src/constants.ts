export const USER_ROLES = ['admin', 'manager', 'buyer'] as const

export const USER_ADMIN = 'admin'

export const USER_MANAGER = 'manager'

export const USER_BUYER = 'buyer'

export const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'

export const ALLOWED_FOLDERS: Record<string, string> = {
  goods: 'good_uploads'
}
