import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Menu } from 'semantic-ui-react'

import DrawMenu from './menus.js'

class NavBar extends Component{
    constructor(props) {
        super(props);

        this.state = {activeItem: 'home'};
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

class DrawContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DrawMenu />
        )
    }
}

ReactDOM.render(
  <NavBar />,
  document.getElementById('navbar-container')
);

ReactDOM.render(
  <DrawContainer />,
  document.getElementById('draw-container')
);
