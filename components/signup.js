
import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile_phone: '',
    email: '',
    address: '',
    password: '',
    
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/signup', formData);
      alert('Signup successful!');
    } catch (error) {
      alert('Signup failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="first_name" onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="last_name" onChange={handleChange} placeholder="Last Name" required />
      <input type="text" name="mobile_phone" onChange={handleChange} placeholder="Mobile Phone" required /> {/* Add mobile phone input */}
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="text" name="address" onChange={handleChange} placeholder="Address" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
