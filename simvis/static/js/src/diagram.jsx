import React, { Component } from 'react'

import Draggable from 'react-draggable';

import ShapeContainer from './shapeContainer.js'

export default class Diagram extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <svg className="diagram" id="draw-svg">
                <rect className="diagram-space" />
                {this.props.shapes.map(function(shape) {
                    return (
                        <ShapeContainer {...shape}/>
                    )
                })}
            </svg>
        )
    }
}
