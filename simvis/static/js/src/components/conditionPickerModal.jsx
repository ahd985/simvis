import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown, Table } from 'semantic-ui-react'
import getForm from '../components/modelForm'
import conditionIconMap from './conditionIcons'

export default class ConditionPickerModal extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            open:false,
            conditionSelected:null,
            dataSelected:null,
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
        this.handleSelectData = this.handleSelectData.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleRemoveCondition = this.handleRemoveCondition.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleOpen() {
        this.setState({open:true})
    }

    handleClose(canceled) {
        if (!canceled) {
            if (!this.validateForm()) {
                return
            }
            this.props.addCondition(this.state.form)
        }

        this.setState({open:false})
    }

    handleClick(type) {
        this.setState((prevState) => {
            return {
                conditionSelected: this.props.conditions[type],
                form: {
                    ...prevState.form,
                    type:type,
                }
            }
        })
    }

    handleSelectData(e, d) {
        this.setState((prevState) => {
            return {
                dataSelected:this.props.data.map((row) => {return row[d.value]}),
                dataHeader:d.text,
                form: {
                    ...prevState.form,
                    dataIndex:d.value
                }
            }
        })
    }

    handleFormChange(e, arg, argOverride) {
        e.persist ? e.persist() : null;
        this.setState((prevState) => {
            return {
                form: {
                    ...prevState.form,
                    [argOverride ? argOverride : arg]: e.target ? e.target.value : null
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

            conditionSelection = (
                <div>
                    <div><h3>{name}</h3></div>
                    {conditionIconMap[this.state.form.type]}
                    <div style={{position:"absolute", top:"5px", right:"5px"}}>
                        <Button onClick={this.handleRemoveCondition}>Remove</Button>
                    </div>
                </div>
            );

            let conditionArgs = Object.keys(this.state.conditionSelected.args).map((arg) => {
                let form = getForm(arg);
                if (form) {
                    return <form.tag key={arg} data={this.state.dataSelected} onChange={(e, f, argOverride) => {this.handleFormChange(e, arg, argOverride)}}/>
                } else {
                    return false
                }
            }).filter((arg) => {
                if (arg) {return true} else {return false}
            });

            const dataHeaderOptions = this.props.dataHeaders.map((header, i) => {
                return {key:i, value:i, text:header}
            });

            conditionForm = <Form onSubmit={(e) => {e.preventDefault()}}>
                <Dropdown placeholder='Header' search selection options={dataHeaderOptions}
                    onChange={this.handleSelectData}/>
                {this.state.dataSelected ? conditionArgs : null}
            </Form>
        } else {
            const allowedConditions = this.props.conditions;

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

        return (
            <Modal trigger={<Button onClick={this.handleOpen} floated='right'>{"Add Condition"}</Button>} open={this.state.open}>
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
