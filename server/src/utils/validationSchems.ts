import * as yup from 'yup'
import { USER_ROLES } from '../constants'

import type {
  userTypes,
  goodTypes,
  orderTypes,
  orderItemTypes,
  ceilingTypes,
  ceilingSideTypes
} from '../types'

// ==========================================
// USER VALIDATION SCHEMAS
// ==========================================
export const USER_SCHEM_CREATE: yup.ObjectSchema<userTypes.CreateUserDTO> =
  yup.object({
    firstName: yup
      .string()
      .trim()
      .min(3, 'First name is short')
      .max(60, 'First name is long')
      .required('First name is required'),
    lastName: yup
      .string()
      .trim()
      .min(3, 'Last name is short')
      .max(60, 'Last name is long')
      .required('Last name is required'),
    email: yup
      .string()
      .trim()
      .email('Invalid email format')
      .required('Email is required'),
    phone: yup
      .string()
      .trim()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
      .required('Phone is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(
        /[@$!%*?&]/,
        'Password must contain at least one special character (@$!%*?&)'
      )
      .required('Password is required'),
    role: yup
      .string()
      .oneOf([...USER_ROLES], 'Invalid user role')
      .required('User role is required')
  })

export const USER_SCHEM_UPDATE: yup.ObjectSchema<userTypes.UpdateUserDTO> =
  yup.object({
    firstName: yup
      .string()
      .trim()
      .min(3, 'First name is short')
      .max(60, 'First name is long'),
    lastName: yup
      .string()
      .trim()
      .min(3, 'Last name is short')
      .max(60, 'Last name is long'),
    email: yup.string().trim().email('Invalid email format'),
    phone: yup
      .string()
      .trim()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
    password: yup
      .string()
      .transform(value => (value === '' ? undefined : value))
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(
        /[@$!%*?&]/,
        'Password must contain at least one special character (@$!%*?&)'
      ),
    role: yup.string().oneOf([...USER_ROLES], 'Invalid user role')
  })

// ==========================================
// GOOD VALIDATION SCHEMAS
// ==========================================
export const GOOD_SCHEM_CREATE: yup.ObjectSchema<goodTypes.CreateGoodDTO> =
  yup.object({
    description: yup
      .string()
      .trim()
      .min(20, 'Good description is short')
      .max(250, 'Good description is long')
      .required('Good description is required'),
    logoSrc: yup.string().trim().required('Good image is required'),
    title: yup
      .string()
      .trim()
      .min(5, 'Good title is short')
      .max(50, 'Good title is long')
      .required('Good title is required'),
    count: yup
      .number()
      .typeError('Count must be a number')
      .integer('Count must be an integer')
      .min(0, 'Count cannot be negative')
      .required('Good count is required'),
    price: yup
      .string()
      .trim()
      .matches(/^\d+(\.\d{1,2})?$/, 'Invalid price format (e.g., 10.99)')
      .required('Good price is required')
  })

export const GOOD_SCHEM_UPDATE: yup.ObjectSchema<goodTypes.UpdateGoodDTO> =
  yup.object({
    description: yup
      .string()
      .trim()
      .min(20, 'Good description is short')
      .max(250, 'Good description is long'),
    logoSrc: yup.string().trim(),
    title: yup
      .string()
      .trim()
      .min(5, 'Good title is short')
      .max(50, 'Good title is long'),
    count: yup
      .number()
      .typeError('Count must be a number')
      .integer('Count must be an integer')
      .min(0, 'Count cannot be negative'),
    price: yup
      .string()
      .trim()
      .matches(/^\d+(\.\d{1,2})?$/, 'Invalid price format (e.g., 10.99)')
  })

// ==========================================
// ORDER VALIDATION SCHEMAS
// ==========================================
export const ORDER_SCHEM_CREATE: yup.ObjectSchema<orderTypes.CreateOrderDTO> =
  yup.object({
    userId: yup
      .number()
      .typeError('User ID must be a number')
      .integer()
      .required('User is required')
  })

