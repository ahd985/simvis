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

    contextMenuHandler(e) {
        this.setState({
            contextMenuActive:true,
            contextMenuStyle:{position:"absolute", left:e.clientX, top:e.clientY}
        });
    }

    closeContextMenu() {
        this.setState({
            contextMenuActive:false,
        });
    }

    render() {
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

                    <div className="diagram-wrapper">
                        <div className="diagram-container">
                            <div className="diagram-background"></div>
                            <Diagram contextMenuHandler={this.contextMenuHandler}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({});

const mapDispatchToProps = {
    reorderShapes:reorderShapes
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawContainer)
