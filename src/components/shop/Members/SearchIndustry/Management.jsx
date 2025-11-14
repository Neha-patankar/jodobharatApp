import React from 'react';
// import Image from 'next/image';

const Management = ({ company }) => {
  const managementTeam = [
    {
      name: 'Mr. Rajesh Sethia',
      role: 'President',
      imageUrl: '/comittee/rajeshsethiya.png',
      description:
        'Leads the overall vision, strategy, and direction of the organization, ensuring alignment with its mission and values. Drives long-term goals and strategic initiatives while maintaining oversight of key partnerships and growth opportunities.',
    },
    {
      name: 'Prateek Sethia',
      role: 'Chief Executive Officer',
      imageUrl: '/comittee/prateeksethiya.png',
      description:
        "Responsible for the execution of the company's day-to-day operations. Prateek focuses on ensuring operational efficiency, fostering innovation, and making critical decisions that align with the organization's goals.",
    },
    {
      name: 'Disha Sethia',
      role: 'Legal Adviser',
      imageUrl: '/comittee/dishasethiya.png',
      description:
        'Provides expert legal counsel to the organization, ensuring compliance with laws and regulations. Disha focuses on protecting the company\'s legal interests and supporting strategic decision-making with sound legal advice.',
    },
  ];

  return (
    <section className="container mx-auto px-4 md:px-8">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl pb-6 md:pb-10 font-bold text-gray-800">
          Management Team
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
        {managementTeam.map((member, index) => (
          <div key={index} className="relative max-w-sm mx-auto  mt-8">
            <div className="bg-white rounded-xl pt-16 pb-15  px-6 text-center shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
              {/* Image */}
              <div className="absolute lg:-top-12  -top-10 left-1/2 transform -translate-x-1/2">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white overflow-hidden shadow-lg ">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="mt-10 md:mt-12">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base md:text-lg">
                  {member.role}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm md:text-base px-2">
                  {member.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Management;
