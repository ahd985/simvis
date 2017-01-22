import React, { Component } from 'react'
import Shape, {Rect, Circle, Ellipse, Path} from './shapeElements.js'

var boxBBox = {x0:0, y0:0, w0:100, h0:100};
class Box extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={boxBBox} dObject={this.props.dObject}>
                <Rect x={0} y={0} height={100} width={100} />
            </Shape>
        )
    }
}

export default [
    {id: 1, name:"box", tag:Box, bbox:boxBBox}
]

/*
            // Elements are typically 100x100 pixels, icons are translated down to 40x40
            elements: [
                {"id": 1, "name":"box", "shape": <rect x="0" y="0" height="100" width="100"/>, height:100, width:100, ratioLock:true},
                {"id": 2, "name":"circle", "shape": <circle r="50" cx="50" cy="50" />, height:100, width:100, ratioLock:true},
                {"id": 3, "name":"path", "shape": <path d="M0,50L100,50Z"/>, height:100, width:100, ratioLock:true}
            ]
*/
