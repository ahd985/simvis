import React, { Component } from 'react'
import Draggable from 'react-draggable';
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { Menu, Popup } from 'semantic-ui-react';

import { moveShapes, addSelectedShape, resizeShapes } from '../actions'

class ShapeContainer extends Component {
    constructor(props) {
        super(props);

        this.isClicked = false;
        this.isDragging = false;
        this.dragPos = {x:0, y:0};

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
    }

    handleMouseDown(e) {
        e.preventDefault();
        this.isClicked = true;
        this.dragPos = {x:e.pageX, y:e.pageY};
    }

    handleMouseMove(e) {
        e.preventDefault();
        e.persist();
        if (this.isClicked && !(e.pageX === this.dragPos.x && e.pageY === this.dragPos.y)) {
            this.isDragging = true;
        }
    }

    handleMouseUp(e) {
        e.preventDefault();
        if (!this.isDragging) {
            this.props.addSelectedShape(this.props.uuid, !e.shiftKey)
        }

        this.isClicked=false;
        this.isDragging=false
    }

    handleMove(e, ui) {
        this.props.addSelectedShape(this.props.uuid, true);
        this.props.moveShapes({x:ui.deltaX, y:ui.deltaY})
    }

    handleResize(e, ui) {
        this.props.resizeShapes({width:ui.deltaX, height:ui.deltaY})
    }

    handleContextMenu(e) {
        e.preventDefault();
        this.props.contextMenuHandler(e, this.props.uuid)
    }

    render() {
        const min_dim = 5;
        const {height, width} = this.props.dims;
        const dH = Math.max(this.props.deltaDims.height, -width + min_dim);
        const dW = Math.max(this.props.deltaDims.width, -height + min_dim);

        const visibility_style = {"visibility": this.props.toggled ? "visible" : "hidden"};
        const translate = `translate(${this.props.position.x}, ${this.props.position.y})`;
        const dObject = {dX:dW, dY:dH};

        const outline_handle_size = 5;

        return (
            <g transform={translate}>
                <g style={this.props.style} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>
                    <Draggable grid={[5,5]} onDrag={this.handleMove} axis={"none"}>
                        <g onContextMenu={this.handleContextMenu} id={this.props.uuid}>
                            <this.props.tag dObject={dObject} />
                        </g>
                    </Draggable>
                </g>
                <g style={visibility_style}>
                    <rect x="0" y="0" height={height + dH} width={width + dW} className="shape-outline"/>
                    <Draggable onDrag={this.handleResize} axis={"none"}>
                        <g>
                            <circle cx={width + dW} cy={height + dH} r={outline_handle_size}
                                    className="resizer-circle" onDrag={this.handleResize}/>
                        </g>
                    </Draggable>
                </g>
            </g>
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({});

const mapDispatchToProps = {
    addSelectedShape: addSelectedShape,
    moveShapes: moveShapes,
    resizeShapes: resizeShapes
};

export default connect(mapStateToProps, mapDispatchToProps)(ShapeContainer)


