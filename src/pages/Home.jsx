import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaPhoneAlt, FaInstagram } from 'react-icons/fa';
import { Clock, Shield, Gauge, Car } from 'lucide-react';

const Home = () => {
  const trustPoints = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: '24/7 Availability',
      description: 'Round-the-clock service for your convenience',
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Zero Security Deposit',
      description: 'Drive without the burden of hefty deposits',
    },
    {
      icon: <Gauge className="w-12 h-12" />,
      title: 'Unlimited KM Options',
      description: 'Freedom to explore without limits',
    },
    {
      icon: <Car className="w-12 h-12" />,
      title: 'Wide Fleet Range',
      description: 'From budget to premium luxury vehicles',
    },
  ];

  const featuredCars = [
    {
      name: 'Mercedes CLA 200',
      price12: '₹10,000',
      price24: '₹20,000',
      tag: 'PREMIUM',
    },
    {
      name: 'Mahindra Thar',
      price12: '₹3,000',
      price24: '₹5,000',
      tag: 'ADVENTURE',
    },
    {
      name: 'Scorpio Classic',
      price12: '₹3,000',
      price24: '₹5,000',
      tag: 'POPULAR',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-matte-black z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920')] bg-cover bg-center opacity-30" />
          {/* Racing stripes */}
          <div className="absolute top-0 left-1/4 w-2 h-full bg-racing-red opacity-20 transform -skew-x-12" />
          <div className="absolute top-0 right-1/4 w-2 h-full bg-racing-red opacity-20 transform -skew-x-12" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-heading text-white mb-4 text-shadow-glow"
          >
            SELF DRIVE CARS
            <span className="block text-racing-red">24/7</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide"
          >
            Premium Service, Every Mile
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="https://wa.me/919540771001?text=Hi%2C%20I%27m%20interested%20in%20renting%20a%20car"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-racing-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <FaWhatsapp className="text-2xl" />
              <span>Book on WhatsApp</span>
            </a>
            
            <a
              href="tel:+919540771001"
              className="flex items-center gap-3 bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <FaPhoneAlt className="text-xl" />
              <span>Call Now</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Why Roadster Section */}
      <section className="py-20 bg-matte-black relative">
        {/* Angular divider */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-racing-red/20 to-transparent transform -skew-y-2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-heading text-white mb-4">
              WHY <span className="text-racing-red">ROADSTER</span>
            </h2>
            <div className="w-24 h-1 bg-racing-red mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-racing-red/30 hover:border-racing-red transition-all duration-300 shadow-xl"
              >
                <div className="text-racing-red mb-4">{point.icon}</div>
                <h3 className="text-2xl font-heading text-white mb-2">{point.title}</h3>
                <p className="text-gray-400">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,#E10600_20px,#E10600_21px)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-heading text-white mb-4">
              FEATURED <span className="text-racing-red">FLEET</span>
            </h2>
            <div className="w-24 h-1 bg-racing-red mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Discover our handpicked selection</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredCars.map((car, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden border-2 border-racing-red/30 hover:border-racing-red transition-all duration-300 shadow-2xl"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Car className="w-24 h-24 text-racing-red opacity-50" />
                  {car.tag && (
                    <div className="absolute top-4 right-4 bg-racing-red text-white px-3 py-1 text-xs font-heading">
                      {car.tag}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading text-white mb-4">{car.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">12 Hours</p>
                      <p className="text-racing-red text-xl font-bold">{car.price12}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">24 Hours</p>
                      <p className="text-racing-red text-xl font-bold">{car.price24}</p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/919540771001?text=Hi%2C%20I%27m%20interested%20in%20renting%20the%20${encodeURIComponent(car.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-racing-red hover:bg-red-700 text-white text-center py-3 rounded-md font-semibold transition-all duration-300"
                  >
                    Book Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link
              to="/fleet"
              className="inline-block bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              View Full Fleet
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gradient-to-br from-matte-black to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-heading text-white mb-8">
              JOIN OUR <span className="text-racing-red">COMMUNITY</span>
            </h2>
            <div className="w-24 h-1 bg-racing-red mx-auto mb-12" />
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-6xl font-heading text-racing-red mb-2">618+</div>
                <p className="text-gray-400 text-lg">Instagram Followers</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-6xl font-heading text-racing-red mb-2">24/7</div>
                <p className="text-gray-400 text-lg">Service Available</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-6xl font-heading text-racing-red mb-2">6+</div>
                <p className="text-gray-400 text-lg">Premium Vehicles</p>
              </motion.div>
            </div>

            <a
              href="https://instagram.com/r0adster_drive"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <FaInstagram className="text-2xl" />
              <span>Follow @r0adster_drive</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-racing-red relative overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(0,0,0,0.1)_40px,rgba(0,0,0,0.1)_80px)]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-heading text-white mb-6">
              READY TO HIT THE ROAD?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Book your dream car now and experience the freedom of self-drive
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/919540771001?text=Hi%2C%20I%27m%20interested%20in%20renting%20a%20car"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <FaWhatsapp className="text-2xl" />
                <span>Book on WhatsApp</span>
              </a>
              
              <a
                href="tel:+919540771001"
                className="flex items-center gap-3 bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
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

export default Home;
