"use client";

import {
  FaSearch,
  FaCalendarCheck,
  FaChalkboardTeacher,
} from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Search Tutor",
      description:
        "Browse tutors by subject, rating, and price to find the perfect match.",
      icon: FaSearch,
    },
    {
      id: 2,
      title: "Book a Session",
      description:
        "Select your preferred time slot and confirm your booking instantly.",
      icon: FaCalendarCheck,
    },
    {
      id: 3,
      title: "Start Learning",
      description:
        "Join your session and improve your skills with expert guidance.",
      icon: FaChalkboardTeacher,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#f0fbfb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            How It Works
          </h2>

          <p className="text-gray-600 mt-3 sm:mt-4 text-base sm:text-lg">
            Get started in just three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="group text-center p-6 sm:p-7 md:p-8 rounded-xl bg-white
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Step Number */}
                <div className="flex justify-center mb-5 sm:mb-6">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
                    flex items-center justify-center rounded-full
                    bg-[#e0f7f8] text-[#00B5BA]
                    text-lg sm:text-xl font-bold
                    group-hover:bg-[#00B5BA] group-hover:text-white
                    transition-all duration-300"
                  >
                    {step.id}
                  </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-3 sm:mb-4 text-[#00B5BA] group-hover:text-[#5672C4] group-hover:scale-110 transition-all duration-300">
                  <Icon size={24} className="sm:hidden" />
                  <Icon size={26} className="hidden sm:block md:hidden" />
                  <Icon size={28} className="hidden md:block" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 group-hover:text-[#00B5BA] transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}