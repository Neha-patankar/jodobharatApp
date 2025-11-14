



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

export const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user || !user.name || !user.communityName || !user.memberCode) {
      console.log("⚠️ User info missing in localStorage:", user);
      return;
    }

    const fetchAbout = async () => {
      try {
        const res = await axios.get(
          
          `${Base_url}/api/about/${user.memberCode}/${user.name}/${user.communityName}`
        );

        if (res.data.success) {
          setAboutData(res.data.data);
        } else {
          console.log("No About data found for this member");
        }
      } catch (error) {
        console.error("❌ Error fetching About Us:", error);
      }
    };

    fetchAbout();
  }, []);

  if (!aboutData) return <p className="text-center">Loading...</p>;

  return (
    <section className="text-gray-800 py-0 px-0 md:px-0 rounded-2xl">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6 text-[#344742]">{aboutData.title}</h2>
        <p className="text-lg leading-7 mb-8">{aboutData.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {[
            { title: "Our Mission", value: aboutData.mission },
            { title: "Our Vision", value: aboutData.vision },
            { title: "Our Values", value: aboutData.values },
          ].map((item, index) => (
            <div key={`${item.title}-${index}`} className="bg-white p-6 rounded-lg shadow-2xl">
              <h3 className="text-xl font-bold mb-2 text-[#344742]">{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
