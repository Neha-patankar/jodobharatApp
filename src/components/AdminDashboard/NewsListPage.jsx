
// // export default NewsListPage;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Calendar, Clock, Youtube, ArrowLeft, Loader } from "lucide-react";
// import { Base_url } from "../../apiConfig/api";
// import Header from "./Header";

// const NewsListPage = () => {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const fetchNews = async () => {
//     try {
//       const res = await axios.get(`${Base_url}/api/news/category/${category}`);
//       let newsData = res.data;

//       // ✅ Agar API object return karti hai
//       newsData = Array.isArray(newsData) ? newsData : newsData.news || [];

//       // ✅ Filter by user's community
//       const communityNews = newsData.filter(
//         (item) =>
//           item.communityName &&
//           item.communityName.toLowerCase() === userCommunity?.toLowerCase()
//       );

//       setNews(communityNews);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };
//   fetchNews();
// }, [category, userCommunity]);


//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("hi-IN", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getYouTubeVideoId = (url) => {
//     if (!url) return null;
//     const regExp =
//       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
//       {/* Header */}
//       <Header userName="" showFullMenu={false} />

//       {/* Hero Banner */}
//       <div className="relative bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 pt-20 pb-2 overflow-hidden flex flex-col items-center justify-center text-center">
//         {/* Title and count */}
//         <div className="flex flex-col sm:flex-row items-center gap-4">
//           <h1 className="text-xl sm:text-3xl font-bold text-white drop-shadow-lg">
//             {category}
//           </h1>
//           <p className="text-white text-lg sm:text-xl font-bold">
//             ({news.length} समाचार उपलब्ध हैं)
//           </p>
//         </div>
//       </div>

//       {/* Loading State */}
//       {loading && (
//         <div className="container mx-auto px-6 py-20 flex justify-center items-center">
//           <Loader className="w-12 h-12 text-purple-600 animate-spin" />
//         </div>
//       )}

