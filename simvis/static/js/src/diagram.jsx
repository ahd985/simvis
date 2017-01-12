import React, { Component } from 'react'

import Element from './elements.js'

import Draggable from 'react-draggable';

export default class Diagram extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deltaPosition: {
                x: 0,
                y: 0
            },
            controlledPosition: {
                x: -400,
                y: 200
            }
        };

        this.handleDrag = this.handleDrag.bind(this);
        this.adjustXPos = this.adjustXPos.bind(this);
        this.adjustYPos = this.adjustYPos.bind(this);
        this.onControlledDrag = this.onControlledDrag.bind(this);
        this.onControlledDragStop = this.onControlledDragStop.bind(this);
    }

    handleDrag(e, ui) {
        const {x, y} = this.state.deltaPosition;
            this.setState({
                deltaPosition: {
                    x: x + ui.deltaX,
                    y: y + ui.deltaY
            }
        });
    }

    adjustXPos(e) {
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = this.state.controlledPosition;
        this.setState({controlledPosition: {x: x - 10, y}});
    }

    adjustYPos(e) {
        e.preventDefault();
        e.stopPropagation();
        const {controlledPosition} = this.state;
        const {x, y} = this.state.controlledPosition;
        this.setState({controlledPosition: {x, y: y - 10}});
    }

    onControlledDrag(e, position) {
        const {x, y} = position;
        this.setState({controlledPosition: {x, y}});
    }

    onControlledDragStop(e, position) {
        const {x, y} = position;
        this.setState({controlledPosition: {x, y}});
    }

    render() {
        //const elements = this.props.elements;
        const elements = [
            {"type": "Box"}
        ];

        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const {deltaPosition, controlledPosition} = this.state;

        return (
            <svg className="diagram" id="draw-svg">
                <rect className="diagram-space" />
                {elements.map(function(props) {
                    return (
                        <Draggable grid={[25, 25]} {...dragHandlers}>
                            <Element {...props}/>
                        </Draggable>
                    )
                })}
            </svg>
        )
    }
}
