import React, { Component } from 'react'
import Shape, {Rect, Circle, Ellipse, Path, EditableText, StaticText} from './shapeElements.jsx'

var defaultBBox = {x0:0, y0:0, w0:100, h0:100};

class Rectangle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={defaultBBox} dObject={this.props.dObject}>
                <Rect x={0} y={0} height={100} width={100} id={"element"} />
                <StaticText x={50} y={50} height={100} width={100} id={"element"} text="CELL" style={{stroke:"black", strokeWidth:1, fontSize:18}} ignore/>
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
                <StaticText x={50} y={50} height={100} width={100} id={"element"} text="CELL" style={{stroke:"black", strokeWidth:1, fontSize:18}} ignore/>
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
                <Rect x={0} y={0} height={100} width={100} ignore />
                <Path style={{fill:"none"}} ignore d="m 70.004212,85.994758 20.996948,0 0,4.99886 -20.996948,0 z m 0,-13.996807 20.996948,0 0,4.998861 -20.996948,0 z m 0,-13.996807 20.996948,0 0,4.99886 -20.996948,0 z m -11.998255,27.993614 4.999273,0 0,4.99886 -4.999273,0 z m 0,-13.996807 4.999273,0 0,4.998861 -4.999273,0 z m 0,-13.996807 4.999273,0 0,4.99886 -4.999273,0 z M 57.50603,8.2142781 l 34.994911,0 0,4.7971309 -34.994911,0 z m 23.496584,5.7969019 0,27.993614 M 69.004358,14.01118 l 0,27.993614 M 57.5,33.006846 l 34.501014,0 M 57.5,23.009128 l 34.501014,0 m -34.494984,-9.497834 34.994911,0 0,28.993386 -34.994911,0 z m -42.479582,69.484049 18.970563,0 m -18.970563,-3.999088 18.970563,0 m -18.970563,-3.999088 18.970563,0 m -18.980827,-3.999088 18.970564,0 m -23.973814,-12.996931 22.996657,0 0,5.998628 0,-5.998628 5.999128,5.998628 -5.999128,0 5.999128,0 0,25.994074 -28.995785,0 z m 24.996367,-42.990196 4.999272,0 0,4.99886 m -26.996074,16.996122 11.998255,-16.996122 4.999273,4.998859 9.998546,-9.997719 m -29.995639,-4.99886 0,29.993157 29.995639,0 M 50.514502,1.0203109 50.514295,98.985627 M 1.0152345,49.503085 l 97.4694825,0 M 1.0142426,1.0141452 l 97.9857524,0 0,97.9776478 -97.9857524,0 0,-97.9776478" />
              </Shape>
        )
    }
}

class VerticalTank extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={{x0:0, y0:0, w0:50, h0:100}} dObject={this.props.dObject} >
                <Path id={"element"} d="M0 73.1L0 26.8C0 12 11.2 0 25 0 38.8 0 50 12.1 50 26.9L50 71.8C50 89 38.5 99.8 25 100 11.2 100.2 0 88 0 73.1Z" />
              </Shape>
        )
    }
}

class HorizontalTank extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={{x0:0, y0:0, w0:100, h0:50}} dObject={this.props.dObject} >
                <Path id={"element"} d="M 73.149 50 L 26.848 50 C 12.028 50 0 38.787 0 25.022 C 0 11.236 12.052 0.024 26.873 0.024 L 71.751 0 C 89.011 0.035 99.755 11.542 99.996 25 C 100.245 38.784 87.969 49.975 73.149 50 Z" />
              </Shape>
        )
    }
}

class Pump extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={{x0:0, y0:0, w0:100, h0:90}} dObject={this.props.dObject} >
                <Path id={"element"} d="m 57,45.00006 c -10e-7,6.627417 -5.372583,12 -12,12 -6.627417,0 -11.999999,-5.372583 -12,-12 10e-7,-6.627417 5.372583,-12 12,-12 6.627417,0 11.999999,5.372583 12,12 z M 87,45 C 87,68.19596 68.195959,87 45,87 21.804041,87 3,68.19596 3,45 3,21.80404 21.804041,3 45,3 l 0,3e-5 52,0 L 97,45 70,45 Z" />
              </Shape>
        )
    }
}

