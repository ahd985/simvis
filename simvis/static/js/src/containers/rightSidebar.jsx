import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setShapeStyle, setShapeModel } from '../actions'

import ssv from '../../ssv.min.js'

import NumberPicker from '../components/numberPicker';
import ColorPickerModal from '../components/colorPickerModal'
import ModelPickerModal from '../components/modelPickerModal'

class RightSideBarMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            activeItem: 'model'
        };

        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleStrokeWidthChange = this.handleStrokeWidthChange.bind(this);
        this.addModelToShape = this.addModelToShape.bind(this)
    }

    handleTabClick(e, {name}) {
        this.setState({activeItem: name})
    }

    handleStrokeWidthChange(e) {
        this.props.setShapeStyle({strokeWidth:e.value + ''})
    }

    addModelToShape() {
        this.props.setShapeModel()
    }

    render() {
        const { visible } = this.state;
        const { activeItem } = this.state;

        let submenu, menu;
        if (!this.props.selectedShapes.length) {
            submenu = null;
            menu = <Sidebar animation='overlay' direction="right" width='wide' visible={visible} id="right-sidebar">
            </Sidebar>
        } else {
            if (activeItem === 'model') {
                submenu = <Segment attached='bottom'>
                    <Button onClick={this.addModelToShape}/>
                    <ModelPickerModal setShapeModel={this.props.setShapeModel}/>
                </Segment>;
            } else if (activeItem === 'style') {
                submenu = <Segment attached='bottom'>
                    <Form.Field width="1" control={NumberPicker} label="Stroke-Width"
                                   name={"strokeWidthPicker"}
                                   value={this.props.selectedStyle.strokeWidth}
                                   onChange={this.handleStrokeWidthChange}
                                   min={0}/>
                    <ColorPickerModal color={this.props.selectedStyle.fill} setShapeStyle={this.props.setShapeStyle} desc="Fill" attr="fill"/>
                    <ColorPickerModal color={this.props.selectedStyle.stroke} setShapeStyle={this.props.setShapeStyle} desc="Stroke" attr="stroke"/>
                </Segment>;
            } else if (activeItem === 'arrange') {
                submenu = <Segment attached='bottom'><div>YYY</div></Segment>;
            }

            menu = <Sidebar animation='overlay' direction="right" width='wide' visible={visible} id="right-sidebar">
                <Menu attached='top' tabular>
                    <Menu.Item name='model' active={activeItem === 'model'} onClick={this.handleTabClick} />
                    <Menu.Item name='style' active={activeItem === 'style'} onClick={this.handleTabClick} />
                    <Menu.Item name='arrange' active={activeItem === 'arrange'} onClick={this.handleTabClick} />
                </Menu>
                {submenu}
            </Sidebar>
        }

        return (
            menu
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({
    selectedShapes:shapeCollection.selectedShapes,
    selectedStyle:shapeCollection.selectedStyle
});

const mapDispatchToProps = {
    setShapeStyle:setShapeStyle,
    setShapeModel:setShapeModel
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSideBarMenu)
