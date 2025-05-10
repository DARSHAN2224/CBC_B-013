import { check } from 'express-validator';

export const registerValidator=[
    check('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
    
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  check('mobile')
    .trim()
    .notEmpty()
    .withMessage('Mobile number is required')
    .matches(/^\d{10}$/)
    .withMessage('Mobile number must be exactly 10 digits'),

  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage(
      'Password must include an uppercase letter, a lowercase letter, a number, and a special character'
    )
]
export const loginValidator=[
    check('email')
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

    check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage(
      'Password must include an uppercase letter, a lowercase letter, a number, and a special character'
    ),
]
export const resetPasswordValidator=[
    check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage(
      'Password must include an uppercase letter, a lowercase letter, a number, and a special character'
    ),check('confirmPassword')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage(
      'Password must include an uppercase letter, a lowercase letter, a number, and a special character'
    )
]
export const forgetPasswordValidator=[
    check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
]


export const updateUserValidator=[
  check('name')
  .trim()
  .notEmpty()
  .withMessage('Name is required')
  .isLength({ min: 2 })
  .withMessage('Name must be at least 2 characters long'),
  
check('email')
  .trim()
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Invalid email address'),

check('mobile')
  .trim()
  .notEmpty()
  .withMessage('Mobile number is required')
  .matches(/^\d{10}$/)
  .withMessage('Mobile number must be exactly 10 digits'),

]

export const shopFormValidator=[
  check('name')
  .trim()
  .notEmpty()
  .withMessage('Name is required')
  .isLength({ min: 2 })
  .withMessage('Name must be at least 2 characters long'),
  
  check('description')
  .trim()
  .notEmpty()
  .withMessage('Description is required')
  .isLength({ min: 2 })
  .withMessage('Description must be at least 2 characters long'),
  check('state')
  .trim()
  .notEmpty()
  .withMessage('state is required')
  .isLength({ min: 2 })
  .withMessage('state must be at least 2 characters long'),
  check('city')
  .trim()
  .notEmpty()
  .withMessage('city is required')
  .isLength({ min: 2 })
  .withMessage('city must be at least 2 characters long'),
  check('location')
  .trim()
  .notEmpty()
  .withMessage('location is required')
  .isLength({ min: 2 })
  .withMessage('location must be at least 2 characters long'),
  check('FSSAI_license')
  .trim()
  .notEmpty()
  .withMessage('FSSAI_license is required')
  .isLength({ min: 2 })
  .withMessage('FSSAI_license must be at least 2 characters long'),
  check('Eating_house_license')
  .trim()
  .notEmpty()
  .withMessage('Eating_house_license is required')
  .isLength({ min: 2 })
  .withMessage('Eating_house_license must be at least 2 characters long'),
  check('Gst_registration')
  .trim()
  .notEmpty()
  .withMessage('Gst_registration is required')
  .isLength({ min: 2 })
  .withMessage('Gst_registration must be at least 2 characters long'),
  check('Healt_or_trade_license')
  .trim()
  .isLength({ min: 2 })
  .withMessage('Healt_or_trade_license must be at least 2 characters long'),
  check('Liquior_license')
  .trim()
  .isLength({ min: 2 })
  .withMessage('Liquior_license must be at least 2 characters long'),
  check('Environmental_clearance_license')
  .trim()
  .isLength({ min: 2 })
  .withMessage('Environmental_clearance_license must be at least 2 characters long'),
  check('Fire_safety_license')
  .trim()
  .isLength({ min: 2 })
  .withMessage('Fire_safety_license must be at least 2 characters long'),
  check('Signage_license')
  .trim()
  .isLength({ min: 2 })
  .withMessage('Signage_license must be at least 2 characters long'),
  check('Shop_act')
  .trim()
  .isLength({ min: 2 })
  .withMessage('Shop_act must be at least 2 characters long'),
  check('Insurance')
  .trim()
  .isLength({ min: 2 })
  .withMessage('Insurance must be at least 2 characters long'),
  check('contactNumber')
  .trim()
  .isLength({ min: 2 })
  .withMessage('contactNumber must be at least 2 characters long'),
  check('openingHours')
  .trim()
  .isLength({ min: 2 })
  .withMessage('openingHours must be at least 2 characters long'),
  check('closingHours')
  .trim()
  .isLength({ min: 2 })
  .withMessage('closingHours must be at least 2 characters long'),
]

