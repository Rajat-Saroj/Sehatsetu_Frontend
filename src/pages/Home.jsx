import { Link } from 'react-router-dom';
import { FaPlay, FaQuestionCircle, FaCheckCircle, FaUserFriends, FaVideo, FaAward, FaClock } from 'react-icons/fa';

const Home = () => {
  const instructors = [
    {
      id: 1,
      name: "Dr. Anjali Rao",
      role: "Lead Physiotherapist",
      exp: "15+ Yrs",
      specialty: "Post-surgery recovery & Joint pain",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Senior Yoga Therapist",
      exp: "12+ Yrs",
      specialty: "Arthritis management & Flexibility",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      id: 3,
      name: "Dr. Susan George",
      role: "Geriatric Nutritionist",
      exp: "20+ Yrs",
      specialty: "Diet plans for Diabetes & Heart health",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Rehab Specialist",
      exp: "8+ Yrs",
      specialty: "Balance training & Fall prevention",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&h=300&q=80"
    }
  ];

  return (
    <div className="bg-white">
      
      <section className="bg-gradient-to-b from-green-50 to-white py-24 px-4 text-center">
        <div className="container mx-auto max-w-5xl">
          <span className="bg-green-100 text-green-800 font-bold px-4 py-2 rounded-full text-sm tracking-wide uppercase mb-6 inline-block">
            Trusted by 5,000+ Seniors
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-green-900 mb-8 leading-tight">
            Wellness Begins at <span className="text-green-600">Any Age</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Rediscover your strength with gentle yoga, daily mobility exercises, and health tracking designed specifically for the golden years.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/catalogue" className="bg-green-700 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-green-800 shadow-xl transition transform hover:scale-105 flex items-center justify-center gap-3">
              <FaPlay /> Start Your Journey
            </Link>
            <Link to="/about" className="bg-white text-green-700 border-2 border-green-700 px-10 py-5 rounded-full text-xl font-bold hover:bg-green-50 transition flex items-center justify-center">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Designed for Indian Seniors
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our platform is built with elderly users in mind, featuring large fonts, high contrast colors, simple navigation, and culturally relevant content.
            </p>
            
            <ul className="space-y-6">
              {[
                "Easy-to-use interface with large touch targets",
                "Programs in multiple Indian languages",
                "Secure payments through Razorpay",
                "Lifetime access to purchased programs"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0" />
                  <span className="text-lg font-bold text-gray-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
              <FaUserFriends className="text-5xl text-green-600 mb-4" />
              <h3 className="text-3xl font-extrabold text-gray-900">1,525+</h3>
              <p className="text-gray-500 font-medium">Happy Users</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
              <FaVideo className="text-5xl text-green-600 mb-4" />
              <h3 className="text-3xl font-extrabold text-gray-900">150+</h3>
              <p className="text-gray-500 font-medium">Video Sessions</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
              <FaAward className="text-5xl text-green-600 mb-4" />
              <h3 className="text-3xl font-extrabold text-gray-900">25+</h3>
              <p className="text-gray-500 font-medium">Certified Instructors</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
              <FaClock className="text-5xl text-green-600 mb-4" />
              <h3 className="text-3xl font-extrabold text-gray-900">5,000+</h3>
              <p className="text-gray-500 font-medium">Hours Watched</p>
            </div>
          </div>

        </div>
      </section>

      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SehatSetu?</h2>
            <p className="text-xl text-gray-600">We understand the unique needs of your body.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 text-center">
              <div className="text-6xl mb-6 flex justify-center text-green-600">🧘</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Gentle Movements</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                No jumping or heavy weights. Our exercises are tailored for joint pain, limited mobility, and stiffness.
              </p>
            </div>
            
            <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 text-center">
              <div className="text-6xl mb-6 flex justify-center text-green-600">🩺</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Doctor Approved</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every routine is vetted by physiotherapists to ensure safety for conditions like Diabetes and Hypertension.
              </p>
            </div>
            
            <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 text-center">
              <div className="text-6xl mb-6 flex justify-center text-green-600">👴</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Easy to Use</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Large text, high contrast, and voice-guided navigation make technology simple for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Guided by Experts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gray-200 w-full relative">
                <img 
                  src={instructor.image} 
                  alt={instructor.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{instructor.name}</h3>
                <p className="text-green-700 font-bold text-lg mb-2">{instructor.role}</p>
                <span className="inline-block bg-green-100 text-green-800 font-bold text-md px-3 py-1 rounded-full mb-4">
                  {instructor.exp}
                </span>
                <p className="text-gray-800 text-lg font-medium leading-snug min-h-[60px]">{instructor.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Common Questions</h2>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900"><FaQuestionCircle className="text-green-600"/> Is this safe for heart patients?</h3>
              <p className="text-lg text-gray-600 mt-3 pl-8">Yes, but we always recommend consulting your doctor first. Look for programs labeled "Low Intensity".</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900"><FaQuestionCircle className="text-green-600"/> Do I need special equipment?</h3>
              <p className="text-lg text-gray-600 mt-3 pl-8">Most of our exercises require only a chair, a wall, or a yoga mat.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900"><FaQuestionCircle className="text-green-600"/> Can I cancel my subscription?</h3>
              <p className="text-lg text-gray-600 mt-3 pl-8">Absolutely. You can cancel anytime from your dashboard settings.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-800 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Feel Better?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">Join thousands of seniors taking control of their health today. It takes less than 2 minutes to start.</p>
          <Link to="/catalogue" className="bg-white text-green-800 px-12 py-5 rounded-full text-2xl font-bold hover:bg-gray-100 transition shadow-2xl">
            Get Started for Free
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;