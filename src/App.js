import React, { Component } from 'react';
import { Provider } from 'react-redux';

import MyGallery from './containers/gallery';
import store from './store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <MyGallery feed="feed.json" />
        </Provider>
      </div>
    );
  }
}

export default App;
