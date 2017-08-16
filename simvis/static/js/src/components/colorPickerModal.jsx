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
            <Modal basic={true} trigger={<Button className="color-picker-btn" onClick={this.handleOpen}>{this.props.desc}<span className="color-picker-icon" style={{background:this.props.color}}></span></Button>} open={this.state.open}>
                <Modal.Content>
                    <div className="modal-sketch-picker">
                        <SketchPicker color={this.state.color} onChangeComplete={this.handleChangeComplete}/>
                    </div>
                </Modal.Content>
                <Modal.Actions style={{textAlign:"center"}}>
                    <Button basic color='red' inverted onClick={() => this.handleClose(true)}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' inverted onClick={() => this.handleClose()}>
                        <Icon name='checkmark' /> OK
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
