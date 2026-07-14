import { getBookingsCollection } from '../lib/mongodb.js';

// Helper function to check for booking overlaps
function checkOverlap(existingBookings, newStart, newEnd) {
  return existingBookings.some(booking => {
    const existingStart = new Date(booking.startDateTime);
    const existingEnd = new Date(booking.endDateTime);
    
    // Check if there's any overlap
    // Overlap exists if: new booking starts before existing ends AND new booking ends after existing starts
    return newStart < existingEnd && newEnd > existingStart;
  });
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET /api/bookings - List all bookings
  if (req.method === 'GET') {
    try {
      const bookings = await getBookingsCollection();
      
      const allBookings = await bookings
        .find({})
        .sort({ startDateTime: -1 })
        .toArray();

      return res.status(200).json({
        success: true,
        count: allBookings.length,
        bookings: allBookings
      });

    } catch (error) {
      console.error('Fetch bookings error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch bookings',
        message: error.message 
      });
    }
  }

  // POST /api/bookings - Create new booking
  if (req.method === 'POST') {
    try {
      const { 
        carId, 
        carName, 
        customerName, 
        customerPhone, 
        startDateTime, 
        endDateTime, 
        durationType 
      } = req.body;

      // Validate required fields
      if (!carId || !carName || !customerName || !customerPhone || !startDateTime || !endDateTime || !durationType) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          required: ['carId', 'carName', 'customerName', 'customerPhone', 'startDateTime', 'endDateTime', 'durationType']
        });
      }

      // Validate phone number format (basic validation)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(customerPhone.replace(/[^0-9]/g, ''))) {
        return res.status(400).json({ 
          error: 'Invalid phone number format. Must be a valid 10-digit Indian mobile number.'
        });
      }

      // Validate durationType
      if (!['12hr', '24hr'].includes(durationType)) {
        return res.status(400).json({ 
          error: 'Invalid durationType. Must be "12hr" or "24hr"'
        });
      }

      // Convert to Date objects
      const newStartDate = new Date(startDateTime);
      const newEndDate = new Date(endDateTime);

      // Validate dates
      if (isNaN(newStartDate.getTime()) || isNaN(newEndDate.getTime())) {
        return res.status(400).json({ 
          error: 'Invalid date format'
        });
      }

      // Validate end date is after start date
      if (newEndDate <= newStartDate) {
        return res.status(400).json({ 
          error: 'End date/time must be after start date/time'
        });
      }

      // Validate start date is not in the past
      const now = new Date();
      if (newStartDate < now) {
        return res.status(400).json({ 
          error: 'Start date/time cannot be in the past'
        });
      }

      // Get bookings collection
      const bookings = await getBookingsCollection();

      // CRITICAL: Server-side overlap check
      // Find all pending/confirmed bookings for this car
      const existingBookings = await bookings
        .find({
          carId: carId,
          status: { $in: ['pending', 'confirmed'] }
        })
        .toArray();

      // Check for overlaps
      const hasOverlap = checkOverlap(existingBookings, newStartDate, newEndDate);

      if (hasOverlap) {
        return res.status(409).json({ 
          error: 'Booking conflict',
          message: 'This car is already booked for the selected time slot. Please choose a different time or vehicle.'
        });
      }

      // Create booking document
      const newBooking = {
        carId,
        carName,
        customerName,
        customerPhone,
        startDateTime: newStartDate,
        endDateTime: newEndDate,
        durationType,
        status: 'pending',
        createdAt: new Date()
      };

      // Insert booking
      const result = await bookings.insertOne(newBooking);

      // Return created booking
      return res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        booking: {
          _id: result.insertedId,
          ...newBooking
        }
      });

    } catch (error) {
      console.error('Create booking error:', error);
      return res.status(500).json({ 
        error: 'Failed to create booking',
        message: error.message 
      });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
