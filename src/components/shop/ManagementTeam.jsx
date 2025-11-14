import { useState } from 'react';

export default function ManagementTeam() {
  const team = [
    {
      name: "Mr. Rajesh Sethia",
      title: "President",
      description: "Leads the overall vision, strategy, and direction of the organization, ensuring alignment with its mission and values. Drives long-term goals and strategic initiatives while maintaining oversight of key partnerships and growth opportunities.",
      image: "/comittee/rajeshsethiya.png"
    },
    {
      name: "Prateek Sethia",
      title: "Chief Executive Officer",
      description: "Responsible for the execution of the company's day-to-day operations. Prateek focuses on ensuring operational efficiency, fostering innovation, and making critical decisions that align with the organization's goals.",
      image: "/final jivitha pics/prateeksethiya.png"
    },
    {
      name: "Disha Sethia",
      title: "Legal Adviser",
      description: "Provides expert legal counsel to the organization, ensuring compliance with laws and regulations. Disha focuses on protecting the company's legal interests and supporting strategic decision-making with sound legal advice.",
      image: "/comittee/dishasethiya.png"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(7); // Start with the 8th dot selected (0-indexed)

  return (
    <div className=" py-8 px-4">
      {/* Dots navigation */}
      <div className="flex justify-center mb-8 gap-2">
        {Array(8).fill().map((_, index) => (
          <div 
            key={index} 
            className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">Management Team</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="mb-4">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h2>
              <p className="text-gray-600 mb-4">{member.title}</p>
              <p className="text-gray-500 text-center text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}