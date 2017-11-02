import React, { Component } from 'react'
import { Form, Modal, Button, Radio, Segment, Dropdown, Label, Card } from 'semantic-ui-react'
import { SwatchesPicker } from 'react-color';

import NumberPicker from './numberPicker.jsx';
import chroma from 'chroma-js'

class DataForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataIndex:null
        }

        this.handleSelectData = this.handleSelectData.bind(this)
    }

    handleSelectData(e, f) {
        this.setState((prevState) => {
            return {
                dataIndex:f.value
            }
        })

        this.props.onChange(e, f, 'dataIndex')
    }

    render() {
        return (
            <Form.Field>
                <label>Data</label>
                <Dropdown placeholder='Select Data' search selection options={this.props.dataHeaderOptions}
                          value={this.state.dataIndex ? this.state.dataIndex : ''} onChange={this.handleSelectData}/>
            </Form.Field>
        )
    }
}

class DescriptionForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input value={this.props.valueMap.description ? this.props.valueMap.description : ''} label='Description' name='description' type='text' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class UnitForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input value={this.props.valueMap.unit ? this.props.valueMap.unit : ''} label='Unit' name='unit' type='text' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class OpacityForm extends Component {
    constructor(props) {
        super(props);

        this.default = 1;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e,f) {
        // Cast as float
        this.props.onChange(e, {value:parseFloat(f.value)})
    }

    render() {
        return (
            <Form.Input value={this.props.valueMap.opacity ? this.props.valueMap.opacity : this.default} label='Opacity' name='opacity' placeholder='1' min="0" max ="1" type="number" step="0.01" onChange={this.handleChange}/>
        )
    }
}

class ReportForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value:false
        };

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, f) {
        const value = !this.state.value;
        this.setState({value});

        this.props.onChange(e, f)
    }

    render() {
        return (
            <Form.Field>
                <div style={{position:"relative", top:"50%", left:"30%"}}>
                    <Radio label="Report Values" toggle onChange={this.handleChange} checked={this.state.value}/>
                </div>
            </Form.Field>
        )
    }
}

class TrueColorForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input value={this.props.valueMap.true_color ? this.props.valueMap.true_color : ""} label='True Color' name='trueColor' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class FalseColorForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input value={this.props.valueMap.false_color ? this.props.valueMap.false_color : ""} label='False Color' name='falseColor' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class LevelForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            open:false,
            min_height:0,
            max_height:1,
            invalidFields:{}
        }

        this.state = Object.assign({}, this.initialState);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleSelectData = this.handleSelectData.bind(this);
        this.handleSelectDataSpan = this.handleSelectDataSpan.bind(this);
        this.handleBoundsChange = this.handleBoundsChange.bind(this);
        this.calculateBounds = this.calculateBounds.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getInvalidFields = this.getInvalidFields.bind(this);
    }

    handleOpen(valueMap) {
        let state = {
            open: true,
            levelDataIndex: null,
            min_height: 0,
            max_height: 1,
            dataManipulated: false
        }

        if (valueMap.levelDataIndex || valueMap.levelDataIndex === 0) {
            state.levelDataIndex = valueMap.levelDataIndex;
            state.min_height = valueMap.min_height;
            state.max_height = valueMap.max_height;
            state.dataManipulated = true
        }

        if (valueMap.levelDataSpan) {
            state.levelDataSpan = valueMap.levelDataSpan
        }

        this.setState(state)
    }

    handleSelectData(e, f) {
        this.setState((prevState) => {
            let state = {levelDataIndex: f.value};

            if (!prevState.dataManipulated) {
                const levelDataSpan =  Math.min(prevState.levelDataSpan & prevState.levelDataSpan != 0 ? prevState.levelDataSpan : 1, this.props.data[0].length - f.value)
                const heightDataBounds = this.calculateBounds(f.value, levelDataSpan)

                state.min_height = heightDataBounds[0];
                state.max_height = heightDataBounds[1];
                state.levelDataSpan =  levelDataSpan
            }

            return state
        })
    }

    handleSelectDataSpan(e) {
        this.setState((prevState) => {
            let state = {levelDataSpan: Math.min(e.value, this.props.data[0].length - prevState.levelDataIndex)}

            if (!prevState.dataManipulated) {
                const heightDataBounds = this.calculateBounds(prevState.levelDataIndex, state.levelDataSpan)
                state.min_height = heightDataBounds[0];
                state.max_height = heightDataBounds[1];
            }

            return state
        })
    }

    handleBoundsChange(e, f, name) {
        this.setState({
            [name]:f.value
        });
    }

    handleClose(canceled) {
        let state = {...this.initialState}

        if (!canceled) {
            const invalidFields = this.getInvalidFields();

            if (invalidFields) {
                this.setState({invalidFields})
                return
            }

            let changedProps = {
                min_height: this.state.min_height,
                max_height: this.state.max_height,
                levelDataIndex: this.state.levelDataIndex,
            }

            if (this.state.levelDataSpan) {
                changedProps.levelDataSpan = this.state.levelDataSpan
            }

            this.props.onChange({}, changedProps, true);
            state.open = false;
        }

        this.setState(state)

    }

    calculateBounds(levelDataIndex, levelDataSpan) {
        let data = [];
        if (this.props.validators.level_data.maxDims > 1) {
            for (let j=0; j<levelDataSpan; j++) {
                data = data.concat(this.props.data.map((e) => {return e[levelDataIndex + j]}))
            }
        } else {
            data = this.props.data.map((e) => {return e[levelDataIndex]})
        }

        return[Math.min(...data), Math.max(...data)]
    }

    static summarize(condition, allData, dataHeaders, useRangeForBounds) {
        let summary = {};
        let spanSummary = '';
        let dataSummary = '';
        let levelRange = '';

        if (condition.levelDataIndex || condition.levelDataIndex === 0) {
            let data = [];
            if (condition.levelDataSpan) {
                for (let j = 0; j < condition.levelDataSpan; j++) {
                    data = data.concat(allData.map((e) => {
                        return e[condition.levelDataIndex + j]
                    }))
                }
            } else {
                data = allData.map((e) => {
                    return e[condition.levelDataIndex]
                })
            }

            const minVal = Math.min(...data);
            const maxVal = Math.max(...data);
            levelRange = 'Range: ' + minVal + " - " + maxVal;
            const levelDataName = dataHeaders[condition.levelDataIndex].text

            const span = condition.levelDataSpan ? condition.levelDataSpan : 1
            spanSummary = levelDataName + "..." + dataHeaders[condition.levelDataIndex + span - 1].text

            const boundsSummary = (useRangeForBounds ? minVal + " - " + maxVal : condition.min_height + " - " + condition.max_height)

            dataSummary = <div>
                <div>{condition.levelDataSpan ? spanSummary : levelDataName}</div>
                <div className="minor-text">{"(" + levelRange + ")"}</div>
                <div className="minor-text">{"Bounds: " + boundsSummary}</div>
            </div>;
        }

        return {levelRange, dataSummary, spanSummary}
    }

    getInvalidFields() {
        let invalidFields = {}

        // Make sure data options are not blank
        if (!(this.state.levelDataIndex || this.state.levelDataIndex === 0)) {
            invalidFields.levelDataIndex = true
        }

        if (this.props.validators.level_data.maxDims > 1) {
            if (!this.state.levelDataSpan) {
                invalidFields.levelDataSpan = true
            }
        }

        // Make sure bounds are valid
        if (!(this.state.min_height || this.state.min_height === 0)) {
            invalidFields.min_height = true
        }

        if (!(this.state.max_height || this.state.max_height === 0)) {
            invalidFields.max_height = true
        }

        if (Object.keys(invalidFields).length === 0) {
            return false
        }

        return invalidFields
    }

    render() {
        // Determine if we are using a single or multiple dimensions
        let dims = 1;
        if (this.props.validators.level_data.maxDims > 1) {
            dims = 2
        }

        const valueMap = this.props.valueMap;
        const externalSummary = LevelForm.summarize(valueMap, this.props.data, this.props.dataHeaderOptions, true)
        const internalSummary = LevelForm.summarize(this.state, this.props.data, this.props.dataHeaderOptions, this.state.dataManipulated)

        const invalidFields = this.state.invalidFields;

        return (
            <Modal trigger={<Button content={"Level Data"} style={{height:70, width:"100%", textAlign:"center"}} label={{as:'a', basic:true, pointing:'left', content:externalSummary.dataSummary}} className="level-btn" onClick={() => this.handleOpen(valueMap)}/>} open={this.state.open}>
                <Modal.Content>
                    <Form onSubmit={(e) => {e.preventDefault()}}>
                        <Form.Group widths="2">
                            <Form.Field>
                                <label>{dims == 1 ? "Data Column" : "Data Column Start"}</label>
                                <Dropdown error={invalidFields.levelDataIndex} placeholder='Select Data' search selection options={this.props.dataHeaderOptions}
                                    value={this.state.levelDataIndex || this.state.levelDataIndex === 0 ? this.state.levelDataIndex : ''} onChange={(e, f) => this.handleSelectData(e, f)}/>
                            </Form.Field>
                            <Form.Input label={'\u00A0'} placeholder={internalSummary.levelRange} readOnly/>
                        </Form.Group>
                        {dims == 2 ? <Form.Group widths="2">
                                <Form.Field error={invalidFields.levelDataSpan} label='Data Column Span' name="dataSpan" control={NumberPicker} disabled={this.state.levelDataIndex || this.state.levelDataIndex === 0 ? false : true} min={1} value={this.state.levelDataSpan ? this.state.levelDataSpan : '1'} onChange={this.handleSelectDataSpan}/>
                                <Form.Input label={'\u00A0'} placeholder={internalSummary.spanSummary} readOnly/>
                            </Form.Group>: null}
                        <Form.Group widths="equal">
                            <Form.Input error={invalidFields.min_height} label='Lower Bound' name='minHeight' value={this.state.min_height} type={"number"} onChange={(e,f) => this.handleBoundsChange(e, f, 'min_height')}/>
                            <Form.Input error={invalidFields.max_height} label='Upper Bound' name='maxHeight' value={this.state.max_height} type={"number"} onChange={(e,f) => this.handleBoundsChange(e, f, 'max_height')}/>
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Cancel' onClick={() => this.handleClose(true)} />
                    <Button content='Done' onClick={() => this.handleClose(false)}></Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

class ColorDataForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open:false,
            colorSteps:5,
            minColorValue:0,
            maxColorValue:1,
            colorSteps:5,
            color_scale:null
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleBoundsChange = this.handleBoundsChange.bind(this);
        this.handleSelectData = this.handleSelectData.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }

    handleOpen(valueMap) {
        let state = {
            open: true,
            colorDataIndex: null,
            minColorValue: 0,
            maxColorValue: 1,
            colorSteps:5,
            color_scale: null,
            dataManipulated: false
        }

        if (valueMap.colorDataIndex) {
            state.colorDataIndex = valueMap.colorDataIndex;
            state.minColorValue = valueMap.minColorValue;
            state.maxColorValue = valueMap.maxColorValue;
            state.colorSteps = valueMap.colorSteps;
            state.color_scale = valueMap.color_scale;
            state.dataManipulated = true
        }

        this.setState(state)
    }

    handleSelectData(e, f) {
        const data = this.props.data
        this.setState((prevState) => {
            let state = {colorDataIndex:f.value};
            if (!prevState.dataManipulated) {
                const colorData = data.map((e) => {return e[f.value]})
                state.minColorValue = Math.min(...colorData);
                state.maxColorValue = Math.max(...colorData);
            }

            return state
        })
    }

    handleStepChange(e) {
        this.setState({
            colorSteps:e.value
        })
    }

    handleBoundsChange(e, f, name) {
        this.setState({
            [name]:f.value
        });
    }

    handleClose(colors, canceled) {
        let state = {open:false}

        if (!canceled && colors) {
            let color_levels = [];
            const valueStep = Math.abs(this.state.minColorValue - this.state.maxColorValue) / this.state.colorSteps;
            for (let i=1; i <= this.state.colorSteps; i++) {
                color_levels.push(this.state.minColorValue + i * valueStep)
            }

            // Simulate a single form change that captures all variables
            const color_scale = colors;
            this.props.onChange({}, {
                color_levels,
                colorSteps: this.state.colorSteps,
                maxColorValue: this.state.maxColorValue,
                minColorValue: this.state.minColorValue,
                color_scale,
                colorDataIndex: this.state.colorDataIndex,
            }, true);

            state.color_scale = color_scale;
        }

        this.setState(state)
    }

    render() {
        const colorSetButtons = colorSets.map((colorSet, i) => {
            const colors = chroma.scale(colorSet.set).colors(this.state.colorSteps);
            return (
                <Button className="color-set-btn" key={i} onClick={() => this.handleClose(colors, false)}>
                    {createColorButtonIcon(colors, colorSet.name)}
                </Button>
            )
        });

        const valueMap = this.props.valueMap;
        let colorRange = 'Range: ';
        let colorSummary = '';

        if (this.state.colorDataIndex) {
            const data = this.props.data.map((e) => {return e[this.state.colorDataIndex]});
            const minVal = Math.min(...data);
            const maxVal = Math.max(...data);
            colorRange += minVal + " - " + maxVal
            colorSummary = <div>
                <div>{this.props.dataHeaderOptions[this.state.colorDataIndex].text + " "}
                    <span className="minor-text">{"("+ colorRange + ")"}</span>
                </div>
                <div className="minor-text">{"Bounds: " + this.state.minColorValue + " - " + this.state.maxColorValue}</div>
                <div>{this.state.color_scale ? createColorButtonIcon(this.state.color_scale) : null}</div>
            </div>;
        }

        return (
            <Modal trigger={<Button content={"Color Data"} style={{height:70, width:"100%", textAlign:"center"}} label={{as:'a', basic:true, pointing:'left', content:colorSummary}} className="color-scale-btn" onClick={() => this.handleOpen(valueMap)}/>} open={this.state.open}>
                <Modal.Content>
                    <Form onSubmit={(e) => {e.preventDefault()}}>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <Dropdown placeholder='Select Data' search selection options={this.props.dataHeaderOptions}
                                    value={this.state.colorDataIndex ? this.state.colorDataIndex : ''} onChange={this.handleSelectData}/>
                            </Form.Field>
                            <Form.Input placeholder={colorRange} readOnly/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input label='Lower Bound' name='minColorValue'
                                        value={this.state.minColorValue}
                                        type={"number"}
                                        onChange={(e,f) => this.handleBoundsChange(e, f, 'minColorValue')}/>
                            <Form.Input label='Upper Bound' name='maxColorValue'
                                        value={this.state.maxColorValue}
                                        type={"number"}
                                        onChange={(e,f) => this.handleBoundsChange(e, f, 'maxColorValue')}/>
                            <Form.Field control={NumberPicker} name="colorSteps" label="Color Steps"
                                        value={this.state.colorSteps}
                                        onChange={(e) => this.handleStepChange(e)}
                                        min={2}
                                        max={10}/>
                        </Form.Group>
                    </Form>
                    {colorSetButtons}
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Cancel' onClick={() => this.handleClose(null, true)}/>
                </Modal.Actions>
            </Modal>
        )
    }
}

