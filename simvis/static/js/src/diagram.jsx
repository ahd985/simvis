import React, { Component } from 'react'

import Draggable from 'react-draggable';

import ShapeContainer from './shapeContainer.js'

export default class Diagram extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false,
            dragX:0,
            dragX:0,
            dragWidth:0,
            dragHeight:0,
            clientX:0,
            clientY:0,
            selectOutline:{x:0, y:0, width:0, height:0},
            deltaShapePos:{x:0, y:0}
        };

        this.toggle = this.toggle.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.moveShapes = this.moveShapes.bind(this);
    }

    toggle() {
        this.props.shapeHandlers.clearSelectedShapes();
    }

    handleMouseDown(e) {
        e.preventDefault();
        const dim = e.target.getBoundingClientRect();
        const x = e.clientX - dim.left - 1;
        const y = e.clientY - dim.top - 1;

        this.setState({
            clicked: true,
            clientX:e.clientX,
            clientY:e.clientY,
            dragX:x,
            dragY:y,
            dragWidth:0,
            dragHeight:0
        })
    }

    handleMouseMove(e) {
        e.preventDefault();
        e.persist();
        if (this.state.clicked) {
            this.setState((prevState, props) => {
                return {
                    dragWidth:e.clientX - prevState.clientX,
                    dragHeight:e.clientY - prevState.clientY
                }
            });
        }
    }

    handleMouseUp(e) {
        e.preventDefault();
        this.toggle();
        this.setState((prevState) => {
            const x = Math.min(prevState.dragX, prevState.dragX + prevState.dragWidth);
            const y = Math.min(prevState.dragY, prevState.dragY + prevState.dragHeight);
            return {
                clicked:false,
                selectOutline:{x:x, y:y, width:Math.abs(prevState.dragWidth), height:Math.abs(prevState.dragHeight)}
            }
        })
    }

    moveShapes(deltaShapePos) {
        this.setState({deltaShapePos:deltaShapePos})
    }

    render() {
        const shapeHandlers = this.props.shapeHandlers;
        const selectedShapes = this.props.selectedShapes;
        const contextMenuHandler = this.props.contextMenuHandler;
        const selectOutline = this.state.selectOutline;
        const moveShapes = this.moveShapes;
        const deltaShapePos = this.state.deltaShapePos;
        const style = this.props.selectedStyle;

        const renderedShapes = this.props.shapes.map(function(shapeData, i) {
            const toggled = selectedShapes.indexOf(shapeData.uuid) > -1;

            return (
                <ShapeContainer uuid={shapeData.uuid} {...shapeData.shape}
                                shapeHandlers={shapeHandlers}
                                toggled={toggled}
                                key={shapeData.uuid}
                                contextMenuHandler={contextMenuHandler}
                                position={shapeData.position}
                                moveShapes={moveShapes}
                                deltaPos={toggled ? deltaShapePos : {x:0, y:0}}
                                selectOutline={selectOutline}
                                style={toggled ? style : null}/>
            )
        });

        // TODO - is this the best way to do this?
        this.state.selectOutline = null;
        this.state.deltaShapePos = {x:0, y:0};

        let selectOutlineRect = null;
        if (this.state.clicked) {
            const outlineX = Math.min(this.state.dragX, this.state.dragX + this.state.dragWidth);
            const outlineY = Math.min(this.state.dragY, this.state.dragY + this.state.dragHeight);
            const rectStyle = {x:outlineX, y:outlineY,
                height:Math.abs(this.state.dragHeight), width:Math.abs(this.state.dragWidth)};
            selectOutlineRect = <rect className="select-outline" style={rectStyle}/>
        }

        return (
            <div>
                <svg className="diagram" id="draw-svg">
                    <rect className="diagram-space" onClick={this.toggle}
                          onMouseDown={this.handleMouseDown}/>
                    {renderedShapes}
                    {selectOutlineRect}
                </svg>
                <div className="select-layer" style={{visibility:(this.state.clicked ? "visible" : "hidden")}}
                     onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}
                     onMouseOut={this.handleMouseUp}>
                </div>
            </div>
        )
    }
}
