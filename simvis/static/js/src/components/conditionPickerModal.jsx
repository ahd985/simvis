import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown, Table } from 'semantic-ui-react'
import getForm from '../components/modelFormMap'

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

            conditionForm = <Form>
                <DataForm headers={this.props.dataHeaders}/>
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
