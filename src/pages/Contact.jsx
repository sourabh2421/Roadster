import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt, FaInstagram, FaStar } from 'react-icons/fa';
import { MapPin, Clock, Mail } from 'lucide-react';

const Contact = () => {
  const [reviewForm, setReviewForm] = useState({
    customerName: '',
    rating: 0,
    reviewText: '',
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const contactMethods = [
    {
      icon: <FaWhatsapp className="w-12 h-12" />,
      title: 'WhatsApp',
      description: 'Fastest way to reach us',
      action: 'Message Us',
      link: 'https://wa.me/919540771001?text=Hi%2C%20I%27m%20interested%20in%20renting%20a%20car',
      color: 'bg-green-600 hover:bg-green-700',
      eventType: 'whatsapp_click',
      eventParams: { source: 'contact_page', action: 'contact_card' },
    },
    {
      icon: <FaPhoneAlt className="w-12 h-12" />,
      title: 'Phone Call',
      description: '9540771001 / 8470004900',
      action: 'Call Now',
      link: 'tel:+919540771001',
      color: 'bg-racing-red hover:bg-red-700',
      eventType: 'phone_click',
      eventParams: { source: 'contact_page', action: 'contact_card' },
    },
    {
      icon: <FaInstagram className="w-12 h-12" />,
      title: 'Instagram',
      description: '@r0adster_drive',
      action: 'Follow Us',
      link: 'https://instagram.com/r0adster_drive',
      color: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      eventType: 'instagram_click',
      eventParams: { source: 'contact_page', action: 'contact_card' },
    },
  ];

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    // Validation
    if (!reviewForm.customerName.trim()) {
      setSubmitError('Please enter your name');
      return;
    }
    if (reviewForm.rating === 0) {
      setSubmitError('Please select a rating');
      return;
    }
    if (!reviewForm.reviewText.trim()) {
      setSubmitError('Please write a review');
      return;
    }
    if (reviewForm.reviewText.length > 500) {
      setSubmitError('Review must be under 500 characters');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: reviewForm.customerName.trim(),
          rating: reviewForm.rating,
          reviewText: reviewForm.reviewText.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        // Clear form
        setReviewForm({
          customerName: '',
          rating: 0,
          reviewText: '',
        });
        // Scroll to success message
        setTimeout(() => {
          document.getElementById('review-success')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        setSubmitError(data.message || data.error || 'Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Review submission error:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStarSelector = () => {
    return (
      <div className="flex gap-2 justify-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
            className="transition-all duration-200 hover:scale-110 focus:outline-none"
          >
            <FaStar
              size={36}
              className={
                star <= (hoveredRating || reviewForm.rating)
                  ? 'text-racing-red'
                  : 'text-gray-600'
              }
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-matte-black via-black to-matte-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-1 h-full bg-racing-red transform -skew-x-12" />
          <div className="absolute top-0 right-1/4 w-1 h-full bg-racing-red transform -skew-x-12" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-heading text-white mb-4">
              GET IN <span className="text-racing-red">TOUCH</span>
            </h1>
            <div className="w-24 h-1 bg-racing-red mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We're available 24/7 to answer your questions and help you book your perfect ride
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20 bg-matte-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">
              REACH <span className="text-racing-red">US</span>
            </h2>
            <div className="w-24 h-1 bg-racing-red mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Choose your preferred way to connect</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border-2 border-racing-red/30 hover:border-racing-red transition-all duration-300 text-center"
              >
                <div className="text-racing-red mb-6 flex justify-center">{method.icon}</div>
                <h3 className="text-2xl font-heading text-white mb-2">{method.title}</h3>
                <p className="text-gray-400 mb-6">{method.description}</p>
                <a
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={() => {
                    if (window.gtag) {
                      window.gtag('event', method.eventType, method.eventParams);
                    }
                  }}
                  className={`inline-block ${method.color} text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl`}
                >
                  {method.action}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-racing-red/30"
            >
              <div className="flex items-start gap-4">
                <MapPin className="text-racing-red flex-shrink-0 mt-1" size={32} />
                <div>
                  <h3 className="text-2xl font-heading text-white mb-3">Our Location</h3>
                  <p className="text-gray-400 mb-4">
                    13th St, Sector Alpha II<br />
                    Brahmpur Rajraula Urf Nawada<br />
                    Uttar Pradesh 201310
                  </p>
                  <a
                    href="https://maps.google.com/?q=13th+St,+Sector+Alpha+II,+Brahmpur+Rajraula+Urf+Nawada,+UP+201310"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-racing-red hover:text-red-400 font-semibold transition-colors"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-racing-red/30"
            >
              <div className="flex items-start gap-4">
                <Clock className="text-racing-red flex-shrink-0 mt-1" size={32} />
                <div>
                  <h3 className="text-2xl font-heading text-white mb-3">Availability</h3>
                  <p className="text-gray-400 mb-2">
                    <span className="text-racing-red font-semibold">24/7 Service</span>
                  </p>
                  <p className="text-gray-400 mb-4">
                    We're always open! Book anytime, day or night. Our team is ready to assist you round the clock.
                  </p>
                  <div className="text-sm text-gray-500">
                    Average response time: Under 5 minutes
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">
              FIND <span className="text-racing-red">US</span>
            </h2>
            <div className="w-24 h-1 bg-racing-red mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Visit us at our location in Brahmpur, Greater Noida</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden border-2 border-racing-red/30 shadow-2xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.6745567890123!2d77.50!3d28.50!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzAwLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-br from-matte-black to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-heading text-white mb-8">
              STILL HAVE <span className="text-racing-red">QUESTIONS?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              We're here to help! Reach out via your preferred channel and we'll get back to you instantly.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://wa.me/919540771001?text=Hi%2C%20I%20have%20a%20question"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.gtag) {
                    window.gtag('event', 'whatsapp_click', {
                      source: 'contact_page',
                      action: 'questions_cta',
                    });
                  }
                }}
                className="flex items-center justify-center gap-3 bg-racing-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <FaWhatsapp className="text-2xl" />
                <span>WhatsApp Us</span>
              </a>
              
              <a
                href="tel:+919540771001"
                onClick={() => {
                  if (window.gtag) {
                    window.gtag('event', 'phone_click', {
                      source: 'contact_page',
                      action: 'questions_cta',
                    });
                  }
                }}
                className="flex items-center justify-center gap-3 bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <FaPhoneAlt className="text-xl" />
                <span>Call: 9540771001</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-12 bg-black border-t border-racing-red/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-gray-400"
          >
            <p className="mb-2">Alternative Phone Number</p>
            <a
              href="tel:+918470004900"
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'phone_click', {
                    source: 'contact_page',
                    action: 'alternative_number',
                    phone_number: '8470004900',
                  });
                }
              }}
              className="text-2xl font-heading text-racing-red hover:text-red-400 transition-colors"
            >
              8470004900
            </a>
          </motion.div>
        </div>
      </section>

      {/* Leave a Review Section */}
      <section className="py-20 bg-gradient-to-br from-matte-black via-black to-matte-black border-t-2 border-racing-red/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">
              LEAVE A <span className="text-racing-red">REVIEW</span>
            </h2>
            <div className="w-24 h-1 bg-racing-red mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              Share your experience with Roadster and help others make their choice
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-lg border-2 border-racing-red/30 shadow-2xl"
          >
            {submitSuccess ? (
              <div id="review-success" className="text-center py-12">
                <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaStar className="text-green-400" size={40} />
                </div>
                <h3 className="text-3xl font-heading text-white mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-400 text-lg mb-6">
                  Your review has been submitted successfully. It'll appear on our site after a quick check.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-racing-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
                >
                  Leave Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-8">
                {/* Name Input */}
                <div>
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reviewForm.customerName}
                    onChange={(e) => setReviewForm({ ...reviewForm, customerName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-racing-red rounded-lg px-4 py-3 outline-none transition-colors text-lg"
                    disabled={submitting}
                  />
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-white font-semibold mb-3 text-lg text-center">
                    Rate Your Experience
                  </label>
                  {renderStarSelector()}
                  <p className="text-center text-sm text-gray-400 mt-2">
                    {reviewForm.rating === 0 && 'Click to rate'}
                    {reviewForm.rating === 1 && 'Poor'}
                    {reviewForm.rating === 2 && 'Fair'}
                    {reviewForm.rating === 3 && 'Good'}
                    {reviewForm.rating === 4 && 'Very Good'}
                    {reviewForm.rating === 5 && 'Excellent'}
                  </p>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Your Review
                  </label>
                  <textarea
                    value={reviewForm.reviewText}
                    onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                    placeholder="Tell us about your experience with Roadster..."
                    rows={5}
                    maxLength={500}
                    className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-racing-red rounded-lg px-4 py-3 outline-none transition-colors text-lg resize-none"
                    disabled={submitting}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-500">
                      Share what you loved about our service
                    </p>
                    <p className={`text-sm font-semibold ${
                      reviewForm.reviewText.length > 450 ? 'text-racing-red' : 'text-gray-400'
                    }`}>
                      {reviewForm.reviewText.length}/500
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-400 text-center">
                    {submitError}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-racing-red hover:bg-red-700 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
