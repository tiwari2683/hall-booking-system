const express = require('express');
const { body, param, query } = require('express-validator');
const { validateRequest } = require('../middlewares/validation.middleware');
const { createBookingSchema, updateBookingSchema, bookingIdSchema } = require('../validations/booking.validator');
const bookingController = require('../controllers/booking.controller');

const router = express.Router();

// Validation middleware
const validateBookingId = [
  param('id')
    .isUUID()
    .withMessage('Invalid booking ID format'),
  validateRequest,
];

const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),
  query('sortBy')
    .optional()
    .isIn(['bookingDate', 'createdAt', 'customerName', 'hallName'])
    .withMessage('Invalid sort field'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be either "asc" or "desc"'),
  validateRequest,
];

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Hall booking management
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Time slot already booked or other conflict
 */
router.post(
  '/',
  [
    body().custom((value, { req }) => {
      const { error } = createBookingSchema.safeParse(req.body);
      if (error) {
        throw new Error(error.errors.map(e => e.message).join(', '));
      }
      return true;
    }),
    validateRequest,
  ],
  bookingController.createBooking
);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings with pagination and filtering
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for customer name, email, or hall name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [bookingDate, createdAt, customerName, hallName]
 *           default: bookingDate
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
router.get(
  '/',
  validatePagination,
  bookingController.getBookings
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 *       400:
 *         description: Invalid ID format
 */
router.get(
  '/:id',
  validateBookingId,
  bookingController.getBooking
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBooking'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Booking not found
 *       409:
 *         description: Time slot already booked or other conflict
 */
router.put(
  '/:id',
  [
    ...validateBookingId,
    body().custom((value, { req }) => {
      const { error } = updateBookingSchema.safeParse(req.body);
      if (error) {
        throw new Error(error.errors.map(e => e.message).join(', '));
      }
      return true;
    }),
    validateRequest,
  ],
  bookingController.updateBooking
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 *       400:
 *         description: Invalid ID format
 */
router.delete(
  '/:id',
  validateBookingId,
  bookingController.deleteBooking
);

module.exports = router;
