import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProgram } from '../features/programSlice';
import { updateUserPrograms } from '../features/authSlice'; // 👈 IMPORTED REDUX ACTION
import { FaStar, FaUserFriends, FaClock, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import axios from 'axios';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const ProgramDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { program, isLoading, isError, message } = useSelector((state) => state.program);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getProgram(id));
  }, [dispatch, id, isError, message]);

  // 🛡️ THE BULLETPROOF ENROLLMENT CHECK
  const alreadyEnrolled = user?.purchasedPrograms?.some((p) => {
    const purchasedId = typeof p === 'object' ? p._id : p;
    return String(purchasedId) === String(program?._id);
  });

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const { data: { key } } = await axios.get("http://localhost:5000/api/payment/getkey");

      const { data: { order } } = await axios.post("http://localhost:5000/api/payment/checkout", {
        amount: program.price,
        userId: user._id,       
        programId: program._id  
      });

      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "SehatSetu Wellness",
        description: `Enrollment for ${program.title}`,
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=150&q=80",
        order_id: order.id,
        // 👇 CHANGED FROM callback_url TO handler 👇
        handler: async (response) => {
          try {
            // 1. Verify payment with your backend
            await axios.post("http://localhost:5000/api/payment/paymentverification", {
              ...response,
              userId: user._id,
              programId: program._id
            });

            // 2. ⚡ THE MAGIC: Update Redux and LocalStorage instantly!
            dispatch(updateUserPrograms(program._id));

            // 3. Take them to the dashboard smoothly
            navigate('/dashboard');
          } catch (error) {
            console.error("Verification Error:", error);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: "9999999999"
        },
        notes: {
          userId: user._id,       
          programId: program._id  
        },
        theme: {
          color: "#15803d" 
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment failed to initialize", error);
      alert(error.response?.data?.message || "Something went wrong with the payment gateway.");
    }
  };

  if (isLoading || !program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl font-bold text-green-700 animate-pulse">Loading Details...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
          
          <div className="lg:w-3/5">
            <img 
              src={program.image || "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80"} 
              alt={program.title} 
              className="w-full h-[400px] object-cover"
            />
            <div className="p-10">
              <div className="flex flex-wrap gap-3 mb-6">
                {program.tags?.map((tag, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                {program.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {program.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-200 mb-8">
                <div className="text-center">
                  <FaStar className="text-yellow-400 text-3xl mx-auto mb-2" />
                  <p className="font-bold text-xl text-gray-900">{program.rating || "4.8"}</p>
                  <p className="text-gray-500">({program.reviews || "120"} reviews)</p>
                </div>
                <div className="text-center">
                  <FaUserFriends className="text-green-600 text-3xl mx-auto mb-2" />
                  <p className="font-bold text-xl text-gray-900">{program.enrolled || 0}</p>
                  <p className="text-gray-500">Enrolled</p>
                </div>
                <div className="text-center">
                  <FaClock className="text-blue-500 text-3xl mx-auto mb-2" />
                  <p className="font-bold text-xl text-gray-900">{program.duration || "Self-paced"}</p>
                  <p className="text-gray-500">Duration</p>
                </div>
                <div className="text-center">
                  <FaShieldAlt className="text-red-500 text-3xl mx-auto mb-2" />
                  <p className="font-bold text-xl text-gray-900">{program.level || "Beginner"}</p>
                  <p className="text-gray-500">Difficulty</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">What you will learn:</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-4 text-lg text-gray-700">
                  <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" /> Safe, doctor-approved movements.
                </li>
                <li className="flex items-center gap-4 text-lg text-gray-700">
                  <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" /> Modifications for limited mobility.
                </li>
                <li className="flex items-center gap-4 text-lg text-gray-700">
                  <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" /> Daily routines for long-term health.
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-2/5 bg-green-900 text-white p-10 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-800 rounded-bl-full opacity-50"></div>
            
            <h2 className="text-3xl font-bold mb-2">Ready to start?</h2>
            <p className="text-green-200 text-lg mb-8">Get lifetime access to this program and all future updates.</p>
            
            <div className="mb-10">
              <span className="text-5xl font-extrabold">₹ {program.price}</span>
              <span className="text-green-200 text-xl ml-2">One-time payment</span>
            </div>

            {alreadyEnrolled ? (
              <Link 
                to={`/view-course/${program._id}`} 
                className="w-full block text-center bg-gray-900 text-white text-2xl font-extrabold py-5 rounded-xl hover:bg-gray-800 transition shadow-2xl transform hover:-translate-y-1"
              >
                Access Course Content ▶
              </Link>
            ) : (
              <button 
                onClick={handleEnroll}
                className="w-full bg-yellow-400 text-green-900 text-2xl font-extrabold py-5 rounded-xl hover:bg-yellow-500 transition shadow-2xl transform hover:-translate-y-1"
              >
                Enroll Now
              </button>
            )}
            
            <p className="text-center text-green-200 mt-6 text-sm">
              Secure payments powered by Razorpay. 100% money-back guarantee within 7 days.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;