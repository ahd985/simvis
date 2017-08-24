import React, { Component } from 'react'
import Shape, {Rect, Circle, Ellipse, Path, EditableText, StaticText} from './shapeElements'

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
                <EditableText x={0} y={0} height={40} width={40} id={"element"} editActive={this.props.editActive}/>
            </Shape>
        )
    }
}
class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={defaultBBox} dObject={this.props.dObject} >
                <Rect x={0} y={0} height={100} width={100} id={"element"} />
                <StaticText x={50} y={50} height={100} width={100} id={"element"} text="CONTENT"/>
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
    {name:"Nodes", shapes:[
        {name:"Rectangle", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A simple rectangle.", allowedConditions:['cell']},
        {name:"Circle", tag:CircleSimple, bbox:defaultBBox, ratioLock:true, description:"A simple circle."}
    ]},
    {name:"Annotation", shapes:[
        {name:"Text", tag:TextBox, bbox:defaultTextBBox, ratioLock:false, description:"A text box.", style:{stroke:"none", fill:"none", fontSize:12}, editable:{model:false}},
        {name:"Content", tag:Content, bbox:defaultBBox, ratioLock:false, description:"Legend, table, or reports.", editable:{text:false, style:false}}
    ]},
    {name:"Equipment", shapes:[
        {name:"Vertical Tank", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A simple vertical tank."},
        {name:"Horizontal Tank", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A simple horizontal tank."},
        {name:"Pump", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A simple pump."},
        {name:"Valve", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A simple valve."}
    ]},{name:"Barriers", shapes:[
        {name:"Vertical Barrier", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A simple vertical barrier."},
        {name:"Horizontal Barrier", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A simple horizontal barrier."}
    ]},{name:"Pipes", shapes:[
        {name:"Vertical Pipe", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A simple vertical pipe."},
        {name:"Horizontal Pipe", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A simple horizontal pipe."}
    ]},
    {name:"Heatmaps", shapes:[
        {name:"Rectangular Heatmap", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A rectangular heatmap."}
    ]},
    {name:"Indicators", shapes:[
        {name:"Toggle", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A two-state toggle."},
        {name:"Fire", tag:Rectangle, bbox:defaultBBox, ratioLock:false, description:"A fire."}
    ]}
]
