import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/counter">Counter</Link>
  </div>
)