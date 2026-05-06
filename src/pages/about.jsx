import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      
      <section className="bg-green-50 py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-extrabold text-green-900 mb-6">
            Driving Innovation in Elderly Care
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            SehatSetu is at the forefront of digital wellness, bridging the gap between clinical therapy and home comfort for India's seniors.
          </p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-red-600 mb-8">Our Founding Story</h2>
          
          <div className="space-y-8 text-xl text-gray-700 leading-relaxed">
            <p>
              Our wellness platform was born out of a shared compassion and vision for transforming elderly care in India. It all began with a group of physiotherapists, geriatric experts, and empathetic technologists who recognized the need for specialized, safe, and accessible wellness resources for our aging population in a rapidly digitizing world.
            </p>
            <p>
              As experienced healthcare professionals ourselves, we witnessed firsthand the limitations and challenges seniors face—joint pain, isolation, and technology that is too complex to use. We believed that wellness should not be confined to a clinic or restricted by mobility issues. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to age with dignity and strength.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-4xl font-bold text-orange-500 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              With this vision in mind, we set out on a journey to create a digital wellness platform that would revolutionize the way seniors approach health. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with medical expertise. We aim to foster a dynamic and interactive wellness experience that makes every senior feel capable, safe, and cared for.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-400 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our mission goes beyond just delivering exercise videos online. We wanted to create a vibrant community of seniors, where individuals can connect, share their progress, and learn from trusted experts. We believe that health thrives in an environment of support and dialogue, and we foster this spirit of collaboration through easy-to-follow routines, live expert sessions, and continuous care networking.
            </p>
          </div>

        </div>
      </section>

      <section className="py-16 bg-gray-800 text-white text-center border-t border-gray-700">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-4xl md:text-5xl font-bold mb-2">5K+</h3>
            <p className="text-gray-400 text-lg">Active Seniors</p>
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-bold mb-2">10+</h3>
            <p className="text-gray-400 text-lg">Expert Doctors</p>
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-bold mb-2">200+</h3>
            <p className="text-gray-400 text-lg">Wellness Videos</p>
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-bold mb-2">50+</h3>
            <p className="text-gray-400 text-lg">Awards Won</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;