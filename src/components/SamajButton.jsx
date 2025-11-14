import React, { useState } from 'react';
import { X } from 'lucide-react';

const buttonsData = [
  {
    id: 1,
    image: "/LandingPageButtons/businessprofilejodo.png",
    label: "बिजनेस प्रोफाइल",
    description:
      "Each registered user has a facility to open and operate their own virtual shops manageable by their own login and visible to all other members. The member can add products and a permanent virtual shop address accessible from across the globe.",
  },
  {
    id: 2,
    image: "/LandingPageButtons/gatividhijodo.png",
    label: "गतिविधियां",
    description:
      "All the activities of the community date by date and as per the day will be displayed under the section. The members will be notified on app for upcoming activity as per the date.",
  },
  {
    id: 3,
    image: "/LandingPageButtons/invitationjodo.png",
    label: "निमंत्रण",
    description:
      "For all the members a facility to send digital invitations for any event to all the registered members of the community. All the members will get the invitations digitally and can confirm the presence directly from the invitation page.",
  },
  {
    id: 4,
    image: "/LandingPageButtons/jobs-jodo.png",
    label: "नौकरी",
    description:
      "Job section to post and get jobs by and to the registered members. The members can directly post any job requirements from their panel and get the candidates from registered members.",
  },
  {
    id: 5,
    image: "/LandingPageButtons/membersjodo.png",
    label: "मेंबर्स",
    description:
      "Digital card and profile of each registered member verified by admin. The section will display all the details of members by community and differentiated by name, occupation, education, location and many other criterias.",
  },
  {
    id: 6,
    image: "/LandingPageButtons/samajsevajodo.png",
    label: "समाज सेवा",
    description:
      "The registered members can join the social causes also directly from their profile for various activities as displayed like go seva, kapde daan, book exchange and many other.",
  },
  {
    id: 7,
    image: "/LandingPageButtons/shoksamahacharjodo.png",
    label: "शोक समाचार",
    description:
      "The members can post shok news of the demised people or relatives to be visible to all the members of the community.",
  },
  {
    id: 8,
    image: "/LandingPageButtons/suggestionsjodo.png",
    label: "सुझाव",
    description:
      "Any registered member can submit suggestions for committee, members, features or any other can be submitted from member login account. All the suggestions will be directly visible to community admin.",
  },
  {
    id: 9,
    image: "/LandingPageButtons/uplabdhijodo.png",
    label: "उपलब्धियां",
    description:
      "Any achievements by members or member relatives can be posted in this section which will be directly visible to all the members and the members can reply or comment on the post.",
  },
  {
    id: 10,
    image: "/LandingPageButtons/vivahrishtejodo.png",
    label: "विवाह रिश्ते",
    description:
      "Male and female profiles of unmarried and other people with full profiles from different gotras and locations visible at one place, can be filtered by certain criterias to get the desired profile for match. Also you can submit profiles to be visible to authorised users only.",
  },
];

const SamajButtons = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  return (
    <div className="p-4 flex justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Button Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl w-full">
        {buttonsData.map((btn) => (
          <div
            key={btn.id}
            onClick={() => setSelectedButton(btn)}
            className="cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 "
          >
            <div className=" rounded-2xl p-4 shadow-lg border border-gray-100">
              <img
                src={btn.image}
                alt={btn.label}
                className="w-full h-32 object-contain rounded-lg mb-2"
              />
              <p className="text-center text-sm font-medium text-gray-800 truncate">
                {btn.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Modal Popup */}
      {selectedButton && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-0 w-full max-w-lg shadow-2xl relative overflow-hidden transform transition-all duration-300 scale-100">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10"></div>
              {/* <button
                onClick={() => setSelectedButton(null)}
                className="absolute top-4 right-4 text-white hover:text-red-300 transition-colors duration-200 z-10"
              >
                <X size={24} />
              </button> */}
              
              <div className="flex items-center space-x-4 relative z-10">
                <div className="bg-white bg-opacity-20 p-3 rounded-2xl backdrop-blur-sm">
                  <img
                    src={selectedButton.image}
                    alt={selectedButton.label}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {selectedButton.label}
                  </h2>
                  <div className="w-16 h-1 bg-white bg-opacity-50 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-base">
                  {selectedButton.description}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-100">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Learn More
                </button>
                <button 
                  onClick={() => setSelectedButton(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SamajButtons;