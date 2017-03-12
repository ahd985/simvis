import React, { Component } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'
import { SwatchesPicker } from 'react-color';

import NumberPicker from './numberPicker';
import chroma from 'chroma-js'

class DescriptionForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='Description' name='description' type='text' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class UnitForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='Unit' name='unit' type='text' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class OpacityForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='Opacity' name='opacity' placeholder='1' min="0" max ="1" type="number" onChange={this.props.onChange}/>
        )
    }
}

class MinHeightForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='Min Height' name='minHeight' placeholder='0' type="number" onChange={this.props.onChange}/>
        )
    }
}

class MaxHeightForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='Max Height' name='maxHeight' placeholder='1' type={"number"} onChange={this.props.onChange}/>
        )
    }
}

class ReportForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='Report' name='report' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class TrueColorForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='True Color' name='trueColor' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class FalseColorForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='False Color' name='falseColor' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class ColorScaleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open:false,
            colorSteps:5,
            minColorValue:0,
            maxColorValue:1
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleBoundsChange = this.handleBoundsChange.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }

    handleOpen() {
        this.setState({open:true})
    }

    handleStepChange(e) {
        this.setState({
            colorSteps:e.value
        })
    }

    handleBoundsChange(e, name) {
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
            this.props.onChange({target:{value:color_levels}}, null, 'color_levels');
            this.props.onChange({target:{value:colors}})
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
            <Modal trigger={<Button onClick={this.handleOpen}>{"Color Scale"}</Button>} open={this.state.open}>
                <Modal.Content>
                    {colorSetButtons}
                    <Form.Input label='Lower Bound' name='minColorValue' value='0' type={"number"} onChange={(e) => this.handleBoundsChange(e, 'minColorValue')}/>
                    <Form.Input label='Upper Bound' name='maxColorValue' value='1000' type={"number"} onChange={(e) => this.handleBoundsChange(e, 'maxColorValue')}/>
                    <Form.Field width="3" control={NumberPicker} name="colorLevels" label="Color Steps"
                           value={this.state.colorSteps}
                           onChange={this.handleStepChange}
                           min={1}
                           max={10}/>
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
        <div key={-1}><span style={{clear:"right"}}>{name}</span>{icons}</div>
    )
}

const formMap = [
    {name:"description", tag:DescriptionForm},
    {name:"color_scale", tag:ColorScaleForm},
    {name:"true_color", tag:TrueColorForm},
    {name:"false_color", tag:FalseColorForm},
    {name:"min_height", tag:MinHeightForm},
    {name:"max_height", tag:MaxHeightForm},
    {name:"unit", tag:UnitForm},
    {name:"opacity", tag:OpacityForm},
    {name:"report", tag:ReportForm}
];

export default function getForm(name) {
    for (var f of formMap) {
        if (f.name === name) {
           return f
        }
    }

    return null
}
