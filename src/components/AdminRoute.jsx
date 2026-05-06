import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  // 1. Grab the data from Local Storage
  const rawData = localStorage.getItem('user'); // Change 'userInfo' to 'user' if your app uses that word!
  const userInfo = JSON.parse(rawData);

  // 🚨 X-RAY GLASSES: Print exactly what the Bouncer sees to the Console!
  console.log("👮‍♂️ BOUNCER CHECK - Raw Data:", rawData);
  console.log("👮‍♂️ BOUNCER CHECK - Parsed User:", userInfo);

  // 2. The Check
  // Check if userInfo exists, and then check where accountType is sitting!
  if (!userInfo || userInfo.accountType !== 'admin') {
    console.warn("🚨 Access Denied! Kicking to homepage.");
    return <Navigate to="/" replace />;
  }

  console.log("✅ Admin Confirmed! Opening doors.");
  return <Outlet />;
};

export default AdminRoute;