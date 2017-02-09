import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Menu } from 'semantic-ui-react'
import uuidV4 from 'uuid/v4'

import DrawMenu from './menus.js'

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

class DrawContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shapes: [],
            selectedShapes: [],
            data: null,
            dataHeaders: null,
        };

        this.addShape = this.addShape.bind(this);
        this.addSelectedShape = this.addSelectedShape.bind(this);
        this.clearSelectedShapes = this.clearSelectedShapes.bind(this);
        this.addData = this.addData.bind(this);
        this.moveShapes = this.moveShapes.bind(this);
    }

    addShape(shape) {
        const uuid = uuidV4();
        this.setState((prevState, props) => {
            return {shapes: prevState.shapes.concat({uuid:uuid, shape:shape, position:{x:400, y:400}})};
        });
    }

    addSelectedShape(uuid, overwriteIfNotPresent) {
        this.setState((prevState, props) => {
            let selectedShapes = prevState.selectedShapes;
            if (selectedShapes.indexOf(uuid) < 0) {
                if (overwriteIfNotPresent) {
                    selectedShapes = [uuid]
                } else {
                    selectedShapes.push(uuid)
                }
            }

            return {selectedShapes:selectedShapes};
        });
    }

    clearSelectedShapes() {
        this.setState({selectedShapes: []});
    }

    addData(data, headers) {
        this.setState({data:data, dataHeaders:headers});
    }

    moveShapes(uuids, step) {
        let topPosition = -1;
        const movePositions = this.state.shapes.map(function(d, i) {
            let ind = uuids.indexOf(d.uuid);
            if (ind > -1) {
                topPosition == -1 ? topPosition = i : null;
                return true
            } else {
                return false
            }
        });

        let updatedShapes = this.state.shapes;
        let movedShapes = [];
        for (let i=movePositions.length-1; i >= 0; i--) {
            if (movePositions[i]) {
                movedShapes.unshift(updatedShapes[i]);
                updatedShapes.splice(i,1);
            }
        }

        if (step == "B") {
            topPosition = 0;
            step = 0
        } else if (step == "F") {
            topPosition = this.state.shapes.length - 1 - movedShapes.length;
            step = 0
        }

        topPosition = Math.max(0, topPosition + step);

        let args = [topPosition, 0].concat(movedShapes);
        Array.prototype.splice.apply(updatedShapes, args);

        this.setState({
            shapes:updatedShapes
        })
    }

    render() {
        const shapeHandlers = {
            addShape:this.addShape,
            addSelectedShape:this.addSelectedShape,
            clearSelectedShapes:this.clearSelectedShapes,
            moveShapes:this.moveShapes
        };

        const dataHandlers = {addData:this.addData};

        return (
            <DrawMenu shapeHandlers={shapeHandlers}
                      dataHandlers={dataHandlers}
                      shapes={this.state.shapes}
                      selectedShapes={this.state.selectedShapes}/>
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
