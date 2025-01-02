import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection: React.FC = () => {
  useEffect(() => {
    gsap.from('.service-card', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.services-container',
        start: 'top center+=100',
      },
    });
  }, []);

  const services = [
    {
      title: 'Stock Trading',
      description: 'Expert guidance on stock market trading with real-time analysis and market insights.',
      icon: '📈',
      color: 'primary'
    },
    {
      title: 'Forex Trading',
      description: 'Professional forex trading strategies with currency pair analysis and risk management.',
      icon: '💱',
      color: 'secondary'
    },
    {
      title: 'Crypto Trading',
      description: 'Navigate the cryptocurrency market with our advanced trading tools and expert insights.',
      icon: '₿',
      color: 'accent'
    },
    {
      title: 'Portfolio Management',
      description: 'Comprehensive portfolio management services for long-term wealth creation.',
      icon: '📊',
      color: 'info'
    },
    {
      title: 'Trading Education',
      description: 'Learn trading from experts with our structured courses and live mentoring sessions.',
      icon: '🎓',
      color: 'success'
    },
    {
      title: 'Risk Analysis',
      description: 'Advanced risk assessment tools and strategies to protect your investments.',
      icon: '🛡️',
      color: 'warning'
    }
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive trading and investment solutions tailored to your financial goals
          </p>
        </div>
        
        <div className="services-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-200"
            >
              <div className="card-body">
                <div className={`text-4xl mb-4 text-${service.color}`}>{service.icon}</div>
                <h3 className={`card-title text-${service.color} mb-2`}>
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className={`btn btn-${service.color} btn-outline btn-sm`}>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
