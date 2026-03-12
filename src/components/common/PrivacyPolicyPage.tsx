"use client";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Introduction",
      content: `
        At SkillBridge, we value your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information while using our platform.
      `,
    },
    {
      title: "Information We Collect",
      content: `
        We collect personal information including your name, email, contact details, and usage data to improve our services and provide a seamless learning experience.
      `,
    },
    {
      title: "Use of Information",
      content: `
        Collected data helps us deliver personalized tutoring recommendations, process payments, communicate updates, and enhance platform functionality.
      `,
    },
    {
      title: "Sharing & Disclosure",
      content: `
        We do not sell your data. Personal info may be shared with tutors for session management or with service providers supporting the platform.
      `,
    },
    {
      title: "Cookies & Tracking",
      content: `
        We use cookies to analyze traffic, remember preferences, and improve user experience. You can manage cookies through your browser settings.
      `,
    },
    {
      title: "Security Measures",
      content: `
        We use industry-standard security practices to protect your information from unauthorized access, disclosure, or alteration.
      `,
    },
    {
      title: "User Rights",
      content: `
        You can access, update, or delete your personal information. You may also withdraw consent for specific data processing activities anytime.
      `,
    },
    {
      title: "Children's Privacy",
      content: `
        SkillBridge does not knowingly collect data from children under 13. Any discovered information from children is promptly removed.
      `,
    },
    {
      title: "Policy Updates",
      content: `
        This Privacy Policy may change from time to time. Continued use of the platform after updates indicates acceptance of the revised policy.
      `,
    },
    {
      title: "Contact",
      content: `
        For any questions or concerns regarding this Privacy Policy, please contact us at support@skillbridge.com
      `,
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Grid Layout: Two-column on desktop, stacked mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 flex items-center justify-center bg-[#00B5BA]/20 text-[#00B5BA] font-bold rounded-full">
                  {idx + 1}
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line flex-1">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-gray-500 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#00B5BA] font-medium">SkillBridge</span>. All rights reserved.
        </div>
      </div>
    </section>
  );
}