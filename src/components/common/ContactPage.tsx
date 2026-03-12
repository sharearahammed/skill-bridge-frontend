"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Have questions? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl sm:text-2xl font-bold text-[#00B5BA] mb-2 sm:mb-4">Address</h2>
              <p className="text-gray-600 text-sm sm:text-base">123 SkillBridge Street, Dhaka, Bangladesh</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl sm:text-2xl font-bold text-[#00B5BA] mb-2 sm:mb-4">Email</h2>
              <p className="text-gray-600 text-sm sm:text-base">support@skillbridge.com</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl sm:text-2xl font-bold text-[#00B5BA] mb-2 sm:mb-4">Phone</h2>
              <p className="text-gray-600 text-sm sm:text-base">+880 123 456 789</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B5BA] outline-none text-sm sm:text-base"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B5BA] outline-none text-sm sm:text-base"
                />
              </div>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B5BA] outline-none text-sm sm:text-base"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B5BA] outline-none text-sm sm:text-base resize-none"
              />

              <button
                type="submit"
                className="w-full bg-[#00B5BA] hover:bg-[#5672C4] text-white py-3 sm:py-4 rounded-full font-semibold text-lg sm:text-xl transition-all duration-300"
              >
                Send Message
              </button>

            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 sm:mt-16 rounded-2xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.912712345678!2d90.391234!3d23.810332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7bd3b3e5e07%3A0x9b1d3e9b0bbec9f6!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
            width="100%"
            height="400"
            className="border-0 w-full"
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
}