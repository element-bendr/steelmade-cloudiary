import React from 'react';

export function Testimonials() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add testimonial cards here */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">&ldquo;Excellent service and quality products!&rdquo;</p>
            <p className="font-semibold">- John Doe</p>
          </div>
        </div>
      </div>
    </section>
  );
}