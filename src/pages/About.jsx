import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { Award, Clock, Shield, Users, Target, Zap } from 'lucide-react';

const About = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Car',
      description: 'Browse our fleet and message us on WhatsApp with your preferred vehicle',
    },
    {
      number: '02',
      title: 'Confirm Booking',
      description: 'Share your details and rental duration. We will confirm availability instantly',
    },
    {
      number: '03',
      title: 'Pick Up & Drive',
      description: 'Visit our location, complete quick paperwork, and hit the road',
    },
  ];

  const trustBadges = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Zero Security Deposit',
      description: 'Drive without the burden of hefty deposits',
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance whenever you need',
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Well-Maintained Fleet',
      description: 'Regular servicing and quality checks',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Customer-First',
      description: 'Your satisfaction is our top priority',
    },
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Our Mission',
      description: 'To provide accessible, premium self-drive car rental services that give you the freedom to explore on your own terms.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Our Vision',
      description: 'To become the most trusted name in self-drive rentals across Greater Noida and beyond.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-matte-black via-black to-matte-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/3 w-1 h-full bg-racing-red transform -skew-x-12" />
          <div className="absolute top-0 right-1/3 w-1 h-full bg-racing-red transform -skew-x-12" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-heading text-white mb-4">
              ABOUT <span className="text-racing-red">ROADSTER</span>
            </h1>
            <div className="w-24 h-1 bg-racing-red mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Your trusted partner for self-drive car rentals in Brahmpur, Greater Noida
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-matte-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading text-white mb-8">
              WHO <span className="text-racing-red">WE ARE</span>
            </h2>
            <div className="w-24 h-1 bg-racing-red mx-auto mb-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-gray-300 text-lg leading-relaxed"
          >
            <p>
              At <span className="text-racing-red font-semibold">Roadster</span>, we believe that the journey matters as much as the destination. Founded in the heart of Greater Noida's Brahmpur region, we've built our reputation on one simple promise: delivering premium self-drive experiences that put you in control.
            </p>
            <p>
              Whether you need a budget-friendly hatchback for a quick city run, a rugged SUV for a weekend adventure, or a premium Mercedes for that special occasion, we've got you covered. No chauffeurs, no complications—just you, the open road, and the freedom to drive on your terms.
            </p>
            <p>
              What sets us apart? We operate <span className="text-racing-red font-semibold">24/7</span> because we know plans don't always fit a 9-to-5 schedule. We've eliminated security deposits because we trust our customers. And we offer unlimited kilometer options because exploring shouldn't have limits.
            </p>
            <p className="text-racing-red font-semibold text-xl">
              Premium Service, Every Mile—that's not just our tagline, it's our commitment to you.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 mt-16"
          >
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-racing-red/30"
              >
                <div className="text-racing-red mb-4">{value.icon}</div>
                <h3 className="text-2xl font-heading text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-black relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">
              HOW IT <span className="text-racing-red">WORKS</span>
            </h2>
            <div className="w-24 h-1 bg-racing-red mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Simple, fast, and hassle-free</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Connecting Line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-racing-red to-transparent -translate-x-1/2" />
                )}

                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border-2 border-racing-red/30 hover:border-racing-red transition-all duration-300 relative">
                  <div className="text-8xl font-heading text-racing-red/20 absolute top-4 right-4">
                    {step.number}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-heading text-white mb-4">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <a
              href="https://wa.me/919540771001?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20the%20booking%20process"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-racing-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              <FaWhatsapp className="text-2xl" />
              <span>Start Booking Now</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-20 bg-gradient-to-br from-matte-black to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">
              WHY CHOOSE <span className="text-racing-red">US</span>
            </h2>
            <div className="w-24 h-1 bg-racing-red mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-racing-red/30 hover:border-racing-red transition-all duration-300 text-center"
              >
                <div className="text-racing-red mb-4 flex justify-center">{badge.icon}</div>
                <h3 className="text-xl font-heading text-white mb-2">{badge.title}</h3>
                <p className="text-gray-400 text-sm">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-racing-red relative overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(0,0,0,0.1)_40px,rgba(0,0,0,0.1)_80px)]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading text-white mb-6">
              READY TO EXPERIENCE THE DIFFERENCE?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of satisfied customers who trust Roadster for their self-drive needs
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

export default About;
