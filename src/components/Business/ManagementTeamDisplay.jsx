// ManagementTeamDisplay.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_url } from '../../apiConfig/api';
import { Users, Award, Briefcase, Sparkles, Linkedin, Mail } from 'lucide-react';

export default function ManagementTeamDisplay({ memberCode, memberName, communityName }) {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!memberCode || !memberName || !communityName) return;

    const fetchTeam = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${Base_url}/api/teammanagement/${memberCode}/${memberName}/${communityName}`
        );
        if (res.data.success) setTeam(res.data.data);
      } catch (err) {
        console.error(err);
        setTeam([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [memberCode, memberName, communityName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Users className="text-blue-500 animate-pulse" size={24} />
          </div>
        </div>
      </div>
    );
  }

  if (team.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl border-2 border-purple-200">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Users className="text-purple-600" size={40} />
        </div>
        <p className="text-purple-700 font-semibold text-lg">Management team details are not available for this member.</p>
      </div>
    );
  }

  const gradients = [
    {
      card: "from-blue-500 to-blue-600",
      bg: "from-blue-50 to-blue-100",
      border: "border-blue-900",
      hover: "group-hover:from-blue-900 group-hover:to-purple-900"
    },
    {
      card: "from-purple-500 to-purple-600",
      bg: "from-purple-50 to-purple-100",
      border: "border-purple-900",
      hover: "group-hover:from-purple-600 group-hover:to-pink-600"
    },
    {
      card: "from-pink-500 to-pink-600",
      bg: "from-pink-50 to-pink-100",
      border: "border-pink-900",
      hover: "group-hover:from-pink-600 group-hover:to-blue-600"
    },
    {
      card: "from-indigo-500 to-indigo-600",
      bg: "from-indigo-50 to-indigo-900",
      border: "border-indigo-900 ",
      hover: "group-hover:from-indigo-600 group-hover:to-purple-600"
    }
  ];

  return (
    <div className="py-0 px-0">
      {/* Header with Gradient - UPDATED */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold  text-white mb-4 p-2 rounded bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900">
           
            <span>Management Team</span>
          </h1>
          <p className="text-gray-600 text-lg">Meet the brilliant minds behind our success</p>
         
        </div>
      <div className="max-w-6xl mx-auto">
        
      

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => {
            const gradient = gradients[index % gradients.length];
            
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                {/* Gradient Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient.card} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-2xl -z-10`}></div>
                
                {/* Card Content */}
                <div className={`relative bg-gradient-to-br ${gradient.bg} rounded-3xl border-2 ${gradient.border} overflow-hidden h-full`}>
                  
                  {/* Top Decorative Gradient Bar */}
                  <div className={`h-2 bg-gradient-to-r ${gradient.card} ${gradient.hover} transition-all duration-500`}></div>
                  
                  <div className="p-6 flex flex-col items-center">
                    
                    {/* Image Container with Gradient Border */}
                    <div className="relative mb-6 group/img">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient.card} rounded-full blur-xl opacity-50 group-hover/img:opacity-100 transition-opacity duration-500`}></div>
                      <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${gradient.card} p-1 shadow-xl transform group-hover:scale-110 transition-all duration-500`}>
                        <img
                          src={`${Base_url}/uploads/management/${member.image}`}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover border-4 border-white"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/128/128';
                          }}
                        />
                      </div>
                      {/* Status Badge */}
                      <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg">
                        <Award className="text-white p-1" size={20} />
                      </div>
                    </div>

                    {/* Name with Gradient */}
                    <h2 className={`text-xl font-bold mb-2 text-center bg-gradient-to-r ${gradient.card} bg-clip-text text-transparent`}>
                      {member.name}
                    </h2>

                    {/* Title with Icon */}
                    <div className="flex items-center gap-2 mb-4">
                     <Briefcase className="text-gray-500" size={16} />
                      <p className="text-gray-600 font-medium text-center">{member.title}</p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-center text-sm leading-relaxed mb-6">
                      {member.description}
                    </p>

               

                  </div>

               
                  
                  {/* Sparkle Effect */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="text-yellow-400 animate-pulse" size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

     

      </div>
    </div>
  );
}