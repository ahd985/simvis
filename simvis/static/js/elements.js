import React, { Component } from 'react'

var elementMap = {
    "Box": Box
};

class Box extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <rect {...this.props.dims} />
        )
    }
}

export default class Element extends Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                fill: "grey",
                stroke: "black",
                cursor: "move"
            },
            toggled: false,
            pos: {x: 400, y:400},
            dims: {height: 50, width:50}
        };

        this.toggle = this.toggle.bind(this);
        this.dragMove = this.dragMove.bind(this);
        this.dragResize = this.dragResize.bind(this);
    }

    toggle(e) {
        this.setState((prevState, props) => {
            return {toggled: !prevState.toggled};
        });
    }

    dragMove(e) {
        console.log(e)
    }

    dragResize(e) {
        console.log(e)
    }

    render() {
        let Tag = elementMap[this.props.type];
        let visibility_style = {"visibility": this.state.toggled ? "visible" : "hidden"};
        let translate = `translate(${this.state.pos.x}, ${this.state.pos.y})`;

        const margin = 5;
        let outline_dims = {height: this.state.dims.height + 2*margin, width: this.state.dims.width + 2*margin};

        const outline_handle_size = 2;

        return (
            <g transform={translate}>
                <g style={this.state.style} onClick={this.toggle} onDrag={this.dragMove}>
                    <Tag dims={this.state.dims}/>
                </g>
                <g style={visibility_style}>
                    <rect x={-margin} y={-margin} {...outline_dims}
                           className="element-outline"/>
                    <circle cx={outline_dims.width - margin} cy={outline_dims.height - margin} r={outline_handle_size}
                            className="resizer-circle" onDrag={this.dragResize}/>
                </g>
            </g>
        )
    }
}
