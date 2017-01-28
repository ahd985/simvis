import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Menu } from 'semantic-ui-react'
import uuidV4 from 'uuid/v4'

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

        this.state = {
            shapes: [],
            selectedShape: null,
            data: null,
            dataHeaders: null
        };

        this.addShape = this.addShape.bind(this);
        this.setSelectedShape = this.setSelectedShape.bind(this);
        this.addData = this.addData.bind(this);
        this.contextMenuHandler = this.contextMenuHandler.bind(this);
    }

    addShape(shape) {
        const uuid = uuidV4();
        this.setState((prevState, props) => {
            return {shapes: prevState.shapes.concat({uuid:uuid, shape:shape})};
        });
    }

    setSelectedShape(uuid) {
        this.setState({selectedShape: uuid});
    }

    addData(data, headers) {
        this.setState({data:data, dataHeaders:headers})

        console.log(data, headers)
    }

    contextMenuHandler(e, uuid) {
        alert(e)
        alert(uuid)
    }

    render() {
        const shapeHandlers = {addShape:this.addShape, setSelectedShape:this.setSelectedShape};
        const dataHandlers = {addData:this.addData};

        return (
            <DrawMenu shapeHandlers={shapeHandlers}
                      dataHandlers={dataHandlers}
                      shapes={this.state.shapes}
                      selectedShape={this.state.selectedShape}
                      contextMenuHandler={this.contextMenuHandler}/>
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
