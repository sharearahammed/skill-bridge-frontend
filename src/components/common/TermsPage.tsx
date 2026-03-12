"use client";

export default function TermsPage() {
  const sections = [
    {
      title: "Introduction",
      content: `
        Welcome to SkillBridge. By accessing or using our platform, you agree to comply with and be bound by these terms and conditions. 
        If you do not agree with these terms, please do not use our services.
      `,
    },
    {
      title: "Our Services",
      content: `
        SkillBridge connects students with qualified tutors across different subjects. 
        Users can browse tutors, book sessions, and communicate for learning purposes.
      `,
    },
    {
      title: "User Accounts",
      content: `
        To access certain features, users must create an account. 
        You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.
      `,
    },
    {
      title: "Tutor Responsibilities",
      content: `
        Tutors must provide accurate information regarding qualifications, availability, and pricing. 
        SkillBridge reserves the right to remove tutors who provide misleading information or violate our policies.
      `,
    },
    {
      title: "Student Responsibilities",
      content: `
        Students are expected to communicate respectfully and attend scheduled sessions on time. 
        Misuse of the platform may result in account suspension.
      `,
    },
    {
      title: "Payments & Bookings",
      content: `
        All tutoring session payments must be made through the platform. 
        Prices are determined by tutors. Service fees may apply where applicable.
      `,
    },
    {
      title: "Privacy Policy",
      content: `
        We value your privacy. Personal information collected through the platform is handled according to our Privacy Policy.
      `,
    },
    {
      title: "Account Termination",
      content: `
        SkillBridge reserves the right to suspend or terminate accounts that violate these terms or engage in harmful or fraudulent activities.
      `,
    },
    {
      title: "Changes to Terms",
      content: `
        We may update these Terms & Conditions from time to time. Continued use of the platform after updates means you accept the revised terms.
      `,
    },
    {
      title: "Contact Us",
      content: `
        If you have any questions about these Terms & Conditions, please contact us at support@skillbridge.com
      `,
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8"
            >
              <div className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-3">
                <div className="flex justify-center items-center rounded-full w-8 h-8 bg-[#00B5BA]/20 ">
                  <h1 className="text-[#00B5BA] text-center font-bold text-[18px]">
                    {idx + 1}
                  </h1>
                </div>

                {section.title}
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center text-gray-500 text-sm mt-16">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#00B5BA] font-medium">SkillBridge</span>. All
          rights reserved.
        </div>
      </div>
    </section>
  );
}
