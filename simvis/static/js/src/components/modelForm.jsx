import React, { Component } from 'react'
import { Form, Modal, Button, Radio, Segment } from 'semantic-ui-react'
import { SwatchesPicker } from 'react-color';

import NumberPicker from './numberPicker';
import chroma from 'chroma-js'

class DescriptionForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input value={this.props.value ? this.props.value : ''} label='Description' name='description' type='text' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class UnitForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input value={this.props.value ? this.props.value : ''} label='Unit' name='unit' type='text' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class OpacityForm extends Component {
    constructor(props) {
        super(props);


        this.default = 1;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // Cast as float
        this.props.onChange({target:{value:parseFloat(e.target.value)}})
    }

    render() {
        return (
            <Form.Input value={this.props.value ? this.props.value : this.default} label='Opacity' name='opacity' placeholder='1' min="0" max ="1" type="number" step="0.01" onChange={this.handleChange}/>
        )
    }
}

class MinHeightForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input value={this.props.value ? this.props.value : 0} label='Min Height' name='minHeight' placeholder='0' type="number" onChange={this.props.onChange}/>
        )
    }
}

class MaxHeightForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input value={this.props.value ? this.props.value : 1} label='Max Height' name='maxHeight' placeholder='1' type={"number"} onChange={this.props.onChange}/>
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

    handleChange(e) {
        const value = !this.state.value;
        this.setState({value});

        e.target.value ? e.target.value = true : e.target.value = false;
        this.props.onChange(e)
    }

    render() {
        return (
            <Form.Field>
                <div style={{position:"relative", top:"50%", left:"30%"}}>
                    <Radio label="Report Values" toggle onChange={(e) => this.handleChange(e)} checked={this.state.value}/>
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
            <Form.Input value={this.props.value} label='True Color' name='trueColor' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class FalseColorForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input value={this.props.value} label='False Color' name='falseColor' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class ColorScaleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open:false,
            colorSteps:5,
            minColorValue:this.props.data[0],
            maxColorValue:this.props.data[this.props.data.length-1]
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleBoundsChange = this.handleBoundsChange.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }

    handleOpen() {
        this.setState({
            open:true
        })
    }

    handleStepChange(e, f, name) {
        this.setState({
            colorSteps:e.value
        })
    }

    handleBoundsChange(e, f, name) {
        this.setState({
            [name]:e.target.value
        });
    }

    handleClose(colors, canceled) {
        if (!canceled && colors) {
            let color_levels = [];
            const valueStep = Math.abs(this.state.minColorValue - this.state.maxColorValue) / this.state.colorSteps;
            for (let i=1; i <= this.state.colorSteps; i++) {
                color_levels.push(this.state.minColorValue + i * valueStep)
            }

            // Simulate a typical form change to be consistent with other forms
            this.props.onChange({}, {value:color_levels}, 'color_levels');
            this.props.onChange({}, {value:this.state.colorSteps}, 'colorSteps');
            this.props.onChange({}, {value:this.state.maxColorValue}, 'maxColorValue');
            this.props.onChange({}, {value:this.state.minColorValue}, 'minColorValue');
            this.props.onChange({}, {value:colors})

        }

        this.setState({open:false})
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

        return (
            <Modal trigger={<Form.Button style={{height:70, width:175, textAlign:"center"}} className="color-scale-btn" onClick={this.handleOpen}>{this.props.value ? createColorButtonIcon(this.props.value.color_scale, "Color Scale") : <div>{"Color Scale"}</div>}</Form.Button>} open={this.state.open}>
                <Modal.Content>
                    <Form onSubmit={(e) => {e.preventDefault()}}>
                        <Form.Group widths="equal">
                            <Form.Input label='Lower Bound' name='minColorValue' value={this.props.value ? this.props.value.minColorValue : this.state.minColorValue} type={"number"} onChange={(e,f) => this.handleBoundsChange(e, f, 'minColorValue')}/>
                            <Form.Input label='Upper Bound' name='maxColorValue' value={this.props.value ? this.props.value.maxColorValue : this.state.maxColorValue} type={"number"} onChange={(e,f) => this.handleBoundsChange(e, f, 'maxColorValue')}/>
                            <Form.Field control={NumberPicker} name="colorSteps" label="Color Steps"
                                   value={this.props.value ? this.props.value.colorSteps : this.state.colorSteps}
                                   onChange={(e, f) => this.handleStepChange(e, f, 'colorSteps')}
                                   min={2}
                                   max={10}/>
                        </Form.Group>
                    </Form>
                    {colorSetButtons}
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Cancel' onClick={() => this.handleClose(null, true)} />
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
        icons.push(<div style={{background:colors[i]}} className={"color-set-div"} key={i}></div>)
    }

    return (
        <div style={{display:"inline-block"}} key={-1}>{name ? <div>{name}</div>: null}{icons}</div>
    )
}

const formGroupMap = [
    [{name:"description", tag:DescriptionForm}, {name:"unit", tag:UnitForm}],
    [{name:"opacity", tag:OpacityForm}, {name:"report", tag:ReportForm}],
    [{name:"color_scale", extraArgs:["minColorValue", "maxColorValue", "colorSteps"], tag:ColorScaleForm}],
    [{name:"true_color", tag:TrueColorForm}, {name:"false_color", tag:FalseColorForm}],
    [{name:"min_height", tag:MinHeightForm}, {name:"max_height", tag:MaxHeightForm}]
];

export default function getFormFromArgs(args, data, onChange, valueMap) {
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
                    const arg = form.name;
                    let value = (valueMap && valueMap[arg] ? valueMap[arg] : null)

                    if (form.extraArgs && value) {
                        value = {[arg]:value}
                        for (const arg2 of form.extraArgs) {
                            value[arg2] = valueMap[arg2]
                        }
                    }

                    fieldCount += 1;
                    const i = args.indexOf(arg);
                    return <form.tag key={arg} value={value} data={data} onChange={(e, f, argOverride) => onChange(e, f, arg, argOverride)}/>
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
