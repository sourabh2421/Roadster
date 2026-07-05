import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { Fuel, Users, Gauge, Star } from 'lucide-react';

const Fleet = () => {
  const cars = [
    {
      name: 'Maruti Brezza Petrol',
      price12: '₹1,800',
      price24: '₹2,800',
      fuel: 'Petrol',
      seats: '5',
      category: 'budget',
      features: ['Unlimited KM', 'Bluetooth', 'AC'],
    },
    {
      name: 'Maruti Custom Swift',
      price12: '₹2,000',
      price24: '₹3,000',
      fuel: 'CNG/Petrol',
      seats: '5',
      category: 'budget',
      features: ['Dual Fuel', 'Unlimited KM', 'Music System'],
    },
    {
      name: 'Maruti Fronx CNG',
      price12: '₹2,000',
      price24: '₹3,500',
      fuel: 'CNG',
      seats: '5',
      category: 'budget',
      features: ['Eco-Friendly', 'Unlimited KM', 'Modern Design'],
    },
    {
      name: 'Mahindra Scorpio Classic',
      price12: '₹3,000',
      price24: '₹5,000',
      fuel: 'Diesel',
      seats: '7',
      category: 'suv',
      features: ['Spacious', '4x4 Capable', 'Powerful Engine'],
    },
    {
      name: 'Mahindra Thar',
      price12: '₹3,000',
      price24: '₹5,000',
      fuel: 'Diesel',
      seats: '4',
      category: 'suv',
      features: ['Off-Road Beast', 'Adventure Ready', 'Iconic Design'],
    },
    {
      name: 'Mercedes CLA 200',
      price12: '₹10,000',
      price24: '₹20,000',
      fuel: 'Petrol',
      seats: '5',
      category: 'premium',
      features: ['Luxury Interior', 'Premium Experience', 'Heads Turn'],
      isPremium: true,
    },
  ];

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
            className="text-center mb-8"
          >
            <h1 className="text-6xl md:text-7xl font-heading text-white mb-4">
              OUR <span className="text-racing-red">FLEET</span>
            </h1>
            <div className="w-24 h-1 bg-racing-red mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose from our diverse collection of self-drive vehicles. From budget-friendly options to premium luxury.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 bg-matte-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Budget & Mid-Range Cars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-heading text-white mb-8">
              BUDGET & <span className="text-racing-red">MID-RANGE</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.filter(car => car.category === 'budget' || car.category === 'suv').map((car, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden border-2 border-gray-800 hover:border-racing-red transition-all duration-300 shadow-xl"
                >
                  {/* Car Image Placeholder */}
                  <div className="relative h-52 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)]" />
                    <div className="text-racing-red text-6xl font-heading opacity-30">{car.name.split(' ')[0]}</div>
                  </div>

                  {/* Car Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-heading text-white mb-3">{car.name}</h3>
                    
                    {/* Specs */}
                    <div className="flex items-center gap-4 mb-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Fuel size={16} className="text-racing-red" />
                        <span>{car.fuel}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} className="text-racing-red" />
                        <span>{car.seats} Seats</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {car.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-racing-red/20 text-racing-red px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-800">
                      <div>
                        <p className="text-gray-500 text-sm">12 Hours</p>
                        <p className="text-racing-red text-2xl font-bold">{car.price12}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-sm">24 Hours</p>
                        <p className="text-racing-red text-2xl font-bold">{car.price24}</p>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={`https://wa.me/919540771001?text=Hi%2C%20I%27m%20interested%20in%20renting%20the%20${encodeURIComponent(car.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-racing-red hover:bg-red-700 text-white py-3 rounded-md font-semibold transition-all duration-300 text-sm"
                      >
                        <FaWhatsapp className="text-lg" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href="tel:+919540771001"
                        className="flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black px-4 py-3 rounded-md font-semibold transition-all duration-300 text-sm"
                      >
                        <FaPhoneAlt />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Premium Car */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-heading text-white mb-8">
              <span className="text-racing-red">PREMIUM</span> LUXURY
            </h2>
            
            {cars.filter(car => car.category === 'premium').map((car, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg overflow-hidden border-2 border-racing-red shadow-2xl"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Car Image */}
                  <div className="relative h-80 md:h-auto bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                    <div className="absolute top-6 left-6 bg-racing-red text-white px-4 py-2 font-heading text-lg flex items-center gap-2">
                      <Star size={20} fill="white" />
                      <span>PREMIUM</span>
                    </div>
                    <div className="text-racing-red text-8xl font-heading opacity-20">MB</div>
                  </div>

                  {/* Car Details */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="text-4xl font-heading text-white mb-4">{car.name}</h3>
                    <p className="text-gray-400 mb-6">
                      Experience ultimate luxury with our Mercedes CLA 200. Perfect for special occasions, corporate events, or when you want to make a statement.
                    </p>
                    
                    {/* Specs */}
                    <div className="flex items-center gap-6 mb-6 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Fuel size={20} className="text-racing-red" />
                        <span>{car.fuel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={20} className="text-racing-red" />
                        <span>{car.seats} Seats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge size={20} className="text-racing-red" />
                        <span>Premium</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {car.features.map((feature, idx) => (
                        <span key={idx} className="text-sm bg-racing-red text-white px-3 py-1.5 rounded font-semibold">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="flex gap-8 mb-8 pb-8 border-b border-gray-800">
                      <div>
                        <p className="text-gray-500 text-sm mb-1">12 Hours</p>
                        <p className="text-racing-red text-3xl font-bold">{car.price12}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm mb-1">24 Hours</p>
                        <p className="text-racing-red text-3xl font-bold">{car.price24}</p>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-4">
                      <a
                        href={`https://wa.me/919540771001?text=Hi%2C%20I%27m%20interested%20in%20renting%20the%20${encodeURIComponent(car.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-racing-red hover:bg-red-700 text-white py-4 rounded-md font-semibold transition-all duration-300 text-lg"
                      >
                        <FaWhatsapp className="text-xl" />
                        <span>Book on WhatsApp</span>
                      </a>
                      <a
                        href="tel:+919540771001"
                        className="flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black px-6 py-4 rounded-md font-semibold transition-all duration-300"
                      >
                        <FaPhoneAlt className="text-lg" />
                        <span className="hidden sm:inline">Call Now</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-racing-red to-red-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">
              NEED HELP CHOOSING?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our team is available 24/7 to help you select the perfect car for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919540771001?text=Hi%2C%20I%20need%20help%20choosing%20a%20car"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                <FaWhatsapp className="text-2xl" />
                <span>Chat with Us</span>
              </a>
              <a
                href="tel:+919540771001"
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                <FaPhoneAlt className="text-xl" />
                <span>Call: 9540771001</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Fleet;
