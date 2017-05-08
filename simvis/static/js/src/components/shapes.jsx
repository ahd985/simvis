import React, { Component } from 'react'
import Shape, {Rect, Circle, Ellipse, Path, Text} from './shapeElements'

var defaultBBox = {x0:0, y0:0, w0:100, h0:100};

class Rectangle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={defaultBBox} dObject={this.props.dObject}>
                <Rect x={0} y={0} height={100} width={100} id={"element"} />
            </Shape>
        )
    }
}

class CircleSimple extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={defaultBBox} dObject={this.props.dObject}>
                <Circle cx={50} cy={50} r={50} id={"element"} />
            </Shape>
        )
    }
}

const defaultTextBBox = {x0:0, y0:0, w0:40, h0:40};
class TextBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={defaultTextBBox} dObject={this.props.dObject}>
                <Text x={0} y={0} height={40} width={40} id={"element"} editActive={this.props.editActive}/>
            </Shape>
        )
    }
}

var skewedRoundBBox = {x0:0, y0:0, w0:100, h0:50};
class SkewedRound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={skewedRoundBBox} dObject={this.props.dObject}>
                <Ellipse cx={50} cy={25} rx={50} ry={25} id={"element"} />
            </Shape>
        )
    }
}

var lineBBox = {x0:0, y0:0, w0:100, h0:1};
class Line extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={defaultBBox} dObject={this.props.dObject}>
                <Path d="M0,0 L100,0" />
            </Shape>
        )
    }
}

class circleInBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={defaultBBox} dObject={this.props.dObject}>
                <Rect x={0} y={0} height={100} width={100} />
                <Circle cx={25} cy={50} r={25}/>
            </Shape>
        )
    }
}

class pathInBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={defaultBBox} dObject={this.props.dObject} editActive={this.props.editActive}>
                <Rect x={0} y={0} height={100} width={100} />
                <Path d="M0,50 l25,0 25,25 50,-75"/>
            </Shape>
        )
    }
}

export default [
    {name:"General", shapes:[
        {name:"Rectangle", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A simple rectangle."},
        {name:"Circle", tag:CircleSimple, bbox:defaultBBox, ratioLock:true, description:"A simple circle."},
        {name:"Text", tag:TextBox, bbox:defaultTextBBox, ratioLock:false, description:"A text box.", style:{stroke:"none", fill:"none", fontSize:12}, textEditable:{true}}
    ]},
    {name:"Special", shapes:[
        {name:"skewedRound", tag:SkewedRound, bbox:skewedRoundBBox, ratioLock:false},
        //{name:"line", tag:Line, bbox:lineBBox, ratioLock:false},
        {name:"circleInBox", tag:circleInBox, bbox:defaultBBox, ratioLock:false},
        {name:"pathInBox", tag:pathInBox, bbox:defaultBBox, ratioLock:false}
    ]}
]
