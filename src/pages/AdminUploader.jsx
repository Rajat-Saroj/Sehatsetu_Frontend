import React, { useState, useEffect } from 'react';

const AdminUploader = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  // State for fetching data
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]); // The weeks/modules inside the chosen course
  
  // State for form inputs
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null); // 👈 Special state for the actual file

  // UI State
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 1. Fetch all courses on load
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/programs`);
        const data = await response.json();
        if (data.success) setCourses(data.data);
      } catch (error) {
        console.error("Failed to load courses");
      }
    };
    fetchCourses();
  }, [API_URL]);

  // 2. Fetch sections when a specific course is selected!
  useEffect(() => {
    if (!selectedCourseId) return;
    
    const fetchSections = async () => {
      try {
        // Fetching the specific course details to get its sections (courseContent)
        const response = await fetch(`${API_URL}/api/programs/${selectedCourseId}`);
        const data = await response.json();
        if (data.success) {
          // Assuming your backend populates the 'courseContent' array with section objects
          setSections(data.data.courseContent || []); 
        }
      } catch (error) {
        console.error("Failed to load sections");
      }
    };
    fetchSections();
  }, [selectedCourseId, API_URL]);

  // 3. Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  // 4. Handle Upload Submit
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedSectionId || !videoFile || !videoTitle) {
      setMessage({ type: 'error', text: '❌ Please fill all required fields and select a video!' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // 📦 FOR FILES: We MUST use FormData instead of JSON!
      const formData = new FormData();
      formData.append('sectionId', selectedSectionId); // Check backend for exact naming!
      formData.append('title', videoTitle);
      formData.append('description', videoDescription);
      formData.append('video', videoFile); // 👈 'video' is usually what Multer looks for

      // Notice we DO NOT set 'Content-Type': 'application/json' when using FormData!
      // The browser automatically sets the correct multipart boundary for files.
      const response = await fetch(`${API_URL}/api/programs/addSubSection`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: `✅ Video "${videoTitle}" uploaded successfully!` });
        // Reset the form so you can upload the next video
        setVideoTitle('');
        setVideoDescription('');
        setVideoFile(null);
        document.getElementById('videoInput').value = ''; // Clear the file input UI
      } else {
        setMessage({ type: 'error', text: `❌ Upload Failed: ${data.message}` });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({ type: 'error', text: '❌ Server error during upload.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-lg rounded-xl font-sans border-t-4 border-yellow-500">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">🎥 Upload Course Video</h2>
      <p className="text-gray-500 mb-6">Step 3: Add video content to your specific sections.</p>

      {message && (
        <div className={`p-4 mb-6 rounded-lg font-bold ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleUpload} className="flex flex-col gap-5">
        
        {/* 1. SELECT COURSE */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="font-bold text-gray-700">1. Select Target Course</label>
          <select 
            value={selectedCourseId} 
            onChange={(e) => {
              setSelectedCourseId(e.target.value);
              setSelectedSectionId(''); // Reset section when course changes
            }}
            className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          >
            <option value="" disabled>-- Choose a Course --</option>
            {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
          </select>
        </div>

        {/* 2. SELECT SECTION (Only appears after course is chosen) */}
        {selectedCourseId && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="font-bold text-gray-700">2. Select Target Section</label>
            {sections.length === 0 ? (
              <p className="text-red-500 text-sm mt-2">No sections found! Build your curriculum first.</p>
            ) : (
              <select 
                value={selectedSectionId} 
                onChange={(e) => setSelectedSectionId(e.target.value)}
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
                required
              >
                <option value="" disabled>-- Choose a Section --</option>
                {sections.map(sec => <option key={sec._id} value={sec._id}>{sec.sectionName}</option>)}
              </select>
            )}
          </div>
        )}

        {/* 3. VIDEO DETAILS */}
        <div>
          <label className="font-bold text-gray-700">3. Video Title</label>
          <input 
            type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} 
            className="w-full mt-2 p-3 border rounded-md" placeholder="e.g., Introduction to the platform" required 
          />
        </div>

        <div>
          <label className="font-bold text-gray-700">4. Video Description</label>
          <textarea 
            value={videoDescription} onChange={(e) => setVideoDescription(e.target.value)} 
            className="w-full mt-2 p-3 border rounded-md min-h-[80px]" placeholder="What will they learn in this video?" 
          />
        </div>

        {/* 4. THE FILE UPLOAD */}
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:bg-gray-50 transition">
          <label className="font-bold text-gray-700 block mb-2 cursor-pointer">
            📁 Select Video File (MP4)
          </label>
          <input 
            id="videoInput" type="file" accept="video/*" onChange={handleFileChange} 
            className="text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 cursor-pointer" required 
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button 
          type="submit" disabled={loading}
          className={`mt-4 py-4 rounded-lg font-bold text-white text-lg transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700 shadow-md transform hover:-translate-y-1'}`}
        >
          {loading ? '⏳ Uploading Video (Please wait...)' : '🚀 Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default AdminUploader;