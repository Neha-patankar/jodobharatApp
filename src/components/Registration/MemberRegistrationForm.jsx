import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TermsAndConditionsModal from "./TermsConditionsModal";
import ImageCropperModal from "./ImageCropperModal";
import { Base_url } from "../../apiConfig/api";
import "../style.css";

const MemberRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    loginMobile: "",
    whatsapp: "",
    fatherName: "",
    motherName: "",
    communityName: "",
    dob: "",
    email: "",
    gender: "",
    bloodGroup: "",
    permanentAddress: "",
    currentAddress: "",
    city: "",
    pincode: "",
    occupation: "",
    education: "",
    image: null,
    familyDetails: [],
  });

  const [familyMember, setFamilyMember] = useState({
    name: "",
    age: "",
    dob: "",
    gender: "",
    relationship: "",
    maritalStatus: "",
    mobile: "",
    bloodGroup: "",
  });

  const [communities, setCommunities] = useState([]);
  const [mobileError, setMobileError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Image Cropping States
  const [imageToCrop, setImageToCrop] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  // Dynamic Community Fetch
  const fetchCommunities = useCallback(async () => {
    try {
      const res = await axios.get(`${Base_url}/api/community`);
      setCommunities(res.data);
    } catch (err) {
      console.error("Failed to fetch communities:", err);
    }
  }, []);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  // Mobile Duplication Check
  // const checkMobileDuplication = useCallback(async (mobile) => {
  //   if (mobile.length !== 10) {
  //     setMobileError("मोबाइल नंबर 10 अंकों का होना चाहिए।");
  //     return;
  //   }
  //   setMobileError("जाँच हो रही है...");

  //   try {
  //     const res = await axios.post(`${Base_url}/api/memberRegistration/checkMobile`, { mobile });

  //     if (res.data.exists) {
  //       setMobileError("⚠️ यह मोबाइल नंबर पहले से ही पंजीकृत है।");
  //     } else {
  //       setMobileError("");
  //     }
  //   } catch (err) {
  //     console.error("Mobile check failed:", err);
  //     setMobileError("");
  //   }
  // }, []);
  // Mobile Duplication Check
  const checkMobileDuplication = useCallback(async (mobile, communityName) => {
    if (mobile.length !== 10) {
      setMobileError("मोबाइल नंबर 10 अंकों का होना चाहिए।");
      return;
    }
    if (!communityName) {
      setMobileError("कृपया पहले समुदाय चुनें।");
      return;
    }

    setMobileError("जाँच हो रही है...");

    try {
      const res = await axios.post(
        `${Base_url}/api/memberRegistration/checkMobile`,
        {
          loginMobile: mobile,
          communityName: communityName,
        }
      );

      if (res.data.exists) {
        setMobileError(
          "⚠️ यह मोबाइल नंबर पहले से ही इस समुदाय में पंजीकृत है।"
        );
      } else {
        setMobileError("");
      }
    } catch (err) {
      console.error("Mobile check failed:", err);
      setMobileError("");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        setImageToCrop(fileURL);
        setIsCropperOpen(true);
      }
      return;
    }

    if (name === "loginMobile") {
      const cleanedValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: cleanedValue });
      if (cleanedValue.length === 10) {
        checkMobileDuplication(cleanedValue, formData.communityName);
      } else if (cleanedValue.length > 0) {
        setMobileError("मोबाइल नंबर 10 अंकों का होना चाहिए।");
      } else {
        setMobileError("");
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Image Crop Handler
  const handleCropComplete = (croppedFile) => {
    setFormData({ ...formData, image: croppedFile });
    setImagePreview(URL.createObjectURL(croppedFile));
    setImageToCrop(null);
    setIsCropperOpen(false);
  };

  const handleFamilyChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue =
      name === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setFamilyMember({ ...familyMember, [name]: cleanedValue });
  };

  const addFamilyMember = () => {
    if (familyMember.name && familyMember.relationship) {
      setFormData({
        ...formData,
        familyDetails: [...formData.familyDetails, familyMember],
      });
      setFamilyMember({
        name: "",
        age: "",
        dob: "",
        gender: "",
        relationship: "",
        maritalStatus: "",
        mobile: "",
        bloodGroup: "",
      });
    } else {
      alert("कृपया नाम और रिश्ता भरें");
    }
  };

  const removeFamilyMember = (index) => {
    const updated = formData.familyDetails.filter((_, i) => i !== index);
    setFormData({ ...formData, familyDetails: updated });
  };

  // ✅ ERROR FIX: Re-defining handleAcceptTerms
  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setIsModalOpen(false);
  };

  // ✅ The previously fixed handleToggleTermsModal
  const handleToggleTermsModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("कृपया सबमिट करने से पहले नियम और शर्तें स्वीकार करें।");
      return;
    }

    if (formData.loginMobile.length !== 10) {
      setMobileError("लॉगिन मोबाइल नंबर 10 अंकों का होना अनिवार्य है।");
      return;
    }

    if (mobileError && mobileError !== "जाँच हो रही है...") {
      alert(mobileError);
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      if (key === "familyDetails") {
        data.append(key, JSON.stringify(formData[key]));
      } else if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      const res = await axios.post(`${Base_url}/api/memberRegistration`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Member registered successfully!");
      console.log(res.data);

      setFormData({
        name: "",
        loginMobile: "",
        whatsapp: "",
        fatherName: "",
        motherName: "",
        communityName: "",
        dob: "",
        email: "",
        gender: "",
        bloodGroup: "",
        permanentAddress: "",
        currentAddress: "",
        city: "",
        pincode: "",
        occupation: "",
        education: "",
        image: null,
        familyDetails: [],
      });
      setImagePreview(null);
      setTermsAccepted(false);
    } catch (error) {
      console.error(error);
      alert("Error registering member");
    }
  };
  return (
    <>
      <h2 className=" bg-header text-xl font-bold mb-0 text-center text-white py-4 border-b-4 border-purple-950 pb-4">
        सदस्य रजिस्ट्रेशन फॉर्म
      </h2>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 via-yellow-500 to-orange-600  p-6">
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 right-4 bg-orange-400 border-4 font-bold text-md border-blue-900 rounded-full p-2 text-white hover:text-red-600 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <X size={20} />
        </button>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-xl p-0 w-full max-w-5xl"
        >
          {/* Personal Details Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <span className="bg-heading w-full text-white rounded-tl-lg rounded-tr-lg   h-8 flex items-center justify-center py-0">
                व्यक्तिगत विवरण
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  पूरा नाम *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="पूरा नाम दर्ज करें"
                  onChange={handleChange}
                  value={formData.name}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  लॉगिन मोबाइल *
                </label>
                <input
                  type="text"
                  name="loginMobile"
                  placeholder="10 अंकों का मोबाइल नंबर"
                  onBlur={(e) => checkMobileDuplication(e.target.value)}
                  onChange={handleChange}
                  value={formData.loginMobile}
                  className={`border rounded-lg p-3 w-full focus:ring-2 focus:border-transparent ${
                    mobileError.includes("पंजीकृत") ||
                    mobileError.includes("अंकों")
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500"
                  }`}
                  required
                  maxLength="10"
                  pattern="\d{10}"
                  title="केवल 10 अंक दर्ज करें"
                />
                {mobileError && (
                  <p className="text-red-500 text-xs mt-1">{mobileError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  व्हाट्सएप नंबर
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  placeholder="व्हाट्सएप नंबर"
                  onChange={handleChange}
                  value={formData.whatsapp}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  maxLength="10"
                />
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  ईमेल
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  onChange={handleChange}
                  value={formData.email}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  पिता का नाम
                </label>
                <input
                  type="text"
                  name="fatherName"
                  placeholder="पिता का नाम"
                  onChange={handleChange}
                  value={formData.fatherName}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  माता का नाम
                </label>
                <input
                  type="text"
                  name="motherName"
                  placeholder="माता का नाम"
                  onChange={handleChange}
                  value={formData.motherName}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  जन्म तिथि
                </label>
                <input
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  value={formData.dob}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  लिंग
                </label>
                <select
                  name="gender"
                  onChange={handleChange}
                  value={formData.gender}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">लिंग चुनें</option>
                  <option value="male">पुरुष</option>
                  <option value="female">महिला</option>
                  <option value="other">अन्य</option>
                </select>
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  ब्लड ग्रुप
                </label>
                <select
                  name="bloodGroup"
                  onChange={handleChange}
                  value={formData.bloodGroup}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">ब्लड ग्रुप चुनें</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              {/* समुदाय ड्रॉपडाउन Dynamic */}
              <div>
                <label className="block text-sm text-black mb-1 font-bold">
                  समुदाय का नाम
                </label>
                <select
                  name="communityName"
                  onChange={(e) => {
                    const selectedCommunity = communities.find(
                      (c) => c._id === e.target.value
                    );
                    if (selectedCommunity) {
                      const updatedForm = {
                        ...formData,
                        communityName: selectedCommunity.communityName,
                        communityId: selectedCommunity.communityId,
                      };
                      setFormData(updatedForm);

                      // ✅ Re-check mobile duplication if mobile is already entered
                      if (updatedForm.loginMobile.length === 10) {
                        checkMobileDuplication(
                          updatedForm.loginMobile,
                          updatedForm.communityName
                        );
                      }
                    }
                  }}
                  value={
                    communities.find(
                      (c) => c.communityId === formData.communityId
                    )?._id || ""
                  }
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">समुदाय चुनें</option>

                  {communities.length > 0 ? (
                    communities.map((community) => (
                      <option key={community._id} value={community._id}>
                        {community.communityName} ({community.communityId})
                      </option>
                    ))
                  ) : (
                    <option disabled>डेटा लोड हो रहा है...</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  शहर
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="शहर का नाम"
                  onChange={handleChange}
                  value={formData.city}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  पिनकोड
                </label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="6 अंकों का पिनकोड"
                  onChange={handleChange}
                  value={formData.pincode}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  maxLength="6"
                />
              </div>

              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  {" "}
                  Occupation Type / व्यवसाय
                </label>

                <select
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Occupation</option>
                  <option value="Family Business">Family Business</option>
                  <option value="Private Job">Private Job</option>
                  <option value="Government Job">Government Job</option>
                  <option value="Housewife">Housewife</option>
                  <option value="Lawyer">Lawyer</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Chartered Accountant">
                    Chartered Accountant
                  </option>
                  <option value="Software Engineer"> Software Engineer</option>
                  <option value="Engineer"> Engineer</option>
                  <option value="Company Secretary">Company Secretary</option>
                  <option value="Army Person">Army Person</option>
                  <option value="Police Service">Police Service</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="Self Business">Self Business</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Professor">Professor</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  शिक्षा
                </label>
                <input
                  type="text"
                  name="education"
                  placeholder="शैक्षणिक योग्यता"
                  onChange={handleChange}
                  value={formData.education}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Address fields */}
              <div className="md:col-span-2 mt-4">
                <label className="block text-sm  text-black mb-1 font-bold">
                  स्थायी पता
                </label>
                <textarea
                  name="permanentAddress"
                  placeholder="स्थायी पता दर्ज करें"
                  onChange={handleChange}
                  value={formData.permanentAddress}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows="2"
                ></textarea>
              </div>
              <div className="md:col-span-2 mt-4">
                <label className="block text-sm  text-black mb-1 font-bold">
                  वर्तमान पता
                </label>
                <textarea
                  name="currentAddress"
                  placeholder="वर्तमान पता दर्ज करें"
                  onChange={handleChange}
                  value={formData.currentAddress}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows="2"
                ></textarea>
              </div>

              {/* इमेज अपलोड और प्रीव्यू */}
              <div className="md:col-span-2 mt-4 flex gap-4 items-end">
                <div className="w-full">
                  <label className="block text-sm  text-black mb-1 font-bold">
                    फोटो अपलोड करें (क्रॉपिंग के लिए टूल का उपयोग करें)
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  {formData.image && (
                    <p className="text-xs mt-1 text-green-600">
                      ✅ फोटो सफलतापूर्वक अपलोड और क्रॉप की गई।
                    </p>
                  )}
                </div>
                {imagePreview && (
                  <div className="flex-shrink-0">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      प्रीव्यू
                    </p>
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-20 h-20 object-cover rounded-full border-2 border-orange-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Family Details Section */}
          <div className="mb-8 bg-orange-50 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <span className="bg-heading w-full text-white rounded-lg  h-8 flex items-center justify-center mr-3">
                परिवार का विवरण
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  नाम *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="परिवार के सदस्य का नाम"
                  value={familyMember.name}
                  onChange={handleFamilyChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  रिश्ता *
                </label>
                <select
                  name="relationship"
                  value={familyMember.relationship}
                  onChange={handleFamilyChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">रिश्ता चुनें</option>
                  <option value="पत्नी">पत्नी</option>
                  <option value="पति">पति</option>
                  <option value="बेटा">बेटा</option>
                  <option value="बेटी">बेटी</option>
                  <option value="भाई">भाई</option>
                  <option value="बहन">बहन</option>
                  <option value="दादा">दादा</option>
                  <option value="दादी">दादी</option>
                  <option value="नाना">नाना</option>
                  <option value="नानी">नानी</option>
                  <option value="अन्य">अन्य</option>
                </select>
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  उम्र
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="उम्र"
                  value={familyMember.age}
                  onChange={handleFamilyChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  जन्म तिथि
                </label>
                <input
                  type="date"
                  name="dob"
                  value={familyMember.dob}
                  onChange={handleFamilyChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  लिंग
                </label>
                <select
                  name="gender"
                  value={familyMember.gender}
                  onChange={handleFamilyChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">लिंग चुनें</option>
                  <option value="male">पुरुष</option>
                  <option value="female">महिला</option>
                </select>
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  वैवाहिक स्थिति
                </label>
                <select
                  name="maritalStatus"
                  value={familyMember.maritalStatus}
                  onChange={handleFamilyChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">स्थिति चुनें</option>
                  <option value="अविवाहित">अविवाहित</option>
                  <option value="विवाहित">विवाहित</option>
                </select>
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  मोबाइल नंबर
                </label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="मोबाइल नंबर"
                  value={familyMember.mobile}
                  onChange={handleFamilyChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  maxLength="10"
                />
              </div>
              <div>
                <label className="block text-sm  text-black mb-1 font-bold">
                  ब्लड ग्रुप
                </label>
                <select
                  name="bloodGroup"
                  value={familyMember.bloodGroup}
                  onChange={handleFamilyChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">ब्लड ग्रुप चुनें</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={addFamilyMember}
              className="bg-header   font-bold text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition flex items-center gap-2 shadow-md"
            >
              <Plus size={20} />
              परिवार के सदस्य जोड़ें
            </button>

            {/* Display Added Family Members */}
            {formData.familyDetails.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 mb-3">
                  जोड़े गए परिवार के सदस्य:
                </h4>
                <div className="space-y-3">
                  {formData.familyDetails.map((member, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {member.relationship} |{" "}
                          {member.age ? `${member.age} वर्ष` : ""} |{" "}
                          {member.gender} | {member.maritalStatus}
                        </p>
                        {member.mobile && (
                          <p className="text-sm text-gray-600">
                            मोबाइल: {member.mobile}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFamilyMember(index)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* नियम और शर्तें चेकबॉक्स */}
          <div className="flex items-start mb-6 p-8">
            <input
              type="checkbox"
              id="termsCheck"
              checked={termsAccepted}
              onChange={handleToggleTermsModal}
              className="mt-1 h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <label
              htmlFor="termsCheck"
              className="ml-3 block text-sm  text-black mb-1 font-bold cursor-pointer"
              onClick={handleToggleTermsModal}
            >
              मैंने{" "}
              <span className="text-blue-600 hover:text-blue-800 font-bold underline">
                नियम और शर्तें
              </span>{" "}
              पढ़ ली हैं और मैं सहमत हूँ।
            </label>
          </div>

          <button
            type="submit"
            disabled={
              !termsAccepted ||
              mobileError.includes("पंजीकृत") ||
              (formData.loginMobile.length !== 10 &&
                formData.loginMobile.length > 0) ||
              mobileError === "जाँच हो रही है..."
            }
            className={`px-8 py-3 rounded-b-xl text-lg font-semibold w-full shadow-lg transition ${
              termsAccepted &&
              formData.loginMobile.length === 10 &&
              !mobileError.includes("पंजीकृत")
                ? "bg-header w-full text-white hover:from-orange-600 hover:to-orange-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            {mobileError === "जाँच हो रही है..."
              ? "जाँच हो रही है... प्रतीक्षा करें"
              : "सबमिट करें"}
          </button>
        </form>

        {/* नियम और शर्तें मोडल */}
        <TermsAndConditionsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAccept={handleAcceptTerms}
        />

        {/* इमेज क्रॉपिंग मोडल */}
        {isCropperOpen && (
          <ImageCropperModal
            imageSrc={imageToCrop}
            onClose={() => setIsCropperOpen(false)}
            onCropComplete={handleCropComplete}
          />
        )}
      </div>
    </>
  );
};

export default MemberRegistrationForm;
