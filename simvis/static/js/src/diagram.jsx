import React, { Component } from 'react'

import Draggable from 'react-draggable';

import ShapeContainer from './shapeContainer.js'

export default class Diagram extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.props.shapeHandlers.setSelectedShape(null);
    }

    render() {
        const shapeHandlers = this.props.shapeHandlers;
        const selectedShape = this.props.selectedShape;
        const contextMenuHandler = this.props.contextMenuHandler;

        return (
            <svg className="diagram" id="draw-svg">
                <rect className="diagram-space" onClick={this.toggle}/>
                {this.props.shapes.map(function(shapeData, i) {
                    const shape = shapeData.shape;

                    return (
                        <ShapeContainer uuid={shapeData.uuid} {...shape}
                                        shapeHandlers={shapeHandlers}
                                        toggled={shapeData.uuid == selectedShape}
                                        key={i}
                                        contextMenuHandler={contextMenuHandler}/>
                    )
                })}
            </svg>
        )
    }
}