class Valve extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={{x0:0, y0:0, w0:100, h0:50}} dObject={this.props.dObject} >
                <Path static d="M 99.493626,0.00117876 67,16.828379 l 0,16.8272 32.493626,15.8373 M 32.177961,33.655579 0.5,49.492879 0.5,0.00117876 32.177961,16.828379 Z m 67.315665,-33.65440024 0,49.49170024" />
                <Circle id={"element"} cx={50} cy={25} r={20.5}/>
              </Shape>
        )
    }
}

class VerticalBarrier extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={{x0:0, y0:0, w0:1, h0:100}} dObject={this.props.dObject} >
                <Path d="M 0.1,0.1 l 0.1,100" />
            </Shape>
        )
    }
}

class HorizontalBarrier extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Shape objectBBox={{x0:0, y0:0, w0:100, h0:1}} dObject={this.props.dObject} >
                <Path d="M 0.1,0.1 l 100,0.1" />
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
                <Path d="M5,5 L90,0 0,90 -90,0 0,-90" />
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

const defaultModelPlacementOpts = {
    style: {fill: "#BDBDBD", stroke: "black", strokeWidth: 1, cursor: "move", color:"black", fontSize:12, fillOpacity:0.3},
}

function createShape(bbox, svgElements) {
    return (
        <Shape objectBBox={defaultBBox}>
            {svgElements.map((e,i) => {
                const TagName = e.tag;
                return <TagName {...e} key="i" />
            })}
        </Shape>
    )
}

const zz = createShape(defaultBBox, [{tag:Rect, x:0, y:0, height:100, width:100}])
console.log(zz)

export default [
    {name:"Nodes", shapes:[
        {name:"Rectangle", tag:zz, bbox:defaultBBox, ratioLock:false, description:"A simple rectangle.", allowedModels:['cell'], editable:{text:false, fill:false}, ...defaultModelPlacementOpts},
        {name:"Circle", tag:CircleSimple, bbox:defaultBBox, ratioLock:true, description:"A simple circle.", allowedModels:['cell'], editable:{text:false, fill:false}, ...defaultModelPlacementOpts}
    ]},
    {name:"Annotation", shapes:[
        {name:"Text", tag:TextBox, bbox:defaultTextBBox, ratioLock:false, description:"A text box.", style:{stroke:"none", fill:"none", fontSize:12}, iconStyle:{stroke:"none", fill:"none"}, editable:{model:false}},
        {name:"Content", tag:Content, bbox:defaultBBox, ratioLock:false, description:"Legend, table, or reports.", allowedModels:['report', 'table', 'legend'], editable:{text:false, style:false}, ...defaultModelPlacementOpts}
    ]},
    {name:"Equipment", shapes:[
        {name:"Vertical Tank", tag:VerticalTank, bbox:{x0:0, y0:0, w0:50, h0:100}, ratioLock:false, description:"A simple vertical tank.", allowedModels:['cell'], editable:{text:false, fill:false}, ...defaultModelPlacementOpts},
        {name:"Horizontal Tank", tag:HorizontalTank, bbox:{x0:0, y0:0, w0:100, h0:50}, ratioLock:false, description:"A simple horizontal tank.", allowedModels:['cell'], editable:{text:false, fill:false}, ...defaultModelPlacementOpts},
        {name:"Pump", tag:Pump, bbox:{x0:0, y0:0, w0:100, h0:90}, ratioLock:true, description:"A simple pump.", allowedModels:['cell'], editable:{text:false, fill:false}, ...defaultModelPlacementOpts},
        {name:"Valve", tag:Valve, bbox:{x0:0, y0:0, w0:100, h0:50}, ratioLock:true, description:"A simple valve.", allowedModels:['cell'], editable:{text:false, fill:false}, ...defaultModelPlacementOpts}
    ]},{name:"Barriers", shapes:[
        {name:"Vertical Barrier", tag:VerticalBarrier, bbox:{x0:0, y0:0, w0:0, h0:100}, moveHorizontal:false, description:"A simple vertical barrier.", lineOutline:true},
        {name:"Horizontal Barrier", tag:HorizontalBarrier, bbox:{x0:0, y0:0, w0:100, h0:0}, moveVertical:false, description:"A simple horizontal barrier.", lineOutline:true}
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
