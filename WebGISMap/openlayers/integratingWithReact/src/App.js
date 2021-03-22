import React from 'react';
import './App.css';

import MapView from './MapView';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="App">
          <MapView></MapView>
        </div>
    );
  }
}

export default App;
