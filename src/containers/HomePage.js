import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>This is the homepage</h1>
    <Link to='/login'>Login</Link>
    <Link to='/signup'>Signup</Link>

  </div>
);

export default HomePage;
