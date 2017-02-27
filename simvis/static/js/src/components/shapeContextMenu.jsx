import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form } from 'semantic-ui-react'

export default class ShapeContextMenu extends Component {
    constructor(props) {
        super(props);

        this.moveForwards = this.moveForwards.bind(this);
        this.moveBackwards = this.moveBackwards.bind(this);
        this.moveToFront = this.moveToFront.bind(this);
        this.moveToBack = this.moveToBack.bind(this)
    }

    moveForwards() {
        this.props.reorderShapes(this.props.contextUUIDs, 1);
        this.props.close()
    }

    moveBackwards() {
        this.props.reorderShapes(this.props.contextUUIDs, -1);
        this.props.close()
    }

    moveToFront() {
        this.props.reorderShapes(this.props.contextUUIDs, "F");
        this.props.close()
    }

    moveToBack() {
        this.props.reorderShapes(this.props.contextUUIDs, "B");
        this.props.close()
    }

    render() {
        const menu = <Menu secondary vertical>
            <Menu.Item name='moveForwards' onClick={this.moveForwards}/>
            <Menu.Item name='moveBackwards' onClick={this.moveBackwards}/>
            <Menu.Item name='moveToFront' onClick={this.moveToFront}/>
            <Menu.Item name='moveToBack' onClick={this.moveToBack}/>
        </Menu>;

        return (
            <Popup open={this.props.contextMenuActive} content={menu}
                   style={this.props.contextMenuStyle} basic on='click'
                   onClose={this.props.close}/>
        )
    }
}