const colorSets = [
    {name:"jet", set:['#000080','#0000ff','#0063ff','#00d4ff','#4effa9','#a9ff4e','#ffe600','#ff7d00','#ff1400','#800000']},
    {name:"viridis", set:['#440154','#482878','#3e4989','#31688e','#26828e','#1f9e89','#35b779','#6ece58','#b5de2b','#fde725']},
    {name:"plasma", set:['#0d0887','#46039f','#7201a8','#9c179e','#bd3786','#d8576b','#ed7953','#fb9f3a','#fdca26','#f0f921']},
    {name:"inferno", set:['#000004','#1b0c41','#4a0c6b','#781c6d','#a52c60','#cf4446','#ed6925','#fb9b06','#f7d13d','#fcffa4']},
    {name:"magma", set:['#000004','#180f3d','#440f76','#721f81','#9e2f7f','#cd4071','#f1605d','#fd9668','#feca8d','#fcfdbf']},
    {name:"greys", set:['#ffffff','#f2f2f2','#dedede','#c6c6c6','#a7a7a7','#868686','#686868','#484848','#212121','#000000']},
    {name:"blues", set:['#f7fbff','#e1edf8','#cbdff1','#abd0e6','#82badb','#59a2cf','#3787c0','#1b6aaf','#084d97','#08306b']},
    {name:"greens", set:['#f7fcf5','#e7f6e2','#ceecc7','#aedea7','#88cd86','#5db96b','#37a055','#1b843f','#00682a','#00441b']},
    {name:"oranges", set:['#fff5eb','#fee8d1','#fdd5ac','#fdb97d','#fd9c51','#f87d2a','#e95e0d','#ce4401','#a23403','#7f2704']},
    {name:"reds", set:['#fff5f0','#fee2d5','#fcc3ac','#fca082','#fb7c5c','#f6553d','#e32f27','#c3161b','#9e0d14','#67000d']},
    {name:"ylorbr", set:['#ffffe5','#fff8c1','#fee79b','#fece65','#feac3a','#f68720','#e1640e','#c14702','#933204','#662506']},
    {name:"copper", set:['#000000','#23160e','#462c1c','#69422a','#8c5938','#af6f46','#d28555','#f59b63','#ffb171','#ffc77f']},
    {name:"cool", set:['#00ffff','#1ce3ff','#39c6ff','#55aaff','#718eff','#8e71ff','#aa55ff','#c639ff','#e31cff','#ff00ff']},
    {name:"hot", set:['#0b0000','#550000','#9f0000','#ea0000','#ff3500','#ff8000','#ffca00','#ffff20','#ffff8f','#ffffff']}
];

