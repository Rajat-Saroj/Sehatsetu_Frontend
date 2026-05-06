import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importing your pages (Fixed Capitalization for Deployment!)
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import About from './pages/About'; 
import Contact from './pages/Contact'; 
import Login from './pages/Login';
import Signup from './pages/Signup'; 
import Dashboard from './pages/Dashboard';
import ViewCourse from './pages/ViewCourse';
import ProgramDetails from './pages/ProgramDetails';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard'; // 🎛️ The new Control Center!
import AdminCreateCourse from './pages/AdminCreateCourse'; 
import AdminCurriculumBuilder from './pages/AdminCurriculumBuilder';
import AdminUploader from './pages/AdminUploader';
import AdminRoute from './components/AdminRoute'; 

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <main className="flex-grow bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/program/:id" element={<ProgramDetails />} />

            {/* Auth & User Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/view-course/:id" element={<ViewCourse />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* 🛡️ PROTECTED ADMIN ROUTES 🛡️ */}
            {/* If AdminRoute says 'yes', it opens the door to these routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} /> 
              <Route path="/admin/create-course" element={<AdminCreateCourse />} />
              <Route path="/admin/build-curriculum" element={<AdminCurriculumBuilder />} />
              <Route path="/admin/upload" element={<AdminUploader />} />
            </Route>
            
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;