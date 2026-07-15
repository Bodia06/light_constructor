export const USER_ROLES = ['admin', 'manager', 'buyer'] as const

export const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'

export const ALLOWED_FOLDERS: Record<string, string> = {
  goods: 'good_uploads',
  ceiling: 'ceiling_uploads'
}
