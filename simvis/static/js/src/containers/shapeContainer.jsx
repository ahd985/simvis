import React, { Component } from 'react'
import Draggable from 'react-draggable';
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { Menu, Popup } from 'semantic-ui-react';
import { debounce } from 'underscore';

import { moveShapes, addSelectedShape, resizeShapes, startMoveShapes } from '../actions'

class ShapeContainer extends Component {
    constructor(props) {
        super(props);

        this.isClicked = false;
        this.isDragging = false;
        this.dragPos = {x:0, y:0};
        this.lastPos = null;

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragStop = this.handleDragStop.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleMove = debounce(this.handleMove, 5);
        this.handleResizeStart = this.handleResizeStart.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleResize = debounce(this.handleResize, 5);
        this.handleResizeStop = this.handleResizeStop.bind(this);
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

    handleDragStart(e, ui) {
        this.lastPos = {x:0, y:0};
        this.props.startMoveShapes()
    }

    handleMove(e, ui) {
        const scale = this.props.scale;
        const deltaX = ui.x - this.lastPos.x;
        const deltaY = ui.y - this.lastPos.y;
        if (this.props.selectedShapes.indexOf(this.props.uuid) == -1) {
            this.props.addSelectedShape(this.props.uuid, true);
        }
        this.props.moveShapes({x: deltaX / scale, y: deltaY / scale});
        this.lastPos = {x:ui.x, y:ui.y};
    }

    handleDragStop(e, ui) {
        const scale = this.props.scale;
        const deltaX = ui.x - this.lastPos.x;
        const deltaY = ui.y - this.lastPos.y;
        this.props.moveShapes({x: deltaX / scale, y: deltaY / scale});
        this.lastPos = null;
    }

    handleResizeStart(e, ui) {
        this.lastPos = {x:0, y:0};
        //this.props.startResizeShapes()
    }

    handleResize(e, ui) {
        const scale = this.props.scale;
        const deltaX = ui.x - this.lastPos.x;
        const deltaY = ui.y - this.lastPos.y;
        this.props.resizeShapes({width:deltaX/scale, height:deltaY/scale});
        this.lastPos = {x:ui.x, y:ui.y};
    }

    handleResizeStop(e, ui) {
        const scale = this.props.scale;
        const deltaX = ui.x - this.lastPos.x;
        const deltaY = ui.y - this.lastPos.y;
        this.props.resizeShapes({width: deltaX / scale, height: deltaY / scale});
        this.lastPos = null;
    }

    handleContextMenu(e) {
        e.preventDefault();
        this.props.contextMenuHandler(e, this.props.uuid)
    }

    render() {
        const min_dim = 5;
        const scale = this.props.scale;
        const height = this.props.dims.height;
        const width = this.props.dims.width;
        const dH = Math.max(this.props.deltaDims.height, -width + min_dim);
        const dW = Math.max(this.props.deltaDims.width, -height + min_dim);

        const visibility_style = {"visibility": this.props.toggled ? "visible" : "hidden"};
        const translate = `translate(${this.props.position.x*scale}, ${this.props.position.y*scale})`;
        const dObject = {dX:dW, dY:dH, scale:scale};

        const outline_handle_size = 5;
        const position = {x:0, y:0};

        // TODO - fix crappy implementation of drag
        return (
            <g transform={translate}>
                <g style={this.props.style} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>
                    <Draggable onStart={this.handleDragStart} onDrag={this.handleMove} onStop={this.handleDragStop} position={position} axis={"none"}>
                        <g onContextMenu={this.handleContextMenu} id={this.props.uuid}>
                            <this.props.tag dObject={dObject}/>
                        </g>
                    </Draggable>
                </g>
                <g style={visibility_style} className="ignore">
                    <rect x="0" y="0" height={(height + dH)*scale} width={(width + dW)*scale} className="shape-outline"/>
                    <Draggable onStart={this.handleResizeStart} onDrag={this.handleResize} onStop={this.handleResizeStop} position={{x:0, y:0}} axis={"none"}>
                        <g>
                            <circle cx={(width + dW)*scale} cy={(height + dH)*scale} r={outline_handle_size}
                                    className="resizer-circle"/>
                        </g>
                    </Draggable>
                </g>
            </g>
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({
    selectedShapes:shapeCollection.present.selectedShapes
});

const mapDispatchToProps = {
    addSelectedShape: addSelectedShape,
    moveShapes: moveShapes,
    startMoveShapes: startMoveShapes,
    resizeShapes: resizeShapes
};

export default connect(mapStateToProps, mapDispatchToProps)(ShapeContainer)


