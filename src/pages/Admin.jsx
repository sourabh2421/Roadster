import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, LogOut, RefreshCw, Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [updatingReview, setUpdatingReview] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'reviews'

  // Fetch bookings when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
      fetchReviews();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setLoginError('');
      setPassword('');
    } else {
      setLoginError('Invalid password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setBookings([]);
    setReviews([]);
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      
      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const response = await fetch('/api/reviews'); // No status filter - fetch all for admin
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.reviews || []);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    setUpdating(bookingId);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Update local state
        setBookings(bookings.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: newStatus, updatedAt: new Date() }
            : booking
        ));
      } else {
        alert('Failed to update booking status');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Network error. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  const updateReviewStatus = async (reviewId, newStatus) => {
    setUpdatingReview(reviewId);
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Update local state
        setReviews(reviews.map(review => 
          review._id === reviewId 
            ? { ...review, status: newStatus, updatedAt: new Date() }
            : review
        ));
      } else {
        alert('Failed to update review status');
      }
    } catch (error) {
      console.error('Update review error:', error);
      alert('Network error. Please try again.');
    } finally {
      setUpdatingReview(null);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-600';
      case 'confirmed':
      case 'approved':
        return 'bg-green-900/30 text-green-400 border-green-600';
      case 'cancelled':
      case 'rejected':
        return 'bg-red-900/30 text-red-400 border-red-600';
      case 'completed':
        return 'bg-blue-900/30 text-blue-400 border-blue-600';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-600';
    }
  };

  // Generate WhatsApp confirmation message for a booking
  const generateWhatsAppConfirmationLink = (booking) => {
    // Clean phone number - remove spaces, dashes, etc.
    const cleanPhone = booking.customerPhone.replace(/\D/g, '');
    
    // Prepend 91 if not already present
    const phone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    
    // Format dates in readable format
    const pickupDate = format(parseISO(booking.startDateTime), 'MMM d, yyyy, h:mm a');
    const dropoffDate = format(parseISO(booking.endDateTime), 'MMM d, yyyy, h:mm a');
    
    // Construct message
    const message = `Hi ${booking.customerName}, your booking for ${booking.carName} from ${pickupDate} to ${dropoffDate} is confirmed! Please arrive on time with a valid ID. Thanks for choosing Roadster!`;
    
    // Return WhatsApp link with pre-filled message
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const handleWhatsAppNotify = (booking) => {
    const link = generateWhatsAppConfirmationLink(booking);
    window.open(link, '_blank');
    
    // Track WhatsApp click
    if (window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        source: 'admin_panel',
        action: 'booking_confirmation',
        car_name: booking.carName,
        booking_id: booking._id,
      });
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-matte-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-lg p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-racing-red/20 rounded-full flex items-center justify-center">
                <Lock size={32} className="text-racing-red" />
              </div>
            </div>

            <h1 className="text-3xl font-heading text-white text-center mb-2">
              ADMIN <span className="text-racing-red">LOGIN</span>
            </h1>
            <p className="text-gray-400 text-center mb-8">
              Enter password to access booking management
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-racing-red rounded-lg px-4 py-3 outline-none transition-colors"
                  autoFocus
                />
              </div>

              {loginError && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-sm">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-racing-red hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
              >
                Login
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              Session-based authentication. Resets on page refresh.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-matte-black pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-heading text-white">
                ADMIN <span className="text-racing-red">DASHBOARD</span>
              </h1>
              <p className="text-gray-400 mt-1">Manage bookings and reviews</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (activeTab === 'bookings') {
                    fetchBookings();
                  } else {
                    fetchReviews();
                  }
                }}
                disabled={loading || loadingReviews}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
              >
                <RefreshCw size={18} className={(loading || loadingReviews) ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-racing-red hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'bookings'
                  ? 'bg-racing-red text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'reviews'
                  ? 'bg-racing-red text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'bookings' ? (
          <>
            {/* Booking Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6">
                <div className="text-gray-400 text-sm mb-1">Total Bookings</div>
                <div className="text-3xl font-heading text-white">{bookings.length}</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-600/30 rounded-lg p-6">
                <div className="text-gray-400 text-sm mb-1">Pending</div>
                <div className="text-3xl font-heading text-yellow-400">
                  {bookings.filter(b => b.status === 'pending').length}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-900/20 to-black border border-green-600/30 rounded-lg p-6">
                <div className="text-gray-400 text-sm mb-1">Confirmed</div>
                <div className="text-3xl font-heading text-green-400">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-600/30 rounded-lg p-6">
                <div className="text-gray-400 text-sm mb-1">Completed</div>
                <div className="text-3xl font-heading text-blue-400">
                  {bookings.filter(b => b.status === 'completed').length}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Review Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6">
                <div className="text-gray-400 text-sm mb-1">Total Reviews</div>
                <div className="text-3xl font-heading text-white">{reviews.length}</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-600/30 rounded-lg p-6">
                <div className="text-gray-400 text-sm mb-1">Pending</div>
                <div className="text-3xl font-heading text-yellow-400">
                  {reviews.filter(r => r.status === 'pending').length}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-900/20 to-black border border-green-600/30 rounded-lg p-6">
                <div className="text-gray-400 text-sm mb-1">Approved</div>
                <div className="text-3xl font-heading text-green-400">
                  {reviews.filter(r => r.status === 'approved').length}
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-600/30 rounded-lg p-6">
                <div className="text-gray-400 text-sm mb-1">Rejected</div>
                <div className="text-3xl font-heading text-red-400">
                  {reviews.filter(r => r.status === 'rejected').length}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Bookings Table */}
        {activeTab === 'bookings' && (
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-12 text-gray-400">
                  Loading bookings...
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No bookings found
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-black/50 border-b border-gray-800">
                    <tr>
                      <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Car</th>
                      <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Customer</th>
                      <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Phone</th>
                      <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Pick-up</th>
                      <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Drop-off</th>
                      <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Duration</th>
                      <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Status</th>
                      <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr
                        key={booking._id}
                        className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="text-white font-medium">{booking.carName}</div>
                          <div className="text-xs text-gray-500">{booking.carId}</div>
                        </td>
                        <td className="py-4 px-6 text-white">{booking.customerName}</td>
                        <td className="py-4 px-6">
                          <a
                            href={`tel:+91${booking.customerPhone}`}
                            className="text-racing-red hover:underline"
                          >
                            {booking.customerPhone}
                          </a>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-white text-sm">
                            {format(parseISO(booking.startDateTime), 'MMM d, yyyy')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {format(parseISO(booking.startDateTime), 'h:mm a')}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-white text-sm">
                            {format(parseISO(booking.endDateTime), 'MMM d, yyyy')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {format(parseISO(booking.endDateTime), 'h:mm a')}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-white font-medium">{booking.durationType}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                            {booking.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-2">
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                                  disabled={updating === booking._id}
                                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {updating === booking._id ? '...' : 'Confirm'}
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                                  disabled={updating === booking._id}
                                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {updating === booking._id ? '...' : 'Cancel'}
                                </button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <>
                                <button
                                  onClick={() => handleWhatsAppNotify(booking)}
                                  className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold transition-all"
                                >
                                  <FaWhatsapp size={14} />
                                  <span>Notify</span>
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(booking._id, 'completed')}
                                  disabled={updating === booking._id}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {updating === booking._id ? '...' : 'Complete'}
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                                  disabled={updating === booking._id}
                                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {updating === booking._id ? '...' : 'Cancel'}
                                </button>
                              </>
                            )}
                            {(booking.status === 'cancelled' || booking.status === 'completed') && (
                              <span className="text-gray-500 text-xs">No actions</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Pending Reviews Section */}
            {reviews.filter(r => r.status === 'pending').length > 0 && (
              <div>
                <div className="mb-4">
                  <h3 className="text-2xl font-heading text-white">
                    PENDING <span className="text-racing-red">REVIEWS</span>
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {reviews.filter(r => r.status === 'pending').length} review(s) awaiting moderation
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-600/30 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-black/50 border-b border-yellow-600/30">
                        <tr>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Customer</th>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Rating</th>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Review</th>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Date</th>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews
                          .filter(r => r.status === 'pending')
                          .map((review) => (
                            <tr
                              key={review._id}
                              className="border-b border-yellow-600/20 hover:bg-yellow-900/10 transition-colors"
                            >
                              <td className="py-4 px-6 text-white font-medium">
                                {review.customerName}
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex gap-1">
                                  {renderStars(review.rating)}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <p className="text-white text-sm max-w-md">
                                  {review.reviewText}
                                </p>
                              </td>
                              <td className="py-4 px-6">
                                <div className="text-white text-sm">
                                  {format(parseISO(review.createdAt), 'MMM d, yyyy')}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {format(parseISO(review.createdAt), 'h:mm a')}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => updateReviewStatus(review._id, 'approved')}
                                    disabled={updatingReview === review._id}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {updatingReview === review._id ? '...' : 'Approve'}
                                  </button>
                                  <button
                                    onClick={() => updateReviewStatus(review._id, 'rejected')}
                                    disabled={updatingReview === review._id}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {updatingReview === review._id ? '...' : 'Reject'}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* No Pending Reviews Message */}
            {reviews.filter(r => r.status === 'pending').length === 0 && (
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-12 text-center">
                <p className="text-gray-400 text-lg">No pending reviews to moderate</p>
              </div>
            )}

            {/* Approved Reviews Section */}
            {reviews.filter(r => r.status === 'approved').length > 0 && (
              <div>
                <div className="mb-4">
                  <h3 className="text-2xl font-heading text-white">
                    APPROVED <span className="text-racing-red">REVIEWS</span>
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {reviews.filter(r => r.status === 'approved').length} review(s) live on the website
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-black/50 border-b border-gray-800">
                        <tr>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Customer</th>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Rating</th>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Review</th>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Date</th>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews
                          .filter(r => r.status === 'approved')
                          .map((review) => (
                            <tr
                              key={review._id}
                              className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                            >
                              <td className="py-4 px-6 text-white font-medium">
                                {review.customerName}
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex gap-1">
                                  {renderStars(review.rating)}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <p className="text-white text-sm max-w-md">
                                  {review.reviewText}
                                </p>
                              </td>
                              <td className="py-4 px-6">
                                <div className="text-white text-sm">
                                  {format(parseISO(review.createdAt), 'MMM d, yyyy')}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {format(parseISO(review.createdAt), 'h:mm a')}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border bg-green-900/30 text-green-400 border-green-600">
                                  LIVE ON SITE
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Rejected Reviews Section (Optional - for reference) */}
            {reviews.filter(r => r.status === 'rejected').length > 0 && (
              <div>
                <div className="mb-4">
                  <h3 className="text-2xl font-heading text-white">
                    REJECTED <span className="text-racing-red">REVIEWS</span>
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {reviews.filter(r => r.status === 'rejected').length} review(s) rejected
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-black/50 border-b border-gray-800">
                        <tr>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Customer</th>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Rating</th>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Review</th>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Date</th>
                          <th className="text-left text-gray-400 font-semibold py-4 px-6 text-sm">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews
                          .filter(r => r.status === 'rejected')
                          .map((review) => (
                            <tr
                              key={review._id}
                              className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors opacity-60"
                            >
                              <td className="py-4 px-6 text-white font-medium">
                                {review.customerName}
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex gap-1">
                                  {renderStars(review.rating)}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <p className="text-white text-sm max-w-md">
                                  {review.reviewText}
                                </p>
                              </td>
                              <td className="py-4 px-6">
                                <div className="text-white text-sm">
                                  {format(parseISO(review.createdAt), 'MMM d, yyyy')}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {format(parseISO(review.createdAt), 'h:mm a')}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border bg-red-900/30 text-red-400 border-red-600">
                                  REJECTED
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
