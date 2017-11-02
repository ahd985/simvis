import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import SimVis from './containers/simvis.jsx'
import reducer from './reducers/index.jsx'

import { Menu } from 'semantic-ui-react'

// CSS
import '../../sass/project.scss'

//import { whyDidYouUpdate } from 'why-did-you-update'
//whyDidYouUpdate(React);

const store = createStore(reducer);
render(
    <Provider store={store}>
        <SimVis />
    </Provider>,
    document.getElementById('simvis-container')
);
