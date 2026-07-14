import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingModal.css';
import { X, Calendar, Clock, User, Phone, ArrowLeft, Check } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { addHours, format, parseISO } from 'date-fns';

const BookingModal = ({ isOpen, onClose, car }) => {
  const [step, setStep] = useState('datetime'); // 'datetime' | 'details' | 'confirmation'
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [duration, setDuration] = useState('12hr');
  
  // Step 2 fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Step 3 data
  const [bookingData, setBookingData] = useState(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen && car) {
      fetchAvailability();
      setStep('datetime');
      setSelectedDate(null);
      setSelectedTime('10:00');
      setDuration('12hr');
      setCustomerName('');
      setCustomerPhone('');
      setError('');
      setBookingData(null);
    }
  }, [isOpen, car]);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/availability?carId=${car.id}`);
      const data = await response.json();
      
      if (data.success) {
        setBookedSlots(data.bookings || []);
      }
    } catch (error) {
      console.error('Failed to fetch availability:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if a date is fully booked
  const isDateDisabled = (date) => {
    if (!date) return false;
    
    // Don't allow past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    return false;
  };

  // Calculate end date/time based on start and duration
  const calculateEndDateTime = () => {
    if (!selectedDate || !selectedTime) return null;
    
    const [hours, minutes] = selectedTime.split(':');
    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const durationHours = duration === '12hr' ? 12 : 24;
    const endDateTime = addHours(startDateTime, durationHours);
    
    return { start: startDateTime, end: endDateTime };
  };

  // Check if the selected slot overlaps with existing bookings
  const hasOverlap = () => {
    const dateTime = calculateEndDateTime();
    if (!dateTime) return false;

    return bookedSlots.some(booking => {
      const bookingStart = parseISO(booking.startDateTime);
      const bookingEnd = parseISO(booking.endDateTime);
      
      // Check overlap
      return dateTime.start < bookingEnd && dateTime.end > bookingStart;
    });
  };

  const handleNext = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }

    if (hasOverlap()) {
      alert('This time slot overlaps with an existing booking. Please choose a different time.');
      return;
    }

    setStep('details');
  };

  const handleBack = () => {
    setError('');
    setStep('datetime');
  };

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  const handleConfirmBooking = async () => {
    // Validate inputs
    if (!customerName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!validatePhone(customerPhone)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setError('');
    setSubmitting(true);

    const dateTime = calculateEndDateTime();
    const bookingPayload = {
      carId: car.id,
      carName: car.name,
      customerName: customerName.trim(),
      customerPhone: customerPhone.replace(/\D/g, ''),
      startDateTime: dateTime.start.toISOString(),
      endDateTime: dateTime.end.toISOString(),
      durationType: duration
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBookingData(data.booking);
        setStep('confirmation');
      } else {
        // Handle overlap or other errors
        if (response.status === 409 || data.error === 'Booking conflict') {
          setError('Sorry, this slot was just booked. Please choose different dates.');
        } else {
          setError(data.message || data.error || 'Booking failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const generateWhatsAppMessage = () => {
    if (!bookingData) return '';
    
    const dateTime = calculateEndDateTime();
    const message = `Hi! I just made a booking request:\n\nCar: ${car.name}\nName: ${customerName}\nPhone: ${customerPhone}\nPick-up: ${format(dateTime.start, 'MMM d, yyyy - h:mm a')}\nDrop-off: ${format(dateTime.end, 'MMM d, yyyy - h:mm a')}\nDuration: ${duration}\nTotal: ${duration === '12hr' ? car.price12 : car.price24}\n\nPlease confirm my booking!`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppConfirm = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/919540771001?text=${message}`, '_blank');
    
    // Track WhatsApp click
    if (window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        source: 'booking_modal',
        action: 'confirmation_cta',
        car_name: car.name,
      });
    }
  };

  if (!isOpen) return null;

  const dateTime = calculateEndDateTime();
  const overlap = hasOverlap();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-gray-900 to-black border-2 border-racing-red rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-black/95 border-b border-racing-red/30 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-heading text-white">
                  BOOK <span className="text-racing-red">{car?.name}</span>
                </h2>
                <p className="text-gray-400 mt-1">Select your rental period</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {step === 'datetime' && (
                <>
                  {loading ? (
                    <div className="text-center py-8 text-gray-400">
                      Loading availability...
                    </div>
                  ) : (
                    <>
                      {/* Duration Toggle */}
                      <div>
                        <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                          <Clock size={20} className="text-racing-red" />
                          Duration
                        </label>
                        <div className="flex gap-4">
                          <button
                            onClick={() => setDuration('12hr')}
                            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                              duration === '12hr'
                                ? 'bg-racing-red text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                          >
                            12 Hours - {car?.price12}
                          </button>
                          <button
                            onClick={() => setDuration('24hr')}
                            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                              duration === '24hr'
                                ? 'bg-racing-red text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                          >
                            24 Hours - {car?.price24}
                          </button>
                        </div>
                      </div>

                      {/* Date Picker */}
                      <div>
                        <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                          <Calendar size={20} className="text-racing-red" />
                          Pick-up Date
                        </label>
                        <DatePicker
                          selected={selectedDate}
                          onChange={setSelectedDate}
                          minDate={new Date()}
                          filterDate={(date) => !isDateDisabled(date)}
                          dateFormat="MMMM d, yyyy"
                          placeholderText="Select a date"
                          className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-racing-red rounded-lg px-4 py-3 outline-none transition-colors"
                          calendarClassName="custom-calendar"
                        />
                      </div>

                      {/* Time Picker */}
                      <div>
                        <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                          <Clock size={20} className="text-racing-red" />
                          Pick-up Time
                        </label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-racing-red rounded-lg px-4 py-3 outline-none transition-colors"
                        >
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = i.toString().padStart(2, '0');
                            return (
                              <option key={hour} value={`${hour}:00`}>
                                {hour}:00
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/* Summary */}
                      {dateTime && (
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                          <h3 className="text-white font-semibold mb-3">Booking Summary</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Pick-up:</span>
                              <span className="text-white font-medium">
                                {format(dateTime.start, 'MMM d, yyyy - h:mm a')}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Drop-off:</span>
                              <span className="text-white font-medium">
                                {format(dateTime.end, 'MMM d, yyyy - h:mm a')}
                              </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-700">
                              <span className="text-gray-400">Total:</span>
                              <span className="text-racing-red font-bold text-lg">
                                {duration === '12hr' ? car?.price12 : car?.price24}
                              </span>
                            </div>
                          </div>

                          {overlap && (
                            <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-sm">
                              ⚠️ This time slot overlaps with an existing booking. Please choose a different time.
                            </div>
                          )}
                        </div>
                      )}

                      {/* Existing Bookings Info */}
                      {bookedSlots.length > 0 && (
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                          <h3 className="text-white font-semibold mb-2 text-sm">Already Booked Slots:</h3>
                          <div className="space-y-1 text-xs text-gray-400">
                            {bookedSlots.map((booking, idx) => (
                              <div key={idx}>
                                {format(parseISO(booking.startDateTime), 'MMM d, h:mm a')} - {format(parseISO(booking.endDateTime), 'MMM d, h:mm a')}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {step === 'details' && (
                <>
                  {/* Booking Summary */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">Your Selection</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Car:</span>
                        <span className="text-white font-medium">{car?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pick-up:</span>
                        <span className="text-white font-medium">
                          {format(calculateEndDateTime().start, 'MMM d, yyyy - h:mm a')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Drop-off:</span>
                        <span className="text-white font-medium">
                          {format(calculateEndDateTime().end, 'MMM d, yyyy - h:mm a')}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-700">
                        <span className="text-gray-400">Total:</span>
                        <span className="text-racing-red font-bold text-lg">
                          {duration === '12hr' ? car?.price12 : car?.price24}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Details Form */}
                  <div>
                    <h3 className="text-white font-semibold mb-4">Your Details</h3>
                    
                    {/* Name Input */}
                    <div className="mb-4">
                      <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                        <User size={18} className="text-racing-red" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-racing-red rounded-lg px-4 py-3 outline-none transition-colors"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="mb-4">
                      <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                        <Phone size={18} className="text-racing-red" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        maxLength="10"
                        className="w-full bg-gray-800 text-white border-2 border-gray-700 focus:border-racing-red rounded-lg px-4 py-3 outline-none transition-colors"
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter 10-digit Indian mobile number</p>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400 text-sm">
                      ⚠️ {error}
                    </div>
                  )}
                </>
              )}

              {step === 'confirmation' && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} className="text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-heading text-white mb-4">
                    BOOKING REQUEST <span className="text-racing-red">RECEIVED!</span>
                  </h3>
                  
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    We'll confirm your booking via WhatsApp shortly. Click below to expedite confirmation.
                  </p>

                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-8 max-w-md mx-auto">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Booking ID:</span>
                        <span className="text-white font-mono text-xs">{bookingData?._id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Car:</span>
                        <span className="text-white font-medium">{car?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span className="text-white">{customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-yellow-500 font-semibold">Pending Confirmation</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleWhatsAppConfirm}
                    className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
                  >
                    <FaWhatsapp className="text-2xl" />
                    <span>Confirm on WhatsApp</span>
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-black/95 border-t border-racing-red/30 p-6 flex gap-4">
              {step === 'datetime' && (
                <>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!selectedDate || !selectedTime || overlap}
                    className="flex-1 bg-racing-red hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </>
              )}

              {step === 'details' && (
                <>
                  <button
                    onClick={handleBack}
                    disabled={submitting}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    disabled={submitting || !customerName.trim() || !customerPhone.trim()}
                    className="flex-1 bg-racing-red hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </>
              )}

              {step === 'confirmation' && (
                <button
                  onClick={onClose}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
                >
                  Close
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
