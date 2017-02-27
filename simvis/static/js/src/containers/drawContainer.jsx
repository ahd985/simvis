import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form } from 'semantic-ui-react'
import { SketchPicker } from 'react-color';

import Diagram from './diagram.js'
import TopMenu from './topMenu.js'
import ShapeContextMenu from '../components/shapeContextMenu.js'
import RightSideBarMenu from './rightSidebar.js'
import LeftSideBarMenu from './leftSidebar.js'

export default class DrawContainer extends Component {
    constructor(props) {
        super(props);

        this.state={
            contextMenuActive:false,
            contextMenuStyle:{},
            contextUUIDs:null
        };

        this.contextMenuHandler = this.contextMenuHandler.bind(this);
        this.closeContextMenu = this.closeContextMenu.bind(this)
    }

    contextMenuHandler(e, uuid) {
        this.setState({
            contextMenuActive:true,
            contextMenuStyle:{position:"absolute", left:e.clientX, top:e.clientY},
            contextUUIDs:[uuid]
        });
    }

    closeContextMenu() {
        this.setState({
            contextMenuActive:false,
            contextUUIDs:null
        });
    }

    render() {
        return (
            <div className="draw-container">
                <ShapeContextMenu contextMenuActive={this.state.contextMenuActive}
                                  contextMenuStyle={this.state.contextMenuStyle}
                                  close={this.closeContextMenu}
                                  reorderShapes={this.props.shapeHandlers.reorderShapes}
                                  contextUUIDs={this.state.contextUUIDs}/>
                <div className="draw-container-top">
                    <TopMenu />
                </div>
                <div className="draw-container-bottom">
                    <LeftSideBarMenu shapeHandlers={this.props.shapeHandlers}/>
                    <RightSideBarMenu selectedShapes={this.props.selectedShapes}
                                      selectedStyle={this.props.selectedStyle}
                                      shapeHandlers={this.props.shapeHandlers}/>

                    <div className="diagram-wrapper">
                        <div className="diagram-container">
                            <div className="diagram-background"></div>
                            <Diagram shapes={this.props.shapes}
                                     shapeHandlers={this.props.shapeHandlers}
                                     selectedShapes={this.props.selectedShapes}
                                     contextMenuHandler={this.contextMenuHandler}
                                     selectedStyle={this.props.selectedStyle}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