// ==========================================
// ORDER ITEMS VALIDATION SCHEMAS
// ==========================================
export const ORDER_ITEMS_SCHEM_CREATE: yup.ObjectSchema<orderItemTypes.CrateOrderItemDTO> =
  yup.object({
    orderId: yup
      .number()
      .typeError('Order ID must be a number')
      .integer('Order ID must be an integer')
      .required('Order ID is required'),
    goodId: yup
      .number()
      .typeError('Good ID must be a number')
      .integer('Good ID must be an integer')
      .required('Good ID is required'),
    quantity: yup
      .number()
      .typeError('Quantity must be a number')
      .integer('Quantity must be an integer')
      .min(1, 'Quantity must be at least 1')
      .required('Quantity is required'),
    priceAtPurchase: yup
      .string()
      .trim()
      .matches(/^\d+(\.\d{1,2})?$/, 'Invalid price format (e.g., 10.99)')
      .required('Price at purchase is required')
  })

// ==========================================
// CEILING VALIDATION SCHEMAS
// ==========================================
export const CEILING_SHCEM_CREATE: yup.ObjectSchema<ceilingTypes.CreateCeilingDTO> =
  yup.object({
    userId: yup
      .number()
      .typeError('User ID must be a number')
      .integer()
      .required('User is required'),
    title: yup
      .string()
      .trim()
      .min(5, 'Ceiling title is short')
      .max(50, 'Ceiling title id long')
      .required('Ceiling title is required')
  })

export const CEILING_SHCEM_UPDATE: yup.ObjectSchema<ceilingTypes.UpdateCeilingDTO> =
  yup.object({
    userId: yup.number().typeError('User ID must be a number').integer(),
    title: yup
      .string()
      .trim()
      .min(5, 'Ceiling title is short')
      .max(50, 'Ceiling title id long')
  })

// ==========================================
// CEILING SIDE VALIDATION SCHEMAS
// ==========================================
export const CEILING_SIDE_SCHEM_CREATE: yup.ObjectSchema<ceilingSideTypes.CreateCeilingSideDTO> =
  yup.object({
    ceilingId: yup
      .number()
      .typeError('Ceiling ID must be a number')
      .integer('Ceiling ID must be an integer')
      .required('Ceiling ID is required'),
    sequenceOrder: yup
      .number()
      .typeError('Sequence order must be a number')
      .integer('Sequence order must be an integer')
      .min(1, 'Sequence order must start from at least 1')
      .required('Sequence order is required'),
    startX: yup
      .string()
      .trim()
      .matches(/^-?\d+(\.\d+)?$/, 'Start X must be a valid coordinate value')
      .required('Start X coordinate is required'),
    startY: yup
      .string()
      .trim()
      .matches(/^-?\d+(\.\d+)?$/, 'Start Y must be a valid coordinate value')
      .required('Start Y coordinate is required'),
    endX: yup
      .string()
      .trim()
      .matches(/^-?\d+(\.\d+)?$/, 'End X must be a valid coordinate value')
      .required('End X coordinate is required'),
    endY: yup
      .string()
      .trim()
      .matches(/^-?\d+(\.\d+)?$/, 'End Y must be a valid coordinate value')
      .required('End Y coordinate is required')
  })

export const CEILING_SIDE_SCHEM_UPDATE: yup.ObjectSchema<ceilingSideTypes.UpdateCeilingSideDTO> =
  yup.object({
    ceilingId: yup
      .number()
      .typeError('Ceiling ID must be a number')
      .integer('Ceiling ID must be an integer'),
    sequenceOrder: yup
      .number()
      .typeError('Sequence order must be a number')
      .integer('Sequence order must be an integer')
      .min(1, 'Sequence order must start from at least 1'),
    startX: yup
      .string()
      .trim()
      .matches(/^-?\d+(\.\d+)?$/, 'Start X must be a valid coordinate value'),
    startY: yup
      .string()
      .trim()
      .matches(/^-?\d+(\.\d+)?$/, 'Start Y must be a valid coordinate value'),
    endX: yup
      .string()
      .trim()
      .matches(/^-?\d+(\.\d+)?$/, 'End X must be a valid coordinate value'),
    endY: yup
      .string()
      .trim()
      .matches(/^-?\d+(\.\d+)?$/, 'End Y must be a valid coordinate value')
  })