//       {/* News Grid */}
//       {!loading && (
//         <div className="container mx-auto px-6 py-12 -mt-8 relative z-20">
//           {news.length === 0 ? (
//             <div className="text-center py-20">
//               <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto border-t-4 border-purple-900">
//                 <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <Calendar className="w-12 h-12 text-purple-500" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-3">
//                   कोई समाचार नहीं मिला
//                 </h3>
//                 <p className="text-gray-600">
//                   इस श्रेणी में अभी कोई समाचार उपलब्ध नहीं है।
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {news.map((item) => {
//                 const hasImage = item.image;
//                 const hasVideo =
//                   item.videoUrl && getYouTubeVideoId(item.videoUrl);
//                 const hasBoth = hasImage && hasVideo;

//                 return (
//                   <div
//                     key={item._id}
//                     className="rounded-lg text-whiterounded-3xl shadow-lg  border-t-4 border-orange-500"
//                   >
//                     {/* Title */}
//                     <div className="bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900  text-center rounded-lg">
//                       <h3 className="  font-bold text-2xl mb-1 text-white  pt-2">
//                         {item.title}
//                       </h3>

//                       {/* Date */}
//                       <div className="flex items-center gap-2 text-sm text-white mb-3 text-end p-2 ">
//                         <Clock className="w-4 h-4" />
//                         <span className="font-bold">
//                           {formatDate(item.createdAt)}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Media Section */}
//                     <div className="relative overflow-hidden">
//                       {hasBoth ? (
//                         // Both Image and Video - 30% Image, 70% Video
//                         <div className="flex h-64 gap-4">
//                           {/* Image 30% */}
//                           <div className="w-[30%] relative overflow-hidden">
//                             <img
//                               src={`${Base_url}/uploads/news/${item.image}`}
//                               alt={item.title}
//                               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                             />
//                           </div>

//                           {/* Video 70% */}
//                           <div className="w-[70%] relative">
//                             <iframe
//                               className="w-full h-full"
//                               src={`https://www.youtube.com/embed/${getYouTubeVideoId(
//                                 item.videoUrl
//                               )}`}
//                               title="YouTube video player"
//                               frameBorder="0"
//                               allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                               allowFullScreen
//                             ></iframe>
//                           </div>
//                         </div>
//                       ) : hasImage ? (
//                         // Only Image - Full Width
//                         <div className="relative">
//                           <img
//                             src={`${Base_url}/uploads/news/${item.image}`}
//                             alt={item.title}
//                             className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent opacity-0 "></div>
//                         </div>
//                       ) : hasVideo ? (
//                         // Only Video - Full Width
//                         <div className="relative h-64">
//                           <iframe
//                             className="w-full h-full"
//                             src={`https://www.youtube.com/embed/${getYouTubeVideoId(
//                               item.videoUrl
//                             )}`}
//                             title="YouTube video player"
//                             frameBorder="0"
//                             allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                           ></iframe>
//                         </div>
//                       ) : (
//                         // No Media - Gradient Placeholder
//                         <div className="w-full h-64 bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 flex items-center justify-center">
//                           <Calendar className="w-20 h-20 text-white opacity-50" />
//                         </div>
//                       )}

//                       {/* Video Badge */}
//                       {hasVideo && (
//                         <div className="absolute top-4 right-4 bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
//                           <Youtube className="w-4 h-4" />
//                           <span className="text-xs font-semibold">Video</span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Content Section */}
//                     <div className="p-6 bg-gradient-to-br from-white to-purple-50">
//                       {/* Description */}
//                       <p className="text-black font-bold  mb-2">
//                         {item.description}
//                       </p>

//                       {/* Read More Button */}
//                       <p className="mt-0 text-center w-full bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-white py-2 rounded-xl font-bold ">
//                         {item.imageName}
//                       </p>
//                     </div>

//                     {/* Bottom Accent */}
//                     <div className="h-2 bg-orange-500"></div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewsListPage;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, Clock, Youtube, Loader } from "lucide-react";
import { Base_url } from "../../apiConfig/api";
import Header from "./Header";

const NewsListPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Logged-in user
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const userCommunity = loggedUser?.community;

  // ✅ Fetch news and filter by category + user community
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${Base_url}/api/news/category/${category}`);
        let newsData = Array.isArray(res.data) ? res.data : res.data.news || [];

        // Filter news by user's community if available
        if (userCommunity) {
          newsData = newsData.filter(
            (item) =>
              item.communityName &&
              item.communityName.toLowerCase() === userCommunity.toLowerCase()
          );
        }

        setNews(newsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setLoading(false);
      }
    };
    fetchNews();
  }, [category, userCommunity]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <Header userName={loggedUser?.name || ""} showFullMenu={false} />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 pt-20 pb-2 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <h1 className="text-xl sm:text-3xl font-bold text-white drop-shadow-lg">
            {category}
          </h1>
          <p className="text-white text-lg sm:text-xl font-bold">
            ({news.length} समाचार उपलब्ध हैं)
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="container mx-auto px-6 py-20 flex justify-center items-center">
          <Loader className="w-12 h-12 text-purple-600 animate-spin" />
        </div>
      )}

      {/* News Grid */}
      {!loading && (
        <div className="container mx-auto px-6 py-12 -mt-8 relative z-20">
          {news.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto border-t-4 border-purple-900">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-12 h-12 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  कोई समाचार नहीं मिला
                </h3>
                <p className="text-gray-600">
                  इस श्रेणी में अभी कोई समाचार उपलब्ध नहीं है।
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => {
                const hasImage = item.image;
                const hasVideo = item.videoUrl && getYouTubeVideoId(item.videoUrl);
                const hasBoth = hasImage && hasVideo;

                return (
                  <div
                    key={item._id}
                    className="rounded-lg shadow-lg border-t-4 border-orange-500"
                  >
                    {/* Title & Date */}
                    <div className="bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-center rounded-lg">
                      <h3 className="font-bold text-2xl mb-1 text-white pt-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-white mb-3 text-end p-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-bold">{formatDate(item.createdAt)}</span>
                      </div>
                    </div>

                    {/* Media */}
                    <div className="relative overflow-hidden">
                      {hasBoth ? (
                        <div className="flex h-64 gap-4">
                          <div className="w-[30%] relative overflow-hidden">
                            <img
                              src={`${Base_url}/uploads/news/${item.image}`}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="w-[70%] relative">
                            <iframe
                              className="w-full h-full"
                              src={`https://www.youtube.com/embed/${getYouTubeVideoId(item.videoUrl)}`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      ) : hasImage ? (
                        <img
                          src={`${Base_url}/uploads/news/${item.image}`}
                          alt={item.title}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : hasVideo ? (
                        <iframe
                          className="w-full h-64"
                          src={`https://www.youtube.com/embed/${getYouTubeVideoId(item.videoUrl)}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 flex items-center justify-center">
                          <Calendar className="w-20 h-20 text-white opacity-50" />
                        </div>
                      )}

                      {hasVideo && (
                        <div className="absolute top-4 right-4 bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                          <Youtube className="w-4 h-4" />
                          <span className="text-xs font-semibold">Video</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="p-6 bg-gradient-to-br from-white to-purple-50">
                      <p className="text-black font-bold mb-2">{item.description}</p>
                      <p className="mt-0 text-center w-full bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-white py-2 rounded-xl font-bold">
                        {item.imageName}
                      </p>
                    </div>

                    {/* Bottom Accent */}
                    <div className="h-2 bg-orange-500"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsListPage;
