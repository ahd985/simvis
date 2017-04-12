import React, { Component } from 'react'
import ShapeContainer from './shapeContainer'
import { connect } from 'react-redux'

import { clearSelectedShapes, selectShapesInOutline } from '../actions'

class Diagram extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false,
            dragX:0,
            dragY:0,
            dragWidth:0,
            dragHeight:0,
            clientX:0,
            clientY:0,
            selectOutline:{x:0, y:0, width:0, height:0}
        };

        this.toggle = this.toggle.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    toggle() {
        this.props.clearSelectedShapes();
    }

    handleMouseDown(e) {
        e.preventDefault();
        const dim = e.target.getBoundingClientRect();
        const x = e.clientX - dim.left - 1;
        const y = e.clientY - dim.top - 1;

        if (!(e.button == 2)) {
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

        if (this.state.dragWidth > 5 || this.state.dragHeight > 5) {
            const selectOutline = {
                x:this.state.dragWidth < 0 ? this.state.dragX + this.state.dragWidth : this.state.dragX,
                y:this.state.dragHeight < 0 ? this.state.dragY + this.state.dragHeight: this.state.dragY,
                width:Math.abs(this.state.dragWidth),
                height:Math.abs(this.state.dragHeight)
            };

            this.props.selectShapesInOutline(selectOutline);
            this.setState((prevState) => {
                return {
                    clicked:false,
                    selectOutline:null
                }
            })
        } else {
            this.toggle();
            this.setState({
                clicked:false
            })
        }
    }

    render() {
        const selectedShapes = this.props.selectedShapes;
        const contextMenuHandler = this.props.contextMenuHandler;
        const selectOutline = this.state.selectOutline;
        const scale = this.props.scale;

        const renderedShapes = this.props.shapes.map(function(shapeData) {
            const toggled = selectedShapes.indexOf(shapeData.uuid) > -1;

            return (
                <ShapeContainer uuid={shapeData.uuid} {...shapeData.shape}
                                toggled={toggled}
                                key={shapeData.uuid}
                                contextMenuHandler={contextMenuHandler}
                                position={shapeData.position}
                                dims={shapeData.dims}
                                deltaDims={shapeData.deltaDims}
                                selectOutline={selectOutline}
                                style={shapeData.style}
                                scale={scale}/>
            )
        });

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
                <svg className="diagram" id="draw-svg" xmlns="http://www.w3.org/2000/svg" style={this.props.svgStyle}>
                    <rect className="diagram-space ignore" onClick={this.toggle}
                          onMouseDown={this.handleMouseDown}/>
                    <g>
                        {renderedShapes}
                    </g>
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

const mapStateToProps = ({ shapeCollection }) => ({
    shapes:shapeCollection.shapes,
    selectedShapes:shapeCollection.selectedShapes
});

const mapDispatchToProps = {
    clearSelectedShapes:clearSelectedShapes,
    selectShapesInOutline:selectShapesInOutline
};

export default connect(mapStateToProps, mapDispatchToProps)(Diagram)
