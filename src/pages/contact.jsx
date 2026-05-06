import React from 'react';
import { FaCommentDots, FaBuilding, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="grid md:grid-cols-12 gap-10">
          
          <div className="md:col-span-4 bg-green-900 text-white rounded-2xl p-10 h-fit shadow-xl">
            <div className="space-y-12">
              
              <div className="flex gap-4">
                <FaCommentDots className="text-3xl text-green-300 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Chat with us</h3>
                  <p className="text-green-100 text-lg mb-1">Our friendly team is here to help.</p>
                  <p className="font-bold text-lg">info@sehatsetu.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaBuilding className="text-3xl text-green-300 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Visit us</h3>
                  <p className="text-green-100 text-lg mb-1">Come and say hello at our center.</p>
                  <p className="font-bold text-lg">
                    SehatSetu Wellness Center,<br />
                    Block C, Green Park,<br />
                    New Delhi - 110016
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaPhoneAlt className="text-3xl text-green-300 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Call us</h3>
                  <p className="text-green-100 text-lg mb-1">Mon - Fri From 9am to 6pm</p>
                  <p className="font-bold text-lg">+91 98765 43210</p>
                </div>
              </div>

            </div>
          </div>

          <div className="md:col-span-8 bg-white rounded-2xl p-10 border border-gray-200 shadow-lg">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Have questions? We're here to help.</h2>
            <p className="text-xl text-gray-600 mb-10">Tell us how we can support your wellness journey.</p>

            <form className="space-y-8">
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-2">First Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter first name" 
                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter last name" 
                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-2">Phone Number</label>
                <div className="flex gap-4">
                  <select className="p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-600 outline-none bg-white w-28">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>
                  <input 
                    type="tel" 
                    placeholder="12345 67890" 
                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-2">Message</label>
                <textarea 
                  rows="5"
                  placeholder="How can we help you?" 
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600 outline-none transition"
                ></textarea>
              </div>

              <button className="w-full bg-yellow-400 text-gray-900 text-xl font-bold py-4 rounded-lg hover:bg-yellow-500 transition shadow-md">
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;