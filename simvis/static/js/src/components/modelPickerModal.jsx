import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown, Table } from 'semantic-ui-react'
import getForm from '../components/modelForm'
import ConditionPickerModal from '../components/conditionPickerModal'
import { cellButtonIcon, heatmapButtonIcon, lineButtonIcon, toggleButtonIcon, legendButtonIcon, reportButtonIcon, tableButtonIcon } from '../components/modelButtons'

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
        this.handleClick = this.handleClick.bind(this);
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

    handleClick(type) {
        this.setState((prevState) => {
            return {
                modelRequirements:this.requirements[type],
                form: {
                    type,
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
                    <Grid container>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Button onClick={() => this.handleClick("Cell")}>
                                    <a>
                                        {cellButtonIcon}
                                    </a>
                                    <div>Cell</div>
                                </Button>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Button onClick={() => this.handleClick("Heatmap")}>
                                    <a>
                                        {heatmapButtonIcon}
                                    </a>
                                    <div>Heatmap</div>
                                </Button>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Button onClick={() => this.handleClick("Line")}>
                                    <a>
                                        {lineButtonIcon}
                                    </a>
                                    <div>Line</div>
                                </Button>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Button onClick={() => this.handleClick("Toggle")}>
                                    <a>
                                        {toggleButtonIcon}
                                    </a>
                                    <div>Toggle</div>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Button onClick={() => this.handleClick("Legend")}>
                                    <a>
                                        {legendButtonIcon}
                                    </a>
                                    <div>Legend</div>
                                </Button>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Button onClick={() => this.handleClick("Report")}>
                                    <a>
                                        {reportButtonIcon}
                                    </a>
                                    <div>Report</div>
                                </Button>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Button onClick={() => this.handleClick("Table")}>
                                    <a>
                                        {tableButtonIcon}
                                    </a>
                                    <div>Table</div>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    {modelForm}
                    {modelConditions}
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Cancel' onClick={() => this.handleClose(true)} />
                </Modal.Actions>
            </Modal>
        )
    }
}
