import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

import shapes from '../components/shapes'

import { addShape } from '../actions'

class LeftSideBarMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.toggleVisibility = this.toggleVisibility.bind(this)
    }

    toggleVisibility() {
        this.setState((prevState, props) => {
            return {visible: !prevState.visible};
        });
    }

    render() {
        const { visible } = this.state;
        return (
            <Sidebar animation='overlay' direction="left" width='thin' visible={visible} id="left-sidebar">
                <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
                <GriddedSubMenu addShape={this.props.addShape}/>
            </Sidebar>
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
        const num_cols = 3;
        var getShape = this.getShape;

        return (
            <Grid container textAlign={"center"} columns={num_cols} padded>
                {shapes.map(function(shape, i) {
                    const viewbox = `${shape.bbox.x0-5} ${shape.bbox.y0-5} ${shape.bbox.w0+10} ${shape.bbox.h0+10}`;

                    return (
                        <Grid.Column key={i}>
                            <a id={shape.id} className="menu-item" name={shape.name} onClick={(e) => getShape(e, shape)}>
                                <svg className="menu-icon" width="40" height="40" viewBox={viewbox} preserveAspectRatio="xMidYMid">
                                    <g className="shape-svg-container">
                                        <g className="shape-svg">
                                            <shape.tag />
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </Grid.Column>
                    )
                })}
            </Grid>
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({});

const mapDispatchToProps = {
    addShape:addShape
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBarMenu)