function createColorButtonIcon(colors, name) {
    let icons = [];

    for (let i=0; i < colors.length; i++) {
        icons.push(<div style={{background:colors[i], display:"inline-block"}} className={"color-set-div"} key={i}></div>)
    }

    return (
        <div key={-1}>{name ? <div>{name}</div>: null}<div>{icons}</div></div>
    )
}

const formGroupMap = [
    [{name:"data", tag:DataForm}],
    [{name:"level_data", tag:LevelForm}],
    [{name:"color_data", tag:ColorDataForm}],
    [{name:"description", tag:DescriptionForm}, {name:"unit", tag:UnitForm}],
    [{name:"opacity", tag:OpacityForm}, {name:"report", tag:ReportForm}],
    [{name:"true_color", tag:TrueColorForm}, {name:"false_color", tag:FalseColorForm}],
];

export default function getFormFromArgs(args, data, onChange, valueMap, dataHeaderOptions, validators) {
    let fieldCount = 0;

    let fields = formGroupMap.map((formGroup,i) => {
        let fieldIncluded = false;
        for (let field of formGroup) {
            if (args.includes(field.name)) {
                fieldIncluded = true
            }
        }

        if (fieldIncluded) {
            let fieldGroup = formGroup.map((form) => {
                if (args.includes(form.name)) {
                    const arg = form.name
                    return <form.tag key={arg} valueMap={valueMap} validators={validators} data={data} dataHeaderOptions={dataHeaderOptions} onChange={(e, f, argOverride) => onChange(e, f, arg, argOverride)}/>
                } else {
                    return false
                }
            }).filter((arg) => {
                if (arg) {return true} else {return false}
            });

            return (
                <Form.Group key={i} widths={2}>
                    {fieldGroup}
                </Form.Group>
            )
        }

        return null
    })

    return fields
}
