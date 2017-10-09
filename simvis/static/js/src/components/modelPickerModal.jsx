import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown, Table, Label } from 'semantic-ui-react'
import getFormFromArgs from './modelForm'
import ConditionPickerModal from './conditionPickerModal'
import { animatedModelIconMap, modelIconMap } from './modelIcons'
import conditionIconMap from './conditionIcons'

import ssv from '../../ssv.min.js'

export default class ModelPickerModal extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            open:false,
            modelRequirements:null,
            form:{
                ids:this.props.ids,
                conditions:[]
            }
        };

        this.state = {
            ...this.defaultState
        };

        this.iconOrder = ["cell", "heatmap", "line", "toggle", "legend", "report", "table"];

        this.requirements = ssv.get_type_requirements();
        this.options = this.generate_options(this.requirements);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.editCondition = this.editCondition.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleRemoveModel = this.handleRemoveModel.bind(this);
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
        if (this.props.model) {
            this.setState({
                open:true,
                form:this.props.model,
                modelRequirements:this.requirements[this.props.model.type]
            })
        } else {
            this.setState({open:true});
        }
    }

    handleClose(canceled) {
        if (!canceled) {
            if (!this.validateForm()) {
                return
            }
            this.props.setShapeModel(this.state.form)
        }

        this.setState({...this.defaultState})
    }

    handleRemoveModel() {
        this.setState({
            ...this.defaultState,
            open:true
        })
    }

    handleClick(type) {
        this.setState((prevState) => {
            return {
                modelRequirements:this.requirements[type],
                form: {
                    type:type,
                    ...prevState.form
                }
            }
        })
    }

    editCondition(condition, index) {
        this.setState((prevState) => {
            var form = {
                ...prevState.form,
                conditions:prevState.form.conditions.slice()
            }

            if (index != null) {
                form.conditions[index] = condition
            } else {
                form.conditions.push(condition)
            }

            return {form}
        })
    }

    handleFormChange(e, f, arg) {
        e.persist();

        this.setState((prevState) => {
            return {
                form: {
                    ...prevState.form,
                    [arg]: f.value ? f.value : null
                }
            }
        })
    }

    validateForm() {
        return true
    }

    render() {
        let modelSelection=null;
        let modelForm=null;
        let modelConditions=null;

        if (this.state.modelRequirements) {
            const name = this.state.form.type[0].toUpperCase() + this.state.form.type.substring(1);

            modelSelection = (
                <div>
                    <div><h3>{name}</h3></div>
                    {modelIconMap[this.state.form.type]}
                    <div style={{position:"absolute", top:"5px", right:"5px"}}>
                        <Button icon onClick={this.handleRemoveModel}><Icon name='erase' /></Button>
                    </div>
                </div>
            );

            const args = Object.keys(this.state.modelRequirements.args);
            const onChange = (e, f, arg, argOverride) => {
                this.handleFormChange(e, f, arg)
            };

            const modelFormArgs = getFormFromArgs(args, null, onChange, this.state.form)

            modelForm = <Form onSubmit={(e) => {e.preventDefault()}}>
                {modelFormArgs}
            </Form>;

            modelConditions = <Grid container columns={6}>
                {this.state.form.conditions.map((condition, i) => {
                    return <Grid.Column key={i}>
                        <ConditionPickerModal triggerIcon={conditionIconMap[condition.type]} conditionIndex={i} condition={condition} conditionRequirements={this.state.modelRequirements.conditions} editCondition={this.editCondition} data={this.props.data} dataHeaders={this.props.dataHeaders} />
                    </Grid.Column>
                })}
            </Grid>
        } else {
            const allowedModels = this.props.allowedModels;
            modelSelection = <Grid container columns={4}>
                {this.iconOrder.filter((e) => {
                    if (allowedModels && allowedModels.indexOf(e) > -1) {return true};
                    return false
                }).map((e,i) => {
                    const name = e[0].toUpperCase() + e.substring(1);
                    return <Grid.Column key={i}>
                            <Button onClick={() => this.handleClick(e)}>
                                    <a>
                                        {animatedModelIconMap[e]}
                                    </a>
                                <div>{name}</div>
                            </Button>
                        </Grid.Column>
                })}
            </Grid>
        }

        return (
            <Modal trigger={<Button onClick={this.handleOpen}>{"Add/Edit Model"}</Button>} open={this.state.open}>
                <Modal.Header>{modelSelection}</Modal.Header>
                <Modal.Content>
                    {modelForm}
                    {
                        modelConditions ?
                            <div>
                                <Segment attached>
                                    <Label attached='top'>Conditions</Label>
                                    {modelConditions}
                                </Segment>
                                <ConditionPickerModal allowedConditions={this.props.allowedConditions} conditionRequirements={this.state.modelRequirements.conditions} editCondition={this.editCondition} data={this.props.data} dataHeaders={this.props.dataHeaders}/>
                            </div>
                            : null
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Cancel' onClick={() => this.handleClose(true)} />
                    <Button content='Done' onClick={() => this.handleClose(false)} />
                </Modal.Actions>
            </Modal>
        )
    }
}
