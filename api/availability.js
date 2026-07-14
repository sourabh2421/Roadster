import { getBookingsCollection } from '../lib/mongodb.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { carId } = req.query;

    // Validate carId parameter
    if (!carId) {
      return res.status(400).json({ 
        error: 'Missing required parameter: carId' 
      });
    }

    // Get bookings collection
    const bookings = await getBookingsCollection();

    // Find all confirmed/pending bookings for this car
    const existingBookings = await bookings
      .find({
        carId: carId,
        status: { $in: ['pending', 'confirmed'] }
      })
      .project({
        _id: 1,
        startDateTime: 1,
        endDateTime: 1,
        status: 1
      })
      .sort({ startDateTime: 1 })
      .toArray();

    return res.status(200).json({
      success: true,
      carId,
      bookings: existingBookings
    });

  } catch (error) {
    console.error('Availability check error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch availability',
      message: error.message 
    });
  }
}
