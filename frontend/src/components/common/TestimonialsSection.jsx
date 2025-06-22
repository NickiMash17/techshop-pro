import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Tech Enthusiast",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      rating: 5,
      review: "TechShop Pro has completely transformed my tech shopping experience. The lightning-fast delivery and exceptional customer service are unmatched. I've never been disappointed with any purchase!",
      product: "Premium Wireless Headphones",
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Gaming Professional",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 5,
      review: "As a professional gamer, I need reliable equipment. TechShop Pro delivers exactly what they promise - high-quality gaming gear at competitive prices. Highly recommended!",
      product: "Gaming Mouse & Keyboard Set",
      verified: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Digital Creator",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 5,
      review: "The product selection is incredible, and the prices are unbeatable. I love how easy it is to find exactly what I need for my content creation setup.",
      product: "4K Webcam & Microphone",
      verified: true
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Software Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 5,
      review: "Fast delivery, great prices, and excellent customer support. TechShop Pro has become my go-to for all tech purchases. The quality is consistently outstanding.",
      product: "Mechanical Keyboard",
      verified: true
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Student",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      rating: 5,
      review: "Perfect for students on a budget! I found amazing deals on laptops and accessories. The 24-hour delivery saved me during finals week.",
      product: "Student Laptop Bundle",
      verified: true
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const slideVariants = {
    enter: {
      opacity: 0,
      x: 100,
      scale: 0.9
    },
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-surface/40 to-surface/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Customers Say
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it - hear from thousands of satisfied customers
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative"
            >
              <div className="glass-card p-8 md:p-12 text-center">
                {/* Quote Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </motion.div>

                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center items-center gap-1 mb-6"
                >
                  {renderStars(testimonials[currentTestimonial].rating)}
                </motion.div>

                {/* Review Text */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 italic"
                >
                  "{testimonials[currentTestimonial].review}"
                </motion.p>

                {/* Customer Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div className="text-left">
                      <h4 className="text-lg font-semibold text-white">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-gray-400">{testimonials[currentTestimonial].role}</p>
                    </div>
                    {testimonials[currentTestimonial].verified && (
                      <div className="flex items-center gap-1 text-green-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Verified</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Purchased */}
                  <div className="bg-surface/50 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-400">Purchased: </span>
                    <span className="text-sm text-primary font-medium">
                      {testimonials[currentTestimonial].product}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentTestimonial(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-primary scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => {
              setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-surface/70 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => {
              setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-surface/70 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-gray-400">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24h</div>
            <div className="text-gray-400">Support Response</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 