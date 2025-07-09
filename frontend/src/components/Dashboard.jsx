import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user-info");
    navigate("/login");
  };

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const userData = JSON.parse(data);
    setUserInfo(userData);
  }, []);
  return (
    <div>
      <h1>Welcome {userInfo?.name}</h1>
      <h1>email: {userInfo?.email}</h1>
      <img src={userInfo?.image} alt={userInfo?.email} />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
