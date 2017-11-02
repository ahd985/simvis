import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form } from 'semantic-ui-react'
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux'

import Diagram from './diagram.jsx'
import TopMenu from './topMenu.jsx'
import ShapeContextMenu from '../components/shapeContextMenu.jsx'
import RightSideBarMenu from './rightSidebar.jsx'
import LeftSideBarMenu from './leftSidebar.jsx'
import {reorderShapes } from '../actions/index.jsx'
import {generateB64Grid} from '../utility/utility.jsx'

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
        const scrollWidth = Math.max(0, (document.getElementById("diagram-mat").offsetWidth - document.getElementById("diagram-container").offsetWidth) / 2);
        let container = document.getElementById("diagram-container");
        container.scrollLeft = scrollWidth;
        window.addEventListener('resize', () => this.forceUpdate())
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.forceUpdate())
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
        const padding = 100;
        const scale = this.props.layout.scale / 100;
        const dims = {width:this.props.layout.diagramWidth*scale, height:this.props.layout.diagramHeight*scale};
        const containerWidth = document.getElementById('simvis-container').offsetWidth
            - this.props.layout.leftSideBarWidth
            - (this.props.layout.rightSideBarPresent ? this.props.layout.rightSideBarWidth : 0);
        const xOffset = Math.max(padding, (containerWidth - dims.width) / 2);

        const diagramStyle = {
            top:padding,
            left:xOffset,
            width:dims.width,
            height:dims.height
        };

        const matStyle = {
            position:"absolute",
            top:0,
            left:0,
            width:dims.width + 2*padding,
            height:dims.height + 2*padding
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
                            <div className="diagram-mat" id="diagram-mat" style={matStyle}></div>
                            <div className="diagram-background" style={{...diagramStyle, "backgroundImage":b64Grid}}></div>
                            <Diagram contextMenuHandler={this.contextMenuHandler} svgStyle={diagramStyle} scale={scale}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({
    layout:shapeCollection.present.layout
});

const mapDispatchToProps = {
    reorderShapes:reorderShapes
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawContainer)
