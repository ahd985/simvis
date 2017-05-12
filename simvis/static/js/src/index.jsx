import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import SimVis from './containers/simvis'
import reducer from './reducers'

import { Menu } from 'semantic-ui-react'

const store = createStore(reducer);
render(
    <Provider store={store}>
        <SimVis />
    </Provider>,
    document.getElementById('simvis-container')
);
