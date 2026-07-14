import { getReviewsCollection } from '../../lib/mongodb.js';
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

  // Extract review ID from query
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing review ID' });
  }

  // Validate ObjectId format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid review ID format' });
  }

  // PATCH /api/reviews/[id] - Update review status
  if (req.method === 'PATCH') {
    try {
      const { status } = req.body;

      // Validate status field
      if (!status) {
        return res.status(400).json({ 
          error: 'Missing required field: status' 
        });
      }

      // Validate status value - ONLY "approved" or "rejected" allowed
      if (status !== 'approved' && status !== 'rejected') {
        return res.status(400).json({ 
          error: 'Invalid status',
          message: 'Status must be either "approved" or "rejected"'
        });
      }

      // Get reviews collection
      const reviews = await getReviewsCollection();

      // Check if review exists
      const existingReview = await reviews.findOne({ 
        _id: new ObjectId(id) 
      });

      if (!existingReview) {
        return res.status(404).json({ 
          error: 'Review not found' 
        });
      }

      // Update review status
      const result = await reviews.updateOne(
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
          error: 'Review not found' 
        });
      }

      // Fetch updated review
      const updatedReview = await reviews.findOne({ 
        _id: new ObjectId(id) 
      });

      return res.status(200).json({
        success: true,
        message: 'Review status updated successfully',
        review: updatedReview
      });

    } catch (error) {
      console.error('Update review error:', error);
      return res.status(500).json({ 
        error: 'Failed to update review',
        message: error.message 
      });
    }
  }

  // GET /api/reviews/[id] - Get single review
  if (req.method === 'GET') {
    try {
      const reviews = await getReviewsCollection();
      
      const review = await reviews.findOne({ 
        _id: new ObjectId(id) 
      });

      if (!review) {
        return res.status(404).json({ 
          error: 'Review not found' 
        });
      }

      return res.status(200).json({
        success: true,
        review
      });

    } catch (error) {
      console.error('Fetch review error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch review',
        message: error.message 
      });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
