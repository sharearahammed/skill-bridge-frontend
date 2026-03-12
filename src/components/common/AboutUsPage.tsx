"use client";

import Image from "next/image";
import aboutImage from "../../assets/about-us.jpg";

export default function AboutUsPage() {
  const teamMembers = [
    { name: "Alice Johnson", role: "Founder & CEO", image: "/team/alice.jpg" },
    { name: "John Smith", role: "Head of Operations", image: "/team/john.jpg" },
    { name: "Maria Rodriguez", role: "Lead Tutor", image: "/team/maria.jpg" },
    { name: "David Lee", role: "Product Designer", image: "/team/david.jpg" },
  ];

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">
              About SkillBridge
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl mb-6 leading-relaxed">
              SkillBridge connects students with expert tutors worldwide. Our
              mission is to empower learners, provide personalized guidance, and
              help them achieve their academic and professional goals.
            </p>
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
              With a verified network of tutors, real-time booking, and
              interactive learning tools, SkillBridge ensures every student gets
              the support they need to succeed.
            </p>
          </div>

          <div className="relative w-full h-80 sm:h-[450px]">
            <Image
              src={aboutImage}
              alt="About SkillBridge"
              fill
              className="object-cover rounded-2xl shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Our Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-[#00B5BA]">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To provide every student with access to high-quality tutoring,
              personalized learning paths, and practical skills that empower
              them to succeed academically and professionally.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-[#5672C4]">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To be the leading platform for connecting students and tutors
              worldwide, fostering a community of continuous learning, growth,
              and excellence.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            Meet Our Team
          </h2>
          <p className="text-gray-500 mt-3">
            A passionate team dedicated to helping students succeed
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center"
            >
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Join thousands of students learning with expert tutors on
            SkillBridge today.
          </p>
          <a
            href="/register"
            className="bg-[#00B5BA] hover:bg-[#5672C4] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
          >
            Sign Up Now
          </a>
        </div>
      </div>
    </section>
  );
}
