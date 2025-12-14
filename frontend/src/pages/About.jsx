import React from 'react';
import { FiUsers, FiAward, FiGlobe, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const stats = [
  { id: 1, name: 'Projects Completed', value: '100+', icon: FiAward },
  { id: 2, name: 'Satisfied Clients', value: '50+', icon: FiUsers },
  { id: 3, name: 'Global Reach', value: '5+', icon: FiGlobe, suffix: 'Countries' },
];

const team = [
  {
    name: 'Prashant Tiwari',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Saurabh Tiwari',
    role: 'CTO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Rahul Tiwari',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-500/10 to-accent-500/10 dark:from-primary-900/20 dark:to-accent-900/20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9InJnYmEoMCwwLDAsMC4wMykiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRtMTIgMGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNG0tMTItMTJjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRtMTIgMGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNG0tMTItMTJjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRtMTIgMGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNG0tMTItMTJjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRtMTIgMGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20 dark:opacity-10"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">Assentech</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Empowering businesses with innovative technology solutions since 2020.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white dark:bg-neutral-900/50 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.id}
                  className="bg-white dark:bg-neutral-800/50 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700/50 hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {stat.name}
                    {stat.suffix && <span className="block text-sm mt-1 text-gray-500 dark:text-gray-400">{stat.suffix}</span>}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800/30 relative">
        <div className="absolute -right-20 top-1/2 w-64 h-64 bg-primary-500/5 rounded-full mix-blend-multiply filter blur-3xl dark:bg-primary-400/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">Story</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Founded in 2020, Assentech started as a small team of passionate developers with a vision to create 
                meaningful digital experiences. Today, we've grown into a full-service technology company serving 
                clients across the globe.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our mission is to help businesses leverage technology to solve complex problems and achieve 
                their goals. We believe in building lasting relationships with our clients by delivering 
                exceptional value through innovation, expertise, and outstanding customer service.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                What sets us apart is our commitment to quality, attention to detail, and our ability to 
                understand and anticipate our clients' needs.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Get in Touch
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-300"
                >
                  Our Services
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="Our diverse team collaborating in a modern office space" 
                  className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-500/10 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-500/10 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div 
              key={member.name}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-center"
              role="article"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={`Portrait of ${member.name}, ${member.role}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="400"
                  height="400"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

