import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form } from 'semantic-ui-react'
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux'

import Diagram from './diagram'
import TopMenu from './topMenu'
import ShapeContextMenu from '../components/shapeContextMenu'
import RightSideBarMenu from './rightSidebar'
import LeftSideBarMenu from './leftSidebar'
import {reorderShapes } from '../actions'
import {generateB64Grid} from '../utility/utility'

class DrawContainer extends Component {
    constructor(props) {
        super(props);

        this.state={
            contextMenuActive:false,
            contextMenuStyle:{}
        };

        this.contextMenuHandler = this.contextMenuHandler.bind(this);
        this.closeContextMenu = this.closeContextMenu.bind(this)
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    contextMenuHandler(e) {
        this.setState({
            contextMenuActive:true,
            contextMenuStyle:{position:"absolute", left:e.clientX, top:e.clientY}
        });
    }

    closeContextMenu() {
        this.setState({
            contextMenuActive:false
        });
    }

    render() {
        const padding = 50;
        const scale = this.props.layout.scale / 100;
        const dims = {width:this.props.layout.diagramWidth*scale, height:this.props.layout.diagramHeight*scale};
        const xOffset = dims.width / 2;

        const childStyle = {
            top:padding,
            left:padding,
            width:dims.width,
            height:dims.height
        };

        const b64Grid = generateB64Grid(10, scale);

        return (
            <div className="draw-container">
                <ShapeContextMenu contextMenuActive={this.state.contextMenuActive}
                                  contextMenuStyle={this.state.contextMenuStyle}
                                  close={this.closeContextMenu}
                                  reorderShapes={this.props.reorderShapes}/>
                <div className="draw-container-top">
                    <TopMenu />
                </div>
                <div className="draw-container-bottom">
                    <LeftSideBarMenu />
                    <RightSideBarMenu />

                    <div className="diagram-wrapper" style={{left:this.props.layout.leftSideBarWidth,
                            right:(this.props.layout.rightSideBarPresent ? this.props.layout.rightSideBarWidth : 0)}}>
                        <div className="diagram-container" id="diagram-container">
                            <div className="diagram-mat" style={{position:"absolute", top:0, left:0, width:dims.width + 2*padding, height:dims.height + 2*padding}}></div>
                            <div className="diagram-background" style={{...childStyle, "backgroundImage":b64Grid}}></div>
                            <Diagram contextMenuHandler={this.contextMenuHandler} svgStyle={childStyle} scale={scale}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({
    layout:shapeCollection.layout
});

const mapDispatchToProps = {
    reorderShapes:reorderShapes
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawContainer)
