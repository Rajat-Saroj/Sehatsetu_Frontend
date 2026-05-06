const AdminPanel = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Control Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-xl text-gray-500">Total Users</h3>
          <p className="text-4xl font-bold">1,240</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-xl text-gray-500">Active Programs</h3>
          <p className="text-4xl font-bold">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-xl text-gray-500">Revenue</h3>
          <p className="text-4xl font-bold">₹45,000</p>
        </div>
      </div>
      
      
    </div>
  );
};

export default AdminPanel;