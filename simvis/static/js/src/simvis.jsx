import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Menu, Modal, Button } from 'semantic-ui-react'
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
                <ImportDataModal />
            </Menu>
        )
    }
}

class DrawContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shapes: [],
            selectedShape: null
        };

        this.addShape = this.addShape.bind(this);
        this.setSelectedShape = this.setSelectedShape.bind(this);
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

    render() {
        const shapeHandlers = {addShape:this.addShape, setSelectedShape:this.setSelectedShape};

        return (
            <DrawMenu shapeHandlers={shapeHandlers}
                      shapes={this.state.shapes}
                      selectedShape={this.state.selectedShape}/>
        )
    }
}

class ImportDataModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal trigger={<Button>Import Data</Button>}>
                <Modal.Header>Import Data</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <input id="fileupload" type="file" name="file" data-url="data-upload" multiple/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
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
