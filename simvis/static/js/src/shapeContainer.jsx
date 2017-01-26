import React, { Component } from 'react'

import Draggable from 'react-draggable';

export default class shapeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                fill: "grey",
                stroke: "black",
                cursor: "move"
            },
            controlledPosition: {
                x: 400,
                y: 400
            },
            dims: {
                height: this.props.bbox.h0,
                width: this.props.bbox.w0
            },
            deltaDims: {
                height: 0,
                width: 0
            },
            ratioLock: this.props.ratioLock
        };

        this.toggle = this.toggle.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    toggle(e) {
        this.props.shapeHandlers.setSelectedShape(this.props.uuid);
    }

    handleMove(e, ui) {
        const {x, y} = this.state.controlledPosition;
        this.setState({
            controlledPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY
            }
        });
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
                <g style={this.state.style} onClick={this.toggle}>
                    <Draggable grid={[5,5]} onDrag={this.handleMove} axis={"none"}>
                        <g>
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
