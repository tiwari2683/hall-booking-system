const bookingService = require('../services/booking.service');

/**
 * Create a new booking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
async function createBooking(req, res, next) {
  try {
    const bookingData = req.body;
    const newBooking = await bookingService.createBooking(bookingData);
    
    res.status(201).json({
      success: true,
      data: newBooking,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get all bookings with optional filtering and pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
async function getBookings(req, res, next) {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'bookingDate', sortOrder = 'asc' } = req.query;
    
    const result = await bookingService.getBookings({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      search,
      sortBy,
      sortOrder,
    });
    
    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get a single booking by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
async function getBooking(req, res, next) {
  try {
    const { id } = req.params;
    const booking = await bookingService.getBookingById(id);
    
    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update a booking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
async function updateBooking(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedBooking = await bookingService.updateBooking(id, updateData);
    
    res.status(200).json({
      success: true,
      data: updatedBooking,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a booking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
async function deleteBooking(req, res, next) {
  try {
    const { id } = req.params;
    await bookingService.deleteBooking(id);
    
    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
};
