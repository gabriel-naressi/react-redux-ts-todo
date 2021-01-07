import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import routes from './routes'

const App = () => (
  <Router>
    {routes}
  </Router>
)

export default App
