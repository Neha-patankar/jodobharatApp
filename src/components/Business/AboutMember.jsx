// AboutMember.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";
import { Target, Eye, Heart, Sparkles } from "lucide-react";

export const AboutMember = ({ memberCode, memberName, communityName }) => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!memberCode || !memberName || !communityName) return;

    const fetchAbout = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${Base_url}/api/about/${memberCode}/${memberName}/${communityName}`
        );

        if (res.data.success && res.data.data) {
          setAboutData(res.data.data);
        } else {
          console.log("No About data found for this member");
          setAboutData(null);
        }
      } catch (error) {
        console.error("❌ Error fetching About Us:", error);
        setAboutData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, [memberCode, memberName, communityName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="text-purple-500 animate-pulse" size={24} />
          </div>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl border-2 border-red-200">
        <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl">⚠️</span>
        </div>
        <p className="text-red-600 font-semibold text-lg">
          About Us data not configured for this member.
        </p>
      </div>
    );
  }

  const cards = [
    {
      title: "Our Mission",
      value: aboutData.mission,
      icon: Target,
      gradient: "from-blue-500 via-blue-600 to-purple-600",
      bgGradient: "from-blue-50 via-blue-100 to-purple-100",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Our Vision",
      value: aboutData.vision,
      icon: Eye,
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      bgGradient: "from-purple-50 via-purple-100 to-pink-100",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      borderColor: "border-purple-200",
    },
    {
      title: "Our Values",
      value: aboutData.values,
      icon: Target,
      gradient: "from-pink-500 via-pink-600 to-purple-600",
      bgGradient: "from-pink-50 via-pink-100 to-purple-100",
      iconBg: "bg-gradient-to-br from-pink-500 to-pink-600",
      borderColor: "border-pink-200",
    },
  ];

  return (
    <>
      <section className="text-gray-800 py-0 px-0 md:px-0">
        {/* Header with Gradient */}
        <div className="text-center mb-0 relative">
          <h2 className="text-2xl font-bold  text-white mb-4 p-2 rounded bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900">
            {"About Company"}
          </h2>

          <div className="max-w-6xl mx-auto">
            {/* Cards Grid with Beautiful Gradients */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cards.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`${item.title}-${index}`}
                    className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* Gradient Border Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl`}
                    ></div>

                    {/* Card Content */}
                    <div
                      className={`relative bg-gradient-to-br ${item.bgGradient} p-8 rounded-2xl border-2 ${item.borderColor} h-full`}
                    >
                      {/* Icon with Gradient */}
                      <div className="mb-6 flex justify-center">
                        <div
                          className={`w-16 h-16 ${item.iconBg} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                        >
                          <Icon className="text-white" size={32} />
                        </div>
                      </div>

                      {/* Title with Gradient */}
                      <h3
                        className={`text-2xl font-bold mb-4 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent text-center`}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-700 text-center leading-relaxed">
                        {item.value}
                      </p>

                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 w-20 h-20 bg-white/30 rounded-full blur-2xl"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
