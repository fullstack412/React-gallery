import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'

import MyGallery from './containers/gallery';
import store, { history, persistor } from './store';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Provider store={store}>
          <PersistGate
            persistor={persistor}
          >
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path='/' component={MyGallery}/>
              </Switch>
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default App;
