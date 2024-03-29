import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Modal, Message, Popup, Input, Form, Accordion } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Draggable from 'react-draggable';

import shapeSets from '../components/shapes.jsx'
import Shape from '../components/shapeElements.jsx'
import { addShape, setLayout } from '../actions/index.jsx'

class LeftSideBarMenu extends Component {
    constructor(props) {
        super(props);

        this.resizerWidth = 2;

        this.handleMove = this.handleMove.bind(this)
    }

    handleMove(e, ui) {
        const width = Math.max(this.props.leftSideBarWidth + ui.deltaX, this.resizerWidth);
        this.props.setLayout("leftSideBarWidth", width)
    }

    render() {
        const numCols = Math.floor((this.props.leftSideBarWidth - this.resizerWidth) / 50);
        var panels = shapeSets.map((shapeSet) => {
            return {
                title:shapeSet.name,
                content: <GriddedSubMenu shapes={shapeSet.shapes} cols={numCols} addShape={this.props.addShape}/>
            }
        });

        /* TODO - consider re-enabling resizer
        <Draggable onDrag={this.handleMove} axis={"none"}>
            <div className={"left-sidebar-resizer"} style={{width:this.resizerWidth, right:-this.resizerWidth}}></div>
        </Draggable>
        */

        return (
            <div style={{width:this.props.leftSideBarWidth - this.resizerWidth}} id="left-sidebar">
                <div style={{width:this.props.leftSideBarWidth - this.resizerWidth}}>
                    { numCols > 0 ? <Accordion styled panels={panels} exclusive={false} defaultActiveIndex={0}/> : null}
                </div>
                <div className={"left-sidebar-resizer"} style={{width:this.resizerWidth, right:-this.resizerWidth}}></div>
            </div>
        )
    }
}

class GriddedSubMenu extends Component {
    constructor(props) {
        super(props);

        this.getShape = this.getShape.bind(this);
    }

    getShape(e, shape) {
        this.props.addShape(shape)
    }

    render() {
        var getShape = this.getShape;
        const leftSideBarWidth = this.props.leftSideBarWidth;

        return (
            <Grid stackable padded textAlign={"center"} columns={this.props.cols}>
                {this.props.shapes.map(function(shape, i) {
                    const viewbox = `${shape.bbox.x0-5} ${shape.bbox.y0-5} ${shape.bbox.w0+10} ${shape.bbox.h0+10}`;

                    const a = <a id={shape.id} className="menu-item" name={shape.name} onClick={(e) => getShape(e, shape)}>
                        <svg className="menu-icon" width="40" height="40" viewBox={viewbox} preserveAspectRatio="xMidYMid">
                            <g className="shape-svg-container">
                                <g className="shape-svg" style={shape.iconStyle ? shape.iconStyle : null}>
                                    <Shape elements={shape.elements} objectBBox={shape.bbox}/>
                                </g>
                            </g>
                        </svg>
                    </a>;

                    return (
                        <Grid.Column key={i} style={{"paddingLeft":4, "paddingRight":4}}>
                            <Popup
                                trigger={a}
                                content={shape.description ? shape.name + ": " + shape.description : shape.name}
                                position='right center'
                                style={{left:leftSideBarWidth}}
                            />
                        </Grid.Column>
                    );
                })}
            </Grid>
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({
    leftSideBarWidth:shapeCollection.present.layout.leftSideBarWidth
});

const mapDispatchToProps = {
    addShape:addShape,
    setLayout:setLayout
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBarMenu)
