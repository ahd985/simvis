import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Menu } from 'semantic-ui-react'
import uuidV4 from 'uuid/v4'

import DrawMenu from './menus.js'

class NavBar extends Component{
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'home',
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
        this.moveShapeForward = this.moveShapeForward.bind(this);
        this.moveShapeBackwards = this.moveShapeBackwards.bind(this);
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
        this.setState({data:data, dataHeaders:headers});
    }

    moveShapes(uuids, step) {
        let topPosition=-1;
        step == -1 ? topPosition=0 : null;
        const movePositions = this.state.data.map((d, i) => {
            let ind = uuids.indexOf(d.uuid);
            topPosition == -1 && ind > -1 ? topPosition = i : null;
            return ind > -1
        });

        let updatedData = this.state.data;
        let movedData = [];
        for (let i=0; i < positions.length; i++) {
            if (movePositions[i]) {
                movedData.push(updatedData[i]);
                updatedData.splice(i,1);
            }
        }
        updatedData.splice(topPosition, 0, movedData.length);

        this.setState({
            data:updatedData
        })
    }

    render() {
        const shapeHandlers = {addShape:this.addShape, setSelectedShape:this.setSelectedShape};
        const dataHandlers = {addData:this.addData};

        return (
            <DrawMenu shapeHandlers={shapeHandlers}
                      dataHandlers={dataHandlers}
                      shapes={this.state.shapes}
                      selectedShape={this.state.selectedShape}/>
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
