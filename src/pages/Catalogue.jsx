import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUserFriends, FaClock } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { getPrograms, reset } from '../features/programSlice';

const Catalogue = () => {
  const dispatch = useDispatch();
  const { programs, isLoading, isError, message } = useSelector((state) => state.program);

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    dispatch(getPrograms());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl font-bold text-green-700 animate-pulse">Loading Programs...</div>
      </div>
    );
  }

  // 🚨 THE CRUCIAL FIX 🚨
  // If Redux stored the object {success: true, data: [...]}, we extract .data
  // If Redux stored the array directly, we just use it. If neither, use empty array [].
  const actualPrograms = Array.isArray(programs) ? programs : programs?.data || [];

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Popular Wellness Programs</h1>
        <p className="text-xl text-gray-600">Curated health routines for your specific needs.</p>
      </div>
      
      {/* Fallback if no programs exist */}
      {actualPrograms.length === 0 && !isLoading && (
        <div className="text-center text-gray-500 text-xl mt-10">
          No programs available right now. Please check back later!
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {actualPrograms.map((program) => (
          <div key={program._id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div className="h-64 relative">
              <img 
                src={program.image || "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80"} 
                alt={program.title} 
                className="w-full h-full object-cover" 
              />
              <span className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-md text-sm font-bold shadow-md uppercase tracking-wide">
                {program.level || "Beginner"}
              </span>
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                {program.title}
              </h3>
              
              <p className="text-lg text-gray-600 mb-6 flex-grow">
                {program.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {/* Added safe navigation ?. here just in case tags are missing */}
                {program.tags?.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm border border-gray-200 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 text-gray-500 text-sm mb-6 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-lg" />
                  <span className="font-bold text-gray-900 text-lg">{program.rating || "4.8"}</span>
                  <span className="text-gray-400">({program.reviews || "120"})</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserFriends className="text-lg" />
                  <span>{program.enrolled || 0} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-lg" />
                  <span>{program.duration || "Self-paced"}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-3xl font-extrabold text-gray-900">₹ {program.price}</span>
                <Link to={`/program/${program._id}`} className="bg-green-700 text-white text-lg px-8 py-3 rounded-lg font-bold hover:bg-green-800 transition shadow-lg">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogue;