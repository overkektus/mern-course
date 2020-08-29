import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'materialize-css';
import { useRoutes } from './routes';

function App() {
  const routes = useRoutes(true);
  return (
    <div className="container">
      <h1>Hello</h1>
      <Router>
        {routes}
      </Router>
    </div>
  );
}

export default App;
