import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "../../apiConfig/api";

const CommunityDropdown = () => {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("");

  useEffect(() => {
    axios
      .get(`${Base_url}/api/community`)
      .then((response) => {
        setCommunities(response.data); // assuming it's an array
      })
      .catch((error) => {
        console.error("Error fetching community data:", error);
      });
  }, []);

  const handleChange = (e) => {
    setSelectedCommunity(e.target.value);
  };

  return (
    <div>
      <label htmlFor="community" className="block font-semibold mb-1">
        Select Community
      </label>
      <select
        id="community"
        value={selectedCommunity}
        onChange={handleChange}
        className="border border-gray-300 rounded p-2 w-full"
      >
        <option value="">-- Select Community --</option>
        {communities.map((community) => (
          <option key={community.communityId} value={community.communityName}>
            {community.communityName}
          </option>
        ))}
      </select>

      {/* Show selected community name (optional) */}
      {selectedCommunity && (
        <p className="mt-2">Selected: {selectedCommunity}</p>
      )}
    </div>
  );
};

export default CommunityDropdown;
