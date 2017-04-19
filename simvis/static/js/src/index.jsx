import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import SimVis from './containers/simvis'
import reducer from './reducers'

import { Menu } from 'semantic-ui-react'

class NavBar extends Component{
    constructor(props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this)
    }

    handleItemClick(e, {name}) {

    }

    render() {
        return (
            <Menu inverted>
                <Menu.Item name='importOrEditData' onClick={this.handleItemClick} />
                <Menu.Menu position='right'>
                    <Menu.Item name='submitData' onClick={this.handleItemClick} />
                </Menu.Menu>
            </Menu>
        )
    }
}

render(
  <NavBar />,
  document.getElementById('navbar-container')
);

const store = createStore(reducer);
render(
    <Provider store={store}>
        <SimVis />
    </Provider>,
    document.getElementById('simvis-container')
);
