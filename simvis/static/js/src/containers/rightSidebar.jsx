import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown, Table } from 'semantic-ui-react'
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux'
import { setStrokeWidth } from '../actions'

import ssv from '../../ssv.min.js'

import getForm from '../components/modelFormMap.js'
import NumberPicker from '../components/numberPicker.js';

class RightSideBarMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            activeItem: 'model'
        };

        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleNumberPickerChange = this.handleNumberPickerChange.bind(this);
        this.addModelToShape = this.addModelToShape.bind(this)
    }

    handleTabClick(e, {name}) {
        this.setState({activeItem: name})
    }

    handleNumberPickerChange(e) {
        this.props.shapeHandlers.setShapeStyle({strokeWidth:e.value + ''})
    }

    addModelToShape() {
        this.props.shapeHandlers.addModelToShape()
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
                    <ModelPickerModal/>
                </Segment>;
            } else if (activeItem === 'style') {
                submenu = <Segment attached='bottom'>
                    <Form.Field width="1" control={NumberPicker} label="Stroke-Width"
                                   name={"strokeWidthPicker"}
                                   value={1}
                                   onChange={this.props.handleStrokeWidthChange}
                                   min={0}/>
                    <ColorPickerModal color={this.props.selectedStyle.fill} shapeHandlers={this.props.shapeHandlers} desc="Fill" attr="fill"/>
                    <ColorPickerModal color={this.props.selectedStyle.stroke} shapeHandlers={this.props.shapeHandlers} desc="Stroke" attr="stroke"/>
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

class ColorPickerModal extends Component {
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
            this.props.shapeHandlers.setShapeStyle(style)
        }

        this.setState({open:false})
    }

    handleChangeComplete(color) {
        this.setState({color:color})
    }

    render() {
        return (
            <Modal trigger={<Button onClick={this.handleOpen}>{this.props.desc}</Button>} open={this.state.open}>
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

class ModelPickerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open:false,
            model:null,
            modelRequirements:null,
            selectedConditions:[]
        };

        this.requirements = ssv.get_type_requirements();
        this.options = this.generate_options(this.requirements);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelectModel = this.handleSelectModel.bind(this);
    }

    generate_options(requirements) {
        var options = [];

        const keys = Object.keys(requirements).sort();
        keys.map(function(key) {
           options.push({key:key, value:key, text:key})
        });

        return options
    }

    handleOpen() {
        this.setState({open:true})
    }

    handleClose(canceled) {
        if (!canceled) {

        }

        this.setState({open:false})
    }

    handleSelectModel(e, d) {
        this.setState(
            {
                modelRequirements:this.requirements[d.value]
            }
        )
    }

    render() {
        var modelForm=null;
        var modelArgs=null;
        if (this.state.modelRequirements) {
            modelArgs = Object.keys(this.state.modelRequirements.args).map((arg) => {
                let form = getForm(arg);
                if (form) {
                    return <form.tag key={arg}/>
                } else {
                    return false
                }
            }).filter((arg) => {
                if (arg) {return true} else {return false}
            });

            const formConditions = this.state.selectedConditions.map((d) => {
                return (
                    <Table.Row key={d.name}>
                        <Table.Cell>
                            d.name
                        </Table.Cell>
                    </Table.Row>
                )
            });

            modelForm = <Table compact celled definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Condition</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {formConditions}
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell>
                            <ConditionPickerModal conditions={this.state.modelRequirements.conditions}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        }

        return (
            <Modal trigger={<Button onClick={this.handleOpen}>{"Add Model"}</Button>} open={this.state.open}>
                <Modal.Content>
                    <Dropdown placeholder='Model' search selection options={this.options}
                              onChange={this.handleSelectModel} />
                    {modelArgs}
                    {modelForm}
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Cancel' onClick={() => this.handleClose(true)} />
                    <Button content='Done' onClick={() => this.handleClose()} />
                </Modal.Actions>
            </Modal>
        )
    }
}

class ConditionPickerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open:false,
            options:Object.keys(this.props.conditions).map((key) => {
                return {
                    key:key,
                    value:key,
                    text:key
                }
            }),
            conditionSelected:null
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelectCondition = this.handleSelectCondition.bind(this);
    }

    handleOpen() {
        this.setState({open:true})
    }

    handleClose(canceled) {
        if (!canceled) {

        }

        this.setState({open:false})
    }

    handleSelectCondition(e, d) {
        this.setState(
            {
                conditionSelected:this.props.conditions[d.value]
            }
        )
    }

    render() {
        let conditionForm = null;
        if (this.state.conditionSelected) {
            let conditionArgs = Object.keys(this.state.conditionSelected.args).map((arg) => {
                let form = getForm(arg);
                if (form) {
                    return <form.tag key={arg}/>
                } else {
                    return false
                }
            }).filter((arg) => {
                if (arg) {return true} else {return false}
            });

            conditionForm = <div>
                <DataForm headers={this.props.dataHeaders}/>
                {conditionArgs}
            </div>
        }

        return (
            <Modal trigger={<Button onClick={this.handleOpen} floated='right'>{"Add Condition"}</Button>} open={this.state.open}>
                <Modal.Content>
                    <Dropdown placeholder='Condition' search selection options={this.state.options}
                              onChange={this.handleSelectCondition} />
                    {conditionForm}
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Cancel' onClick={() => this.handleClose(true)} />
                    <Button content='Done' onClick={() => this.handleClose()} />
                </Modal.Actions>
            </Modal>
        )
    }
}

class DataForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Dropdown placeholder='Header' search selection options={[{key:"x", value:"x", text:"x"}]}
                              onChange={() => {}} />
        )
    }
}

const mapStateToProps = ({ shapeController}) => ({});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(RightSideBarMenu)
