const { z } = require('zod');

// Helper function to validate time format (HH:MM)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Helper to validate date is today or in the future
const isFutureDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

// Base booking schema
const baseBookingSchema = z.object({
  hallName: z.string()
    .min(2, 'Hall name must be at least 2 characters')
    .max(100, 'Hall name cannot exceed 100 characters')
    .trim(),
  customerName: z.string()
    .min(2, 'Customer name must be at least 2 characters')
    .max(100, 'Customer name cannot exceed 100 characters')
    .trim(),
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email cannot exceed 100 characters')
    .trim()
    .toLowerCase(),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number cannot exceed 20 digits')
    .regex(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number'),
  bookingDate: z.string()
    .refine(val => !isNaN(Date.parse(val)), {
      message: 'Please enter a valid date',
    })
    .transform(val => new Date(val))
    .refine(isFutureDate, {
      message: 'Booking date must be today or in the future',
    }),
  startTime: z.string()
    .regex(timeRegex, 'Start time must be in HH:MM format')
    .refine(time => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
    }, 'Please enter a valid time'),
  endTime: z.string()
    .regex(timeRegex, 'End time must be in HH:MM format')
    .refine(time => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
    }, 'Please enter a valid time'),
}).refine(
  (data) => {
    const [startHours, startMinutes] = data.startTime.split(':').map(Number);
    const [endHours, endMinutes] = data.endTime.split(':').map(Number);
    
    if (startHours > endHours) return false;
    if (startHours === endHours && startMinutes >= endMinutes) return false;
    
    return true;
  },
  {
    message: 'End time must be after start time',
    path: ['endTime'],
  }
);

// Schema for creating a new booking
exports.createBookingSchema = baseBookingSchema;

// Schema for updating a booking
exports.updateBookingSchema = baseBookingSchema.partial();

// Schema for validating booking ID
exports.bookingIdSchema = z.object({
  id: z.string().uuid('Invalid booking ID format'),
});
