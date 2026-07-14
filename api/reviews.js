import { getReviewsCollection } from '../lib/mongodb.js';

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

  // GET /api/reviews - List reviews (with optional status filter)
  if (req.method === 'GET') {
    try {
      const { status } = req.query;
      const reviews = await getReviewsCollection();
      
      let query = {};
      
      // If status is provided and not "all", filter by status
      if (status && status !== 'all') {
        query.status = status;
      }
      
      const allReviews = await reviews
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();

      return res.status(200).json({
        success: true,
        count: allReviews.length,
        reviews: allReviews
      });

    } catch (error) {
      console.error('Fetch reviews error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch reviews',
        message: error.message 
      });
    }
  }

  // POST /api/reviews - Create new review
  if (req.method === 'POST') {
    try {
      const { customerName, rating, reviewText } = req.body;

      // Validate required fields
      if (!customerName || !rating || !reviewText) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          required: ['customerName', 'rating', 'reviewText']
        });
      }

      // Validate customerName not empty
      if (customerName.trim().length === 0) {
        return res.status(400).json({ 
          error: 'Customer name cannot be empty'
        });
      }

      // Validate rating is integer 1-5
      const ratingNum = parseInt(rating);
      if (isNaN(ratingNum) || !Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({ 
          error: 'Rating must be an integer between 1 and 5'
        });
      }

      // Validate reviewText not empty and under 500 characters
      const trimmedReview = reviewText.trim();
      if (trimmedReview.length === 0) {
        return res.status(400).json({ 
          error: 'Review text cannot be empty'
        });
      }

      if (trimmedReview.length > 500) {
        return res.status(400).json({ 
          error: 'Review text must be under 500 characters',
          currentLength: trimmedReview.length
        });
      }

      // Get reviews collection
      const reviews = await getReviewsCollection();

      // Create review document
      // IMPORTANT: Always set status to "pending", ignore any client-provided status
      const newReview = {
        customerName: customerName.trim(),
        rating: ratingNum,
        reviewText: trimmedReview,
        status: 'pending',
        createdAt: new Date()
      };

      // Insert review
      const result = await reviews.insertOne(newReview);

      // Return created review
      return res.status(201).json({
        success: true,
        message: 'Review submitted successfully',
        review: {
          _id: result.insertedId,
          ...newReview
        }
      });

    } catch (error) {
      console.error('Create review error:', error);
      return res.status(500).json({ 
        error: 'Failed to create review',
        message: error.message 
      });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
