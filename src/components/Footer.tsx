"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              SkillBridge
            </h2>
            <p className="text-sm leading-relaxed">
              Connecting students with expert tutors worldwide.
              Learn smarter, grow faster, and achieve your goals.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-[#00B5BA] hover:text-[#5672C4] transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="text-[#00B5BA] hover:text-[#5672C4] transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-[#00B5BA] hover:text-[#5672C4] transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-[#00B5BA] hover:text-[#5672C4] transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/tutors" className="hover:text-[#00B5BA] transition-colors">
                  Browse Tutors
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#00B5BA] transition-colors">
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#00B5BA] transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Categories
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/tutors?category=Programming" className="hover:text-[#00B5BA] transition-colors">
                  Programming
                </Link>
              </li>
              <li>
                <Link href="/tutors?category=Mathematics" className="hover:text-[#00B5BA] transition-colors">
                  Mathematics
                </Link>
              </li>
              <li>
                <Link href="/tutors?category=English" className="hover:text-[#00B5BA] transition-colors">
                  English
                </Link>
              </li>
              <li>
                <Link href="/tutors?category=Science" className="hover:text-[#00B5BA] transition-colors">
                  Science
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#00B5BA] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00B5BA] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#00B5BA] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#00B5BA] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#00B5BA] font-medium">
            SkillBridge
          </span>. All rights reserved.
        </div>

      </div>
    </footer>
  );
}