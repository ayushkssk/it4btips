import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Professional Trader',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 5,
    text: 'IT4B has completely transformed my trading journey. Their accurate calls and professional guidance helped me achieve consistent profits.',
    stats: '₹2.5L+ Monthly Profit'
  },
  {
    name: 'Priya Sharma',
    role: 'Day Trader',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    rating: 5,
    text: 'Best trading advisory service I\'ve ever used. Their real-time market updates and expert analysis are invaluable.',
    stats: '₹1.8L+ Monthly Profit'
  },
  {
    name: 'Amit Patel',
    role: 'Swing Trader',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    rating: 5,
    text: 'The accuracy of their calls is remarkable. I\'ve been consistently profitable since joining IT4B.',
    stats: '₹3.2L+ Monthly Profit'
  }
];

const stats = [
  { label: 'Active Traders', value: '10,000+' },
  { label: 'Success Rate', value: '92%' },
  { label: 'Years Experience', value: '15+' },
  { label: 'Monthly Trades', value: '500+' }
];

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats
      gsap.from('.stat', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate testimonials
      gsap.from('.testimonial-card', {
        x: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-base-100 via-primary/5 to-base-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Trusted by 10,000+ Traders
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful traders who have transformed their trading journey with IT4B
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-section stats shadow w-full max-w-4xl mx-auto mb-16 bg-base-100">
          {stats.map((stat, index) => (
            <div key={index} className="stat place-items-center">
              <div className="stat-title">{stat.label}</div>
              <div className="stat-value text-primary">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card card bg-base-100 shadow-xl border border-base-200 hover:border-primary transition-colors">
              <div className="card-body">
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 mb-6">{testimonial.text}</p>

                {/* User Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img src={testimonial.image} alt={testimonial.name} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="badge badge-primary">{testimonial.stats}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="btn btn-primary btn-lg">
            Join Our Trading Community
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
