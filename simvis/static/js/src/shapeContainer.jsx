import React, { Component } from 'react'

import Draggable from 'react-draggable';

import { Menu, Popup } from 'semantic-ui-react';

export default class shapeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                fill: "grey",
                stroke: "black",
                cursor: "move"
            },
            dims: {
                height: this.props.bbox.h0,
                width: this.props.bbox.w0
            },
            controlledPosition:this.props.position,
            deltaDims: {
                height: 0,
                width: 0
            },
            ratioLock: this.props.ratioLock
        };

        this.isClicked = false;
        this.isDragging = false;
        this.dragPos = {x:0, y:0};

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
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
            this.props.shapeHandlers.clearSelectedShapes();
            this.toggle()
        }

        this.isClicked=false;
        this.isDragging=false
    }

    toggle() {
        this.props.shapeHandlers.addSelectedShape(this.props.uuid);
    }

    componentWillReceiveProps(nextProps) {
        const {x, y} = this.state.controlledPosition;
        this.setState((prevState) => {
            let updatedStyle = prevState.style;
            if (nextProps.style) {
                for (var p in nextProps.style) {
                    updatedStyle[p] = nextProps.style[p]
                }
            }

            return {
                controlledPosition: {
                    x: x + nextProps.deltaPos.x,
                    y: y + nextProps.deltaPos.y
                },
                    style:updatedStyle
                }
        });
    }

    handleMove(e, ui) {
        this.props.shapeHandlers.addSelectedShape(this.props.uuid, true);
        this.props.moveShapes({x:ui.deltaX, y:ui.deltaY})
    }

    handleResize(e, ui) {
        const {height, width} = this.state.deltaDims;
        let dX = ui.deltaX;
        let dY = ui.deltaY;

        if (this.state.ratioLock) {
            if (Math.abs(dX) > Math.abs(dY)) {
                dY = dX * this.state.dims.height / this.state.dims.width
            } else {
                dX = dY * this.state.dims.width / this.state.dims.height
            }
        }

        this.setState({
            deltaDims: {
                width: width + dX,
                height: height + dY
            }
        });
    }

    handleContextMenu(e) {
        e.preventDefault();
        this.props.contextMenuHandler(e, this.props.uuid)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectOutline) {
            const outline = prevProps.selectOutline;
            if (prevState.controlledPosition.x >= outline.x &&
                prevState.controlledPosition.y >= outline.y &&
                prevState.controlledPosition.x + prevState.dims.width + prevState.deltaDims.width <= outline.x + outline.width &&
                prevState.controlledPosition.y + prevState.dims.height + prevState.deltaDims.height <= outline.y + outline.height) {

                this.toggle()
            }
        }
    }

    render() {
        const min_dim = 5;
        const {height, width} = this.state.dims;
        const dH = Math.max(this.state.deltaDims.height, -width + min_dim);
        const dW = Math.max(this.state.deltaDims.width, -height + min_dim);

        const visibility_style = {"visibility": this.props.toggled ? "visible" : "hidden"};
        const translate = `translate(${this.state.controlledPosition.x}, ${this.state.controlledPosition.y})`;
        const dObject = {dX:dW, dY:dH};

        const outline_handle_size = 5;

        return (
            <g transform={translate}>
                <g style={this.state.style} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>
                    <Draggable grid={[5,5]} onDrag={this.handleMove} axis={"none"}>
                        <g onContextMenu={this.handleContextMenu}>
                            <this.props.tag dObject={dObject}/>
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
