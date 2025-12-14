import { Link } from 'react-router-dom';
import { FiArrowRight, FiCode, FiLayers, FiShield, FiZap, FiCalendar, FiMapPin, FiClock, FiUsers, FiCheck } from 'react-icons/fi';

const features = [
  {
    icon: <FiCalendar className="w-8 h-8 text-primary-600" />,
    title: 'Easy Hall Booking',
    description: 'Book community halls and venues with our streamlined booking system.',
    highlighted: true
  },
  {
    icon: <FiMapPin className="w-8 h-8 text-primary-600" />,
    title: 'Multiple Venues',
    description: 'Choose from various halls including Budhavihar, Nagarbhavan, and more.',
    highlighted: false
  },
  {
    icon: <FiClock className="w-8 h-8 text-primary-600" />,
    title: 'Time Slot Management',
    description: 'Flexible scheduling with easy time slot selection and availability tracking.',
    highlighted: false
  },
  {
    icon: <FiUsers className="w-8 h-8 text-primary-600" />,
    title: 'Customer Management',
    description: 'Complete customer database with booking history and contact details.',
    highlighted: false
  },
  {
    icon: <FiShield className="w-8 h-8 text-primary-600" />,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security to keep your booking data safe and confidential.',
    highlighted: false
  },
  {
    icon: <FiZap className="w-8 h-8 text-primary-600" />,
    title: 'Lightning Fast',
    description: 'Experience blazing fast performance with our optimized booking system.',
    highlighted: false
  }
];

const stats = [
  { number: '500+', label: 'Bookings Managed' },
  { number: '3', label: 'Available Halls' },
  { number: '99%', label: 'Customer Satisfaction' },
  { number: '24/7', label: 'Support Available' }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-500/10 to-accent-500/10 dark:from-primary-900/20 dark:to-accent-900/20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9InJnYmEoMCwwLDAsMC4wMykiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRtMTIgMGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNG0tMTItMTJjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRtMTIgMGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNG0tMTItMTJjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRtMTIgMGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNG0tMTItMTJjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRtMTIgMGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20 dark:opacity-10"></div>
        </div>
        <div className="container-booking">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Community Hall Booking<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book community halls and venues for your events with our easy-to-use online booking system. 
              Manage reservations, track availability, and handle payments all in one place.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/bookings"
                className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <FiCalendar className="mr-2" />
                Manage Bookings
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="btn-outline text-lg px-8 py-4 border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-500 dark:text-primary-400 dark:hover:bg-primary-900/30 flex items-center justify-center"
              >
                Learn More
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-neutral-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-50 dark:to-neutral-900/50 -z-10"></div>
        <div className="container-booking">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-neutral-800/50 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700/50 hover:shadow-md transition-shadow duration-300 text-center"
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800/30 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-500/5 rounded-full mix-blend-multiply filter blur-3xl dark:bg-primary-400/10"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-accent-500/5 rounded-full mix-blend-multiply filter blur-3xl dark:bg-accent-400/10"></div>
        <div className="container-booking">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Hall Booking System
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-pretty">
              We provide everything you need to manage community hall bookings efficiently and professionally.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${feature.highlighted ? 'ring-2 ring-primary-500 ring-offset-2' : ''}`}
              >
                <div className={`feature-icon ${feature.highlighted ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : ''}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-pretty">
                  {feature.description}
                </p>
                {feature.highlighted && (
                  <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-medium">
                    <FiCheck className="w-4 h-4 mr-2" />
                    Most Popular
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-booking">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-pretty">
              Get your hall booked in just 4 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Choose Hall', description: 'Select from our available community halls' },
              { step: '2', title: 'Select Date & Time', description: 'Pick your preferred date and time slot' },
              { step: '3', title: 'Fill Details', description: 'Provide your contact and event details' },
              { step: '4', title: 'Confirm Booking', description: 'Review and confirm your booking' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-pretty">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-booking">
          <div className="booking-gradient rounded-2xl p-8 md:p-16 text-center text-white">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">
              Ready to Book Your Hall?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto text-pretty">
              Join hundreds of satisfied customers who trust our hall booking system for their events.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
              <Link
                to="/bookings"
                className="btn bg-white text-primary-600 hover:bg-primary-50 text-lg px-8 py-4 shadow-xl"
              >
                <FiCalendar className="mr-2" />
                Start Booking Now
                <FiArrowRight className="ml-2" />
              </Link>
              <Link
                to="/contact"
                className="btn-outline bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 text-lg px-8 py-4"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
