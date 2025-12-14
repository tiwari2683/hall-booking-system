const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');
const { format } = require('date-fns');

const prisma = new PrismaClient();

/**
 * Check for overlapping bookings for a hall on a specific date and time
 * @param {string} hallName - Name of the hall
 * @param {Date} bookingDate - Date of the booking
 * @param {string} startTime - Start time in HH:MM format
 * @param {string} endTime - End time in HH:MM format
 * @param {string} [excludeBookingId] - Optional booking ID to exclude (for updates)
 * @returns {Promise<boolean>} - True if there's an overlap, false otherwise
 */
async function hasOverlappingBooking(hallName, bookingDate, startTime, endTime, excludeBookingId = null) {
  const startDateTime = new Date(bookingDate);
  const [startHour, startMinute] = startTime.split(':').map(Number);
  startDateTime.setHours(startHour, startMinute, 0, 0);

  const endDateTime = new Date(bookingDate);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  endDateTime.setHours(endHour, endMinute, 0, 0);

  // Format the date to match the database format (YYYY-MM-DD)
  const formattedDate = format(bookingDate, 'yyyy-MM-dd');

  // Find any existing bookings for the same hall and date that overlap with the requested time
  const overlappingBookings = await prisma.$queryRaw`
    SELECT id FROM "Booking"
    WHERE "hallName" = ${hallName}
      AND "bookingDate"::date = ${formattedDate}::date
      AND (
        ("startTime" <= ${startTime} AND "endTime" > ${startTime}) OR
        ("startTime" < ${endTime} AND "endTime" >= ${endTime}) OR
        ("startTime" >= ${startTime} AND "endTime" <= ${endTime})
      )
      ${excludeBookingId ? Prisma.sql`AND id != ${excludeBookingId}` : Prisma.empty}
    LIMIT 1
  `;

  return overlappingBookings.length > 0;
}

/**
 * Create a new booking
 * @param {Object} bookingData - Booking data
 * @returns {Promise<Object>} - Created booking
 */
async function createBooking(bookingData) {
  const {
    hallName, customerName, email, phone, bookingDate, startTime, endTime,
  } = bookingData;

  // Check for overlapping bookings
  const isOverlapping = await hasOverlappingBooking(hallName, bookingDate, startTime, endTime);
  
  if (isOverlapping) {
    const error = new Error('The selected time slot is already booked for this hall');
    error.statusCode = 409;
    throw error;
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        hallName,
        customerName,
        email,
        phone,
        bookingDate,
        startTime,
        endTime,
      },
    });

    return booking;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Handle specific Prisma errors if needed
      if (error.code === 'P2002') {
        error.statusCode = 409;
        error.message = 'A booking with these details already exists';
      }
    }
    throw error;
  }
}

/**
 * Get all bookings with optional filtering and pagination
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - List of bookings
 */
async function getBookings({ page = 1, limit = 10, search = '', sortBy = 'bookingDate', sortOrder = 'asc' } = {}) {
  const skip = (page - 1) * limit;
  const take = parseInt(limit, 10);
  
  // Build the where clause for search
  const where = {};
  if (search) {
    where.OR = [
      { customerName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { hallName: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take,
    }),
    prisma.booking.count({ where }),
  ]);

  return {
    data: bookings,
    meta: {
      total,
      page,
      limit: take,
      totalPages: Math.ceil(total / take),
    },
  };
}

/**
 * Get a booking by ID
 * @param {string} id - Booking ID
 * @returns {Promise<Object>} - Booking details
 */
async function getBookingById(id) {
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    const error = new Error('Booking not found');
    error.statusCode = 404;
    throw error;
  }

  return booking;
}

/**
 * Update a booking
 * @param {string} id - Booking ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} - Updated booking
 */
async function updateBooking(id, updateData) {
  // Check if booking exists
  const existingBooking = await getBookingById(id);
  
  const {
    hallName = existingBooking.hallName,
    bookingDate = existingBooking.bookingDate,
    startTime = existingBooking.startTime,
    endTime = existingBooking.endTime,
    ...restData
  } = updateData;

  // Check for overlapping bookings, excluding the current booking
  const isOverlapping = await hasOverlappingBooking(
    hallName,
    bookingDate,
    startTime,
    endTime,
    id // Exclude current booking from overlap check
  );
  
  if (isOverlapping) {
    const error = new Error('The selected time slot is already booked for this hall');
    error.statusCode = 409;
    throw error;
  }

  try {
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        hallName,
        bookingDate,
        startTime,
        endTime,
        ...restData,
      },
    });

    return updatedBooking;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        error.statusCode = 404;
        error.message = 'Booking not found';
      }
    }
    throw error;
  }
}

/**
 * Delete a booking
 * @param {string} id - Booking ID
 * @returns {Promise<Object>} - Deleted booking
 */
async function deleteBooking(id) {
  // Check if booking exists
  await getBookingById(id);

  try {
    const deletedBooking = await prisma.booking.delete({
      where: { id },
    });
    return deletedBooking;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        error.statusCode = 404;
        error.message = 'Booking not found';
      }
    }
    throw error;
  }
}

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
