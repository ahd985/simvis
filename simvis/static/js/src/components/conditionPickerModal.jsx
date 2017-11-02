import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown, Table } from 'semantic-ui-react'
import getFormFromArgs from '../components/modelForm.jsx'
import conditionIconMap from './conditionIcons.jsx'
import { unwrapValidators } from '../utility/validators.jsx'

export default class ConditionPickerModal extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            open:false,
            conditionSelected:null,
            form:{
                report:false,
                opacity:1
            }
        }

        this.state = {
            ...this.defaultState
        };

        this.iconOrder = ["staticLevel", "dynamicLevel", "background", "zonalY", "rect",
            "equalY", "colorScale", "logical", "showHide"];

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleRemoveCondition = this.handleRemoveCondition.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleOpen() {
        if (this.props.condition) {
            this.setState({
                open:true,
                conditionSelected:this.props.conditionRequirements[this.props.condition.type],
                form:this.props.condition
            })
        } else {
            this.setState({open:true})
        }
    }

    handleClose(canceled) {
        if (!canceled) {
            if (!this.validateForm()) {
                return
            }

            if (this.props.conditionIndex != null) {
                this.props.editCondition(this.state.form, this.props.conditionIndex)
            } else {
                this.props.editCondition(this.state.form)
            }
        }

        this.setState({open:false})
    }

    handleClick(type) {
        this.setState((prevState) => {
            return {
                conditionSelected: this.props.conditionRequirements[type],
                form: {
                    ...prevState.form,
                    type:type,
                }
            }
        })
    }

    handleFormChange(e, f, arg, argOverride) {
        e.persist ? e.persist() : null;
        this.setState((prevState) => {
            if (argOverride) {
                return {
                    form: {
                        ...prevState.form,
                        ...f
                    }
                }
            } else {
                return {
                    form: {
                        ...prevState.form,
                        [arg]: f.value ? f.value : null
                    }
                }
            }
        })
    }

    handleRemoveCondition() {
        this.setState({
            ...this.defaultState,
            open:true
        })
    }

    validateForm() {
        return true
    }

    render() {
        let conditionSelection=null;
        let conditionForm=null;
        if (this.state.conditionSelected) {
            const name = this.state.form.type[0].toUpperCase() + this.state.form.type.substring(1);

            const dataHeaderOptions = this.props.dataHeaders.map((header, i) => {
                return {key:i, value:i, text:header}
            });

            conditionSelection = (
                <Grid container columns={1} verticalAlign={"bottom"} centered padded='vertically' textAlign={"center"}>
                    <Grid.Column style={{paddingLeft:0}}>
                        <div className="condition-icon">
                            <div><b>{name}</b></div>
                            {conditionIconMap[this.state.form.type]}
                        </div>
                    </Grid.Column>
                    <div style={{position:"absolute", top:"5px", right:"5px"}}>
                        <Button icon onClick={this.handleRemoveCondition}><Icon name='erase' /></Button>
                    </div>
                </Grid>
            );

            const args = Object.keys(this.state.conditionSelected.args);
            const data = this.props.data;
            const onChange = this.handleFormChange;
            const validators = unwrapValidators(this.state.conditionSelected.validators);

            const conditionArgs = getFormFromArgs(args, data, onChange, this.state.form, dataHeaderOptions, validators)

            conditionForm = <Form onSubmit={(e) => {e.preventDefault()}}>
                {conditionArgs}
            </Form>
        } else {
            const allowedConditions = this.props.conditionRequirements;

            conditionSelection = <Grid container columns={4}>
                {this.iconOrder.filter((e) => {
                    if (allowedConditions.hasOwnProperty(e.toLowerCase())) {
                        return true
                    }

                    return false
                }).map((e,i) => {
                    const name = e[0].toUpperCase() + e.substring(1);
                    return <Grid.Column key={i}>
                            <Button onClick={() => this.handleClick(e.toLowerCase())}>
                                    <a>
                                        {conditionIconMap[e]}
                                    </a>
                                <div>{name}</div>
                            </Button>
                        </Grid.Column>
                })}
            </Grid>
        }

        let trigger = <Button attached="bottom" icon onClick={this.handleOpen}><Icon name="add circle"/></Button>;
        if (this.props.triggerIcon) {
            trigger = <Button onClick={this.handleOpen}><a>{this.props.triggerIcon}</a></Button>
        }

        return (
            <Modal trigger={trigger} open={this.state.open}>
                <Modal.Content>
                    {conditionSelection}
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
