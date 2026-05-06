import React, { useState } from 'react';

const CreateCourse = () => {
  // 1. The State to hold our form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    level: 'Beginner', // Default value
    duration: '',
    tags: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 2. Handle typing in the input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Handle the Form Submit (The Magic Button)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Calling your brand new backend route!
      const response = await fetch('http://localhost:5000/api/programs/createCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: '✅ Course successfully created in the database!' });
        // Clear the form after success
        setFormData({ title: '', description: '', price: '', level: 'Beginner', duration: '', tags: '' });
      } else {
        setMessage({ type: 'error', text: `❌ Error: ${data.message}` });
      }
    } catch (error) {
      console.error("Failed to create course:", error);
      setMessage({ type: 'error', text: '❌ Server error. Is your backend running?' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>🛠️ Admin: Create New Course</h2>
      <p>Step 1: Create the course shell in the database.</p>

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

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label><strong>Course Title *</strong></label><br/>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
            placeholder="e.g., Advanced React Patterns"
          />
        </div>

        <div>
          <label><strong>Description *</strong></label><br/>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', minHeight: '80px' }}
            placeholder="What will students learn?"
          />
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label><strong>Price (₹) *</strong></label><br/>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '8px' }}
              placeholder="e.g., 1999"
            />
          </div>

          <div style={{ flex: 1 }}>
            <label><strong>Difficulty Level</strong></label><br/>
            <select 
              name="level" 
              value={formData.level} 
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label><strong>Duration</strong></label><br/>
            <input 
              type="text" 
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '8px' }}
              placeholder="e.g., 4 weeks"
            />
          </div>

          <div style={{ flex: 1 }}>
            <label><strong>Tags (comma separated)</strong></label><br/>
            <input 
              type="text" 
              name="tags" 
              value={formData.tags} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '8px' }}
              placeholder="e.g., react, frontend, web"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '12px', 
            backgroundColor: loading ? '#ccc' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          {loading ? 'Creating Database Entry...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;