// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignUp from './SignUp';
// import Login from './Login';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<div>Home Page</div>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


//----------------------

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import Payment from './Payment';
import UserIndex from './UserIndex';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/user" element={<UserIndex />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import SignUp from './SignUp';
// import Login from './Login';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h1>Home Page</h1>
//       <nav>
//         <button onClick={() => navigate('/login')}>Login</button>
//         <button onClick={() => navigate('/signup')}>Sign Up</button>
//       </nav>
//     </div>
//   );
// };

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

// export default App;
