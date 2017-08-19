import React, { Component } from 'react'
import { Form, Modal, Button, Radio, Segment, Dropdown, Label, Card } from 'semantic-ui-react'
import { SwatchesPicker } from 'react-color';

import NumberPicker from './numberPicker';
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

        this.state = {
            open:false,
            minHeight:0,
            maxHeight:1
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleSelectData = this.handleSelectData.bind(this);
        this.handleSelectDataSpan = this.handleSelectDataSpan.bind(this);
        this.handleBoundsChange = this.handleBoundsChange.bind(this);
        this.calculateBounds = this.calculateBounds.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }

    handleOpen(valueMap) {
        let state = {
            open: true,
            levelDataIndex: null,
            minHeight: 0,
            maxHeight: 1,
            dataManipulated: false
        }

        if (valueMap.levelDataIndex) {
            state.levelDataIndex = valueMap.levelDataIndex;
            state.minHeight = valueMap.min_height;
            state.maxHeight = valueMap.max_height;
            state.dataManipulated = true
        }

        this.setState(state)
    }

    handleSelectData(e, f) {
        this.setState((prevState) => {
            let state = {levelDataIndex: f.value};

            if (!prevState.dataManipulated) {
                const levelDataSpan =  Math.min(prevState.levelDataSpan ? prevState.levelDataSpan : 1, this.props.data[0].length - f.value)
                const heightDataBounds = this.calculateBounds(f.value, levelDataSpan)

                state.minHeight = heightDataBounds[0];
                state.maxHeight = heightDataBounds[1];
                state.levelDataSpan =  levelDataSpan
            }

            return state
        })
    }

    handleSelectDataSpan(e) {
        this.setState((prevState) => {
            let state = {levelDataSpan: Math.min(e.value, this.props.data[0].length - prevState.levelDataIndex)}

            if (!prevState.dataManipulated) {
                const heightDataBounds = this.calculateBounds(e.value, state.levelDataSpan)
                state.minHeight = heightDataBounds[0];
                state.maxHeight = heightDataBounds[1];
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
        if (!canceled) {
            this.props.onChange({}, {
                min_height: this.state.minHeight,
                max_height: this.state.maxHeight,
                levelDataIndex: this.state.levelDataIndex
            }, true);
        }

        this.setState({open:false})
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

    render() {
        // Determine if we are using a single or multiple dimensions
        let dims = 1;
        if (this.props.validators.level_data.maxDims > 1) {
            dims = 2
        }

        const valueMap = this.props.valueMap;
        let levelRange = 'Range: ';
        let levelSummary = '';
        let selectedCols = '';
        let dataSpanSummary = '';
        if (this.state.levelDataIndex) {
            let data = [];
            if (dims > 1) {
                for (let j=0; j<this.state.levelDataSpan; j++) {
                    data = data.concat(this.props.data.map((e) => {return e[this.state.levelDataIndex + j]}))
                }
            } else {
                data = this.props.data.map((e) => {return e[this.state.levelDataIndex]})
            }

            const minVal = Math.min(...data);
            const maxVal = Math.max(...data);
            levelRange += minVal + " - " + maxVal
            const levelDataName = this.props.dataHeaderOptions[this.state.levelDataIndex].text

            const span = this.state.levelDataSpan ? this.state.levelDataSpan : 1
            dataSpanSummary = levelDataName + "..." + this.props.dataHeaderOptions[this.state.levelDataIndex + span - 1].text

            levelSummary = <div>
                <div>{dims > 1 ? dataSpanSummary : levelDataName}
                    <span className="minor-text">{"("+ levelRange + ")"}</span>
                </div>
                <div className="minor-text">{"Bounds: " + this.state.minHeight + " - " + this.state.maxHeight}</div>
            </div>;
        }

        return (
            <Modal trigger={<Button content={"Level Data"} style={{height:70, width:"100%", textAlign:"center"}} label={{as:'a', basic:true, pointing:'left', content:levelSummary}} className="level-btn" onClick={() => this.handleOpen(valueMap)}/>} open={this.state.open}>
                <Modal.Content>
                    <Form onSubmit={(e) => {e.preventDefault()}}>
                        <Form.Group widths="2">
                            <Form.Field>
                                <label>{dims == 1 ? "Data Column" : "Data Column Start"}</label>
                                <Dropdown placeholder='Select Data' search selection options={this.props.dataHeaderOptions}
                                    value={this.state.levelDataIndex ? this.state.levelDataIndex : ''} onChange={(e, f) => this.handleSelectData(e, f)}/>
                            </Form.Field>
                            <Form.Input label={'\u00A0'} placeholder={levelRange} readOnly/>
                        </Form.Group>
                        {dims == 2 ? <Form.Group widths="2">
                                <Form.Field label='Data Column Span' name="dataSpan" control={NumberPicker} disabled={this.state.levelDataIndex ? false : true} min={1} value={this.state.levelDataSpan ? this.state.levelDataSpan : '1'} onChange={this.handleSelectDataSpan}/>
                                <Form.Input label={'\u00A0'} placeholder={dataSpanSummary} readOnly/>
                            </Form.Group>: null}
                        <Form.Group widths="equal">
                            <Form.Input label='Lower Bound' name='minHeight' value={this.state.minHeight} type={"number"} onChange={(e,f) => this.handleBoundsChange(e, f, 'minHeight')}/>
                            <Form.Input label='Upper Bound' name='maxHeight' value={this.state.maxHeight} type={"number"} onChange={(e,f) => this.handleBoundsChange(e, f, 'maxHeight')}/>
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Cancel' onClick={() => this.handleClose(null, true)} />
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
            }, true);

            state.color_scale = color_scale;
        }

        this.setState(state)
    }

    render() {
        const colorSetButtons = colorSets.map((colorSet, i) => {
            const colors = chroma.scale(colorSet.set).colors(this.state.colorSteps);
            return (
                <Button key={i} onClick={() => this.handleClose(colors, false)}>
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
    {name:"pee", set:['lightyellow', 'navy']},
    {name:"rainbow", set:'RdYlBu'}
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

    console.log("val", validators)

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
