import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <section className={`min-h-screen py-20 transition-colors ${isDarkMode ? 'bg-gradient-to-b from-[#0a0c1b] via-[#23243a] to-[#0a0c1b] text-white' : 'bg-gradient-to-b from-white via-blue-50 to-white text-slate-900'}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">
        <h1 className={`text-4xl md:text-6xl font-bold mb-10 text-center ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>Contact Us</h1>
        <div className={`rounded-2xl shadow-xl p-8 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-cyan-500' : 'bg-gray-100 border-gray-300 text-slate-900 focus:ring-blue-400'}`}
              />
            </div>
            <div>
              <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-cyan-500' : 'bg-gray-100 border-gray-300 text-slate-900 focus:ring-blue-400'}`}
              />
            </div>
            <div>
              <label className={`block mb-2 font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-cyan-500' : 'bg-gray-100 border-gray-300 text-slate-900 focus:ring-blue-400'}`}
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 focus:ring-cyan-500' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 focus:ring-blue-400'}`}
            >
              Send Message
            </button>
            {submitted && <div className="text-green-400 text-center font-semibold mt-4 animate-pulse">Thank you! Your message has been sent.</div>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
