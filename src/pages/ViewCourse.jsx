import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaPlayCircle, FaArrowLeft, FaBars, FaTimes } from 'react-icons/fa';

const ViewCourse = () => {
  const { id } = useParams(); // This is the programId from the URL
  const navigate = useNavigate();
  
  // Get logged in user to check permissions
  const { user } = useSelector((state) => state.auth);

  const [courseData, setCourseData] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    // Security check: Make sure they are logged in
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchFullCourse = async () => {
      try {
        // We use the DEEP POPULATE endpoint we verified earlier!
        const response = await axios.post(`${API_URL}/api/programs/getFullProgramDetails`, {
          programId: id
        });

        if (response.data.success) {
          const course = response.data.data;
          setCourseData(course);
          
          // Auto-play the very first video in the first section if it exists
          if (course.courseContent?.length > 0 && course.courseContent[0].subSection?.length > 0) {
            setActiveVideo(course.courseContent[0].subSection[0]);
          }
        } else {
          setError('Failed to load course details.');
        }
      } catch (err) {
        console.error(err);
        setError('You might not have access, or the course does not exist.');
      } finally {
        setLoading(false);
      }
    };

    fetchFullCourse();
  }, [id, user, navigate, API_URL]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-green-700 animate-pulse bg-gray-900 text-white">Loading Classroom...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-red-500 bg-gray-900 p-4 text-center">{error}</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans overflow-hidden">
      
      {/* 🟢 TOP NAVBAR FOR CLASSROOM */}
      <nav className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
            <FaArrowLeft /> Dashboard
          </Link>
          <h1 className="text-xl font-bold hidden md:block text-gray-200 truncate max-w-md">
            {courseData?.title}
          </h1>
        </div>
        
        {/* Mobile Sidebar Toggle */}
        <button 
          className="md:hidden text-2xl text-gray-400 hover:text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* 🎥 LEFT SIDE: VIDEO PLAYER */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:mr-80' : ''}`}>
          <div className="flex-1 bg-black flex items-center justify-center relative">
            {activeVideo ? (
              <video 
                key={activeVideo.videoUrl} // Force re-render when video changes
                controls 
                autoPlay 
                controlsList="nodownload" // Basic protection against right-click save
                className="w-full h-full max-h-[70vh] object-contain"
                src={activeVideo.videoUrl} 
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="text-gray-500 text-lg flex flex-col items-center">
                <FaPlayCircle className="text-6xl mb-4 opacity-50" />
                <p>No video selected or uploaded yet.</p>
              </div>
            )}
          </div>

          {/* Video Info Panel */}
          <div className="h-1/3 bg-gray-900 p-6 md:p-10 overflow-y-auto border-t border-gray-800">
            <h2 className="text-3xl font-extrabold mb-3 text-white">
              {activeVideo ? activeVideo.title : "Course Introduction"}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-4xl">
              {activeVideo ? activeVideo.description : "Select a lesson from the curriculum menu to start learning."}
            </p>
          </div>
        </div>

        {/* 📚 RIGHT SIDE: CURRICULUM SIDEBAR */}
        <div className={`absolute top-0 right-0 h-full w-80 bg-gray-800 border-l border-gray-700 shadow-2xl transition-transform duration-300 ease-in-out z-10 flex flex-col ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="p-5 border-b border-gray-700 bg-gray-900 sticky top-0 z-10">
            <h3 className="font-bold text-lg text-white">Course Content</h3>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {courseData?.courseContent?.length > 0 ? (
              courseData.courseContent.map((section, index) => (
                <div key={section._id} className="border-b border-gray-700/50">
                  {/* Section Header */}
                  <div className="bg-gray-800 p-4 font-bold text-gray-200">
                    Section {index + 1}: {section.sectionName}
                  </div>
                  
                  {/* Section Videos */}
                  <div className="bg-gray-800/50 flex flex-col">
                    {section.subSection?.length > 0 ? (
                      section.subSection.map((video, vIndex) => (
                        <button
                          key={video._id}
                          onClick={() => setActiveVideo(video)}
                          className={`flex items-start text-left p-4 hover:bg-gray-700 transition gap-3 group ${activeVideo?._id === video._id ? 'bg-gray-700 border-l-4 border-green-500' : 'border-l-4 border-transparent'}`}
                        >
                          <FaPlayCircle className={`mt-1 flex-shrink-0 ${activeVideo?._id === video._id ? 'text-green-500' : 'text-gray-500 group-hover:text-white'}`} />
                          <div>
                            <p className={`font-semibold ${activeVideo?._id === video._id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                              {vIndex + 1}. {video.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{video.description}</p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="p-4 text-sm text-gray-500 italic">No videos in this section yet.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>The instructor hasn't added any content yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewCourse;