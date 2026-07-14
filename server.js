import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import availabilityHandler from './api/availability.js';
import bookingsHandler from './api/bookings.js';
import bookingByIdHandler from './api/bookings/[id].js';
import reviewsHandler from './api/reviews.js';
import reviewByIdHandler from './api/reviews/[id].js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Vercel-style request/response wrapper
function wrapHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('Handler error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error', message: error.message });
      }
    }
  };
}

// API Routes
app.get('/api/availability', wrapHandler(availabilityHandler));
app.get('/api/bookings', wrapHandler(bookingsHandler));
app.post('/api/bookings', wrapHandler(bookingsHandler));
app.get('/api/bookings/:id', wrapHandler(async (req, res) => {
  // Vercel-style query parameter simulation
  const modifiedReq = { ...req, query: { ...req.query, id: req.params.id } };
  return bookingByIdHandler(modifiedReq, res);
}));
app.patch('/api/bookings/:id', wrapHandler(async (req, res) => {
  // Vercel-style query parameter simulation
  const modifiedReq = { ...req, query: { ...req.query, id: req.params.id } };
  return bookingByIdHandler(modifiedReq, res);
}));

// Reviews Routes
app.get('/api/reviews', wrapHandler(reviewsHandler));
app.post('/api/reviews', wrapHandler(reviewsHandler));
app.get('/api/reviews/:id', wrapHandler(async (req, res) => {
  const modifiedReq = { ...req, query: { ...req.query, id: req.params.id } };
  return reviewByIdHandler(modifiedReq, res);
}));
app.patch('/api/reviews/:id', wrapHandler(async (req, res) => {
  const modifiedReq = { ...req, query: { ...req.query, id: req.params.id } };
  return reviewByIdHandler(modifiedReq, res);
}));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Roadster API Server running on http://localhost:${PORT}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/availability?carId=X`);
  console.log(`   POST http://localhost:${PORT}/api/bookings`);
  console.log(`   GET  http://localhost:${PORT}/api/bookings`);
  console.log(`   GET  http://localhost:${PORT}/api/bookings/:id`);
  console.log(`   PATCH http://localhost:${PORT}/api/bookings/:id`);
  console.log(`\n✅ Ready for testing!\n`);
});
