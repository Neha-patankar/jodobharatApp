


import { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_url } from '../../apiConfig/api';

export default function ManagementTeam() {
  const [team, setTeam] = useState([]);
  const [activeIndex, setActiveIndex] = useState(7); // Start with the 8th dot selected (0-indexed)

 const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

useEffect(() => {
  if (!user || !user.name || !user.communityName || !user.memberCode) return;

  const fetchTeam = async () => {
    try {
      const res = await axios.get(
        `${Base_url}/api/teammanagement/${user.memberCode}/${user.name}/${user.communityName}`
      );
      if (res.data.success) setTeam(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchTeam();
}, []);


  return (
    <div className="py-8 px-4">
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <div className="mb-4">
                <img
                  src={`${Base_url}/uploads/management/${member.image}`}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h2>
              <p className="text-gray-600 mb-2">{member.title}</p>
              <p className="text-gray-500 text-center text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
