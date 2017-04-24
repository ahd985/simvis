import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown, Table } from 'semantic-ui-react'
import { SketchPicker } from 'react-color';

export default class ColorPickerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open:false,
            color:this.props.color
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }

    handleOpen() {
        this.setState({open:true})
    }

    handleClose(canceled) {
        if (!canceled) {
            let style = {};
            style[this.props.attr] = this.state.color.hex;
            this.props.setShapeStyle(style)
        }

        this.setState({open:false})
    }

    handleChangeComplete(color) {
        this.setState({color:color})
    }

    render() {
        return (
            <Modal trigger={<Button className="color-picker-btn" onClick={this.handleOpen}>{this.props.desc}<span className="color-picker-icon" style={{background:this.props.color}}></span></Button>} open={this.state.open}>
                <Modal.Content>
                    <SketchPicker color={this.state.color} onChangeComplete={this.handleChangeComplete}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Cancel' onClick={() => this.handleClose(true)} />
                    <Button content='Done' onClick={() => this.handleClose()} />
                </Modal.Actions>
            </Modal>
        )
    }
}
