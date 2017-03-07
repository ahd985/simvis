import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown, Table } from 'semantic-ui-react'
import getForm from '../components/modelForm'
import ConditionPickerModal from '../components/conditionPickerModal'

export default class ModelPickerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open:false,
            model:null,
            modelRequirements:null,
            form:{
                selectedConditions:[]
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
        this.setState(
            {
                modelRequirements:this.requirements[d.value]
            }
        )
    }

    addCondition(condition) {
        this.setState((prevState) => {
            return {
                form: {
                    ...prevState.form,
                    selectedConditions:prevState.form.selectedConditions.slice().concat(condition),
                }
            }
        })
    }

    handleFormChange(e, arg) {
        this.setState((prevState) => {
            return {
                form: {
                    ...prevState.form,
                    [arg]: event.target ? event.target.value : null
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
                    return <form.tag key={arg} onChange={(value) => {this.handleFormChange(value, arg)}}/>
                } else {
                    return false
                }
            }).filter((arg) => {
                if (arg) {return true} else {return false}
            });

            modelForm = <Form onSubmit={this.handleSubmit}>
                {modelFormArgs}
            </Form>;

            const formConditions = this.state.form.selectedConditions.map((d) => {
                return (
                    <Table.Row key={d.name}>
                        <Table.Cell>
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
                            <ConditionPickerModal conditions={this.state.modelRequirements.conditions} addCondition={this.addCondition}/>
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
