import { getBookingsCollection } from '../../lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Extract booking ID from query
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing booking ID' });
  }

  // Validate ObjectId format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid booking ID format' });
  }

  // PATCH /api/bookings/[id] - Update booking status
  if (req.method === 'PATCH') {
    try {
      const { status } = req.body;

      // Validate status field
      if (!status) {
        return res.status(400).json({ 
          error: 'Missing required field: status' 
        });
      }

      // Validate status value
      const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          error: 'Invalid status',
          message: `Status must be one of: ${validStatuses.join(', ')}`
        });
      }

      // Get bookings collection
      const bookings = await getBookingsCollection();

      // Check if booking exists
      const existingBooking = await bookings.findOne({ 
        _id: new ObjectId(id) 
      });

      if (!existingBooking) {
        return res.status(404).json({ 
          error: 'Booking not found' 
        });
      }

      // Update booking status
      const result = await bookings.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            status,
            updatedAt: new Date()
          } 
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ 
          error: 'Booking not found' 
        });
      }

      // Fetch updated booking
      const updatedBooking = await bookings.findOne({ 
        _id: new ObjectId(id) 
      });

      return res.status(200).json({
        success: true,
        message: 'Booking status updated successfully',
        booking: updatedBooking
      });

    } catch (error) {
      console.error('Update booking error:', error);
      return res.status(500).json({ 
        error: 'Failed to update booking',
        message: error.message 
      });
    }
  }

  // GET /api/bookings/[id] - Get single booking
  if (req.method === 'GET') {
    try {
      const bookings = await getBookingsCollection();
      
      const booking = await bookings.findOne({ 
        _id: new ObjectId(id) 
      });

      if (!booking) {
        return res.status(404).json({ 
          error: 'Booking not found' 
        });
      }

      return res.status(200).json({
        success: true,
        booking
      });

    } catch (error) {
      console.error('Fetch booking error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch booking',
        message: error.message 
      });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
