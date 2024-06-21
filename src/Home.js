// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const token = localStorage.getItem('token'); // Get token from local storage
//       if (!token) {
//         navigate('/login'); // Redirect to login if no token
//         return;
//       }

//       try {
//         const response = await axios.get('http://localhost:5000/api/users/me', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//         navigate('/login'); // Redirect to login if error
//       }
//     };

//     fetchUserDetails();
//   }, [navigate]);

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Welcome, {user.name}!</h1>
//       <p>Membership is expiring: {new Date(user.membership_expiry_date).toLocaleDateString()}</p>
//       <button onClick={() => navigate('/payment')}>Pay Membership</button>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { BrowserRouter as useNavigate } from 'react-router-dom';
// import SignUp from './SignUp';
// import Login from './Login';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </nav>
    </div>
  );
};

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// };

export default Home;


