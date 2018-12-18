import React, { Component } from 'react';
import routes from './routes.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        {routes}
      </div>
    );
  }
}

export default App;
