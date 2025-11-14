import React, { useState } from "react";
import Footer from "./Footer";

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    { 
      title: "बिजनेस प्रोफाइल", 
      img: "/buttons/businessprofile.png",
      message: "अपने व्यवसाय की जानकारी साझा करें और समुदाय में अपनी पहचान बनाएं। अपने उत्पादों और सेवाओं को प्रदर्शित करें।",
      icon: "💼"
    },
    { 
      title: "गतिविधियाँ कैलेंडर", 
      img: "/buttons/gatividhiya.png",
      message: "आगामी सामाजिक कार्यक्रमों, त्योहारों और समारोहों की जानकारी प्राप्त करें। कभी कोई महत्वपूर्ण कार्यक्रम न चूकें।",
      icon: "📅"
    },
    { 
      title: "निमंत्रण", 
      img: "/buttons/invitations.png",
      message: "शादी, जन्मदिन और अन्य विशेष अवसरों के डिजिटल निमंत्रण भेजें और प्राप्त करें। परंपरा को डिजिटल बनाएं।",
      icon: "💌"
    },
    { 
      title: "नौकरी", 
      img: "/buttons/jobs.png",
      message: "समुदाय में रोजगार के अवसर खोजें और प्रदान करें। अपने करियर को नई दिशा दें।",
      icon: "💼"
    },
    { 
      title: "मेंबर्स", 
      img: "/buttons/members.png",
      message: "समुदाय के सभी सदस्यों से जुड़ें। अपने परिवार और दोस्तों को खोजें और नए रिश्ते बनाएं।",
      icon: "👥"
    },
    { 
      title: "समाज सेवा", 
      img: "/buttons/samajsewa.png",
      message: "सामाजिक कार्यों में योगदान दें और समुदाय की सेवा करें। एक साथ मिलकर समाज को बेहतर बनाएं।",
      icon: "🤝"
    },
    { 
      title: "शोक समाचार", 
      img: "/buttons/shoksamachar.png",
      message: "समुदाय के सदस्यों के निधन की सूचना साझा करें और शोक संवेदना व्यक्त करें। कठिन समय में एक साथ खड़े रहें।",
      icon: "🕯️"
    },
    { 
      title: "सुझाव", 
      img: "/buttons/complaints.png",
      message: "अपने विचार और सुझाव साझा करें। समुदाय को बेहतर बनाने में अपना योगदान दें।",
      icon: "💡"
    },
    { 
      title: "उपलब्धिया", 
      img: "/buttons/achievements.png",
      message: "समुदाय के सदस्यों की उपलब्धियों और सफलताओं को celebrate करें। प्रेरणा का स्रोत बनें।",
      icon: "🏆"
    },
    { 
      title: "विवाह रिश्ते", 
      img: "/buttons/rishtey.png",
      message: "अपने परिवार के लिए उपयुक्त जीवनसाथी खोजें। विश्वसनीय और सुरक्षित matrimonial सेवा।",
      icon: "💑"
    },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => setSelectedCard(null), 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-500 border-4 border-blue-900">
      {/* Header */}
      <div className="relative bg-white shadow-lg">
        <div className="container mx-auto px-4 py-1 flex flex-col items-center">
          <img
            src="/buttons/jodobharatogo.png"
            alt="Jodo Bharat Logo"
            className="w-36 sm:w-44 md:w-52 mb-0 drop-shadow-md"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-0 py-0">
        {/* Welcome Text */}
        <div className="text-center mb-6 md:mb-10 bg-gradient-to-t bg-blue-900 via-blue-700 to-blue-900 p-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg mb-2">
            स्वागत है जोड़ो भारत में
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-semibold text-white">
            समुदाय को जोड़ने का एक डिजिटल माध्यम
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-0 sm:gap-0 max-w-3xl mx-auto mb-0">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(card)}
              className=" "
            >
              <img
                src={card.img}
                alt={card.title}
                className=" object-contain mb-0"
              />
           
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex  sm:flex-row justify-center items-center gap-4 mb-2">
          <a href="/memberregistration" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold text-sm sm:text-base border-2 border-orange-400">
              नया रजिस्ट्रेशन करे
            </button>
          </a>

          <a href="/memberlogin" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold text-sm sm:text-base border-2 border-orange-400">
              लॉगिन करे
            </button>
          </a>
        </div>
      </div>

      {/* Footer */}
     <Footer/>

      {/* Popup Modal */}
      {showPopup && selectedCard && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn"
          onClick={closePopup}
        >
          <div 
            className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative animate-slideUp border-4 border-orange-400"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute -top-3 -right-3 bg-gradient-to-br from-red-500 to-red-600 text-white w-10 h-10 rounded-full shadow-lg hover:scale-110 hover:rotate-90 transition-all duration-300 font-bold text-xl flex items-center justify-center border-2 border-white"
            >
              ✕
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-orange-400 to-yellow-500 w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg">
                {selectedCard.icon}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              {selectedCard.title}
            </h2>

            {/* Decorative Line */}
            <div className="flex justify-center mb-4">
              <div className="h-1 w-24 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-400 rounded-full"></div>
            </div>

            {/* Message */}
            <p className="text-gray-700 text-center text-sm sm:text-base leading-relaxed mb-6 px-2">
              {selectedCard.message}
            </p>

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                onClick={closePopup}
                className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-orange-600"
              >
                समझ गया ✓
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;