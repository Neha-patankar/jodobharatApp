import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

export const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user) return;

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
        console.error("Error fetching About:", error);
      }
    };

    fetchAbout();
  }, [user]);

  if (!aboutData) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="py-8 px-4 md:px-0 rounded-2xl">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6 text-[#344742]">{aboutData.title}</h2>
        <p className="text-lg leading-7 mb-8">{aboutData.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {[
            { title: "Our Mission", value: aboutData.mission },
            { title: "Our Vision", value: aboutData.vision },
            { title: "Our Values", value: aboutData.values },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold mb-2 text-[#344742]">{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
