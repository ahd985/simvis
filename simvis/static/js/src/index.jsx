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

        this.state = {
            activeItem: 'home'
        };
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    handleItemClick(e, {name}) {
        this.setState({activeItem: name});
    }

    render() {
        const { activeItem } = this.state;

        return (
            <Menu inverted>
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
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
