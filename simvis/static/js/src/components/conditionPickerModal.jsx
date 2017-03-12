import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown, Table } from 'semantic-ui-react'
import getForm from '../components/modelForm'

export default class ConditionPickerModal extends Component {
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
            conditionSelected:null,
            form:{}
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelectCondition = this.handleSelectCondition.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
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

    handleSelectCondition(e, d) {
        this.setState(
            {
                conditionSelected:this.props.conditions[d.value]
            }
        )
    }

    handleFormChange(e, arg) {
        e.persist ? e.persist() : null;
        this.setState((prevState) => {
            return {
                form: {
                    ...prevState.form,
                    [arg]: e.target ? e.target.value : null
                }
            }
        })
    }

    handleDataHeaderSelect(e, d) {
        this.setState((prevState) => {
            return {
                form: {
                    ...prevState.form,
                    dataIndex: d.value
                }
            }
        })
    }

    validateForm() {
        return true
    }

    render() {
        let conditionForm = null;
        if (this.state.conditionSelected) {
            let conditionArgs = Object.keys(this.state.conditionSelected.args).map((arg) => {
                let form = getForm(arg);
                if (form) {
                    return <form.tag key={arg} onChange={(e) => {this.handleFormChange(e, arg)}}/>
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
                    onChange={() => {}} />
                {conditionArgs}
            </Form>
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
