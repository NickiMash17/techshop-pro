import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => (
  <>
    <Helmet>
      <title>About | TechShop Pro</title>
      <meta name="description" content="Learn more about TechShop Pro and its creator, Nicolette Mashaba." />
    </Helmet>
    <div className="container-responsive section-padding max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 text-white">About TechShop Pro</h1>
      <p className="text-lg text-gray-300 mb-6">
        TechShop Pro is a modern, full-stack e-commerce platform for discovering and shopping the latest tech gadgets, built as a portfolio project by Nicolette Mashaba.
      </p>
      <p className="mb-4 text-gray-400">
        <strong>Contact:</strong> <a href="mailto:nicolette.mashaba@techbridlefoundation.org" className="text-primary underline">nicolette.mashaba@techbridlefoundation.org</a>
      </p>
      <p className="text-gray-400">Thank you for visiting! Feel free to reach out for collaboration or opportunities.</p>
    </div>
  </>
);

export default About; 