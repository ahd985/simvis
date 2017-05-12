import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown, Table } from 'semantic-ui-react'
import getForm from '../components/modelForm'
import ConditionPickerModal from '../components/conditionPickerModal'
import {cellButtonIcon} from '../components/modelButtons'

import ssv from '../../ssv.min.js'

export default class ModelPickerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open:false,
            model:null,
            modelRequirements:null,
            form:{
                ids:this.props.ids,
                conditions:[]
            }
        };

        this.requirements = ssv.get_type_requirements();
        this.options = this.generate_options(this.requirements);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelectModel = this.handleSelectModel.bind(this);
        this.addCondition = this.addCondition.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
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
            if (!this.validateForm()) {
                return
            }
            this.props.setShapeModel(this.state.form)
        }

        this.setState({open:false})
    }

    handleSelectModel(e, d) {
        this.setState((prevState) => {
            return {
                modelRequirements:this.requirements[d.value],
                form: {
                    type:d.value.toLowerCase(),
                    ...prevState.form
                }
            }
        })
    }

    addCondition(condition) {
        this.setState((prevState) => {
            return {
                form: {
                    ...prevState.form,
                    conditions:prevState.form.conditions.slice().concat(condition)
                }
            }
        })
    }

    handleFormChange(e, arg) {
        e.persist();
        this.setState((prevState) => {
            return {
                form: {
                    ...prevState.form,
                    [arg]: e.target ? e.target.value : null
                }
            }
        })
    }

    validateForm() {
        return true
    }

    render() {
        let modelForm=null;
        let modelConditions=null;
        if (this.state.modelRequirements) {
            let modelFormArgs = Object.keys(this.state.modelRequirements.args).map((arg) => {
                let form = getForm(arg);
                if (form) {
                    return <form.tag key={arg} onChange={(e) => {this.handleFormChange(e, arg)}}/>
                } else {
                    return false
                }
            }).filter((arg) => {
                if (arg) {return true} else {return false}
            });

            modelForm = <Form onSubmit={(e) => {e.preventDefault()}}>
                {modelFormArgs}
            </Form>;

            const formConditions = this.state.form.conditions.map((d) => {
                return (
                    <Table.Row key={d.name}>
                        <Table.Cell key={d.name + "-2"}>
                            d.name
                        </Table.Cell>
                    </Table.Row>
                )
            });

            modelConditions = <Table compact celled definition>
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
                            <ConditionPickerModal conditions={this.state.modelRequirements.conditions} addCondition={this.addCondition} data={this.props.data} dataHeaders={this.props.dataHeaders}/>
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
                    <Button>
                        <a>
                            {cellButtonIcon}
                        </a>
                    </Button>
                    {modelForm}
                    {modelConditions}
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Cancel' onClick={() => this.handleClose(true)} />
                    <Button content='Done' onClick={() => this.handleClose()} />
                </Modal.Actions>
            </Modal>
        )
    }
}
