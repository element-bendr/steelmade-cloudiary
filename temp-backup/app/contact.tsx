import React, { useState, FormEvent } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    // Simulate an API call to submit the form data
    console.log('Form submitted:', { name, email, message });
    setSuccess('Thank you for your message. We will get back to you soon.');

    // Clear form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
