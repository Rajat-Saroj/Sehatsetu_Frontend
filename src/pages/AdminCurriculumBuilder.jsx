import React, { useState, useEffect } from 'react';

const AdminCurriculumBuilder = () => {
  // 🌍 PRODUCTION READY: Dynamic API Base URL
  // It will use your Render URL when live, and localhost when you are coding on your laptop!
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  // 1. State for fetching courses for the dropdown
  const [courses, setCourses] = useState([]);
  
  // 2. State for the form data
  const [selectedProgramId, setSelectedProgramId] = useState('');
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  
  // 3. UI State
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 4. Fetch all courses as soon as the page loads!
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // 👈 FIXED: Using dynamic API_URL
        const response = await fetch(`${API_URL}/api/programs`);
        const data = await response.json();
        if (data.success) {
          setCourses(data.data); // Load the courses into the dropdown
        }
      } catch (error) {
        console.error("Failed to load courses:", error);
      }
    };
    fetchCourses();
  }, [API_URL]); // Added API_URL to dependency array (good React practice)

  // 5. Handle Form Submit
  const handleAddSection = async (e) => {
    e.preventDefault();
    
    if (!selectedProgramId) {
      setMessage({ type: 'error', text: '❌ Please select a course first!' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // 👈 FIXED: Using dynamic API_URL
      const response = await fetch(`${API_URL}/api/programs/addSection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionName: sectionTitle, // Matches your backend perfectly!
          description: sectionDescription,
          programId: selectedProgramId 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: `✅ Section "${sectionTitle}" added successfully!` });
        // Clear just the inputs, keep the course selected so you can add Week 2, Week 3 fast!
        setSectionTitle('');
        setSectionDescription('');
      } else {
        setMessage({ type: 'error', text: `❌ Error: ${data.message}` });
      }
    } catch (error) {
      console.error("Failed to add section:", error);
      setMessage({ type: 'error', text: '❌ Server error.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>🏗️ Admin: Curriculum Builder</h2>
      <p>Step 2: Add Sections (Weeks/Modules) to your courses.</p>

      {message && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          borderRadius: '5px'
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleAddSection} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* DROPDOWN TO SELECT THE COURSE */}
        <div style={{ padding: '15px', backgroundColor: '#f4f4f4', borderRadius: '5px' }}>
          <label><strong>1. Select Target Course</strong></label><br/>
          <select 
            value={selectedProgramId} 
            onChange={(e) => setSelectedProgramId(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            required
          >
            <option value="" disabled>-- Choose a Course --</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* INPUTS FOR THE NEW SECTION */}
        <div>
          <label><strong>2. Section Title</strong></label><br/>
          <input 
            type="text" 
            value={sectionTitle} 
            onChange={(e) => setSectionTitle(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
            placeholder="e.g., Week 1: Introduction to Basics"
          />
        </div>

        <div>
          <label><strong>3. Section Description (Optional)</strong></label><br/>
          <textarea 
            value={sectionDescription} 
            onChange={(e) => setSectionDescription(e.target.value)} 
            style={{ width: '100%', padding: '8px', minHeight: '60px' }}
            placeholder="Brief overview of what this section covers..."
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '12px', 
            backgroundColor: loading ? '#ccc' : '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          {loading ? 'Adding Section...' : '➕ Add Section'}
        </button>
      </form>
    </div>
  );
};

export default AdminCurriculumBuilder;