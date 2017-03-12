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
            <Form.Input label='Opacity' name='opacity' placeholder='1' min="0" max ="0" type="number" onChange={this.props.onChange}/>
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

class ColorLevelsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value:3
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            value:e.value
        });

        // Simulate a typical form change to be consistent with other forms
        this.props.onChange({target:{value:e.value}})
    }

    render() {
        return (
            <Form.Field width="3" control={NumberPicker} name="colorLevels" label="Color Steps"
                           value={this.state.value}
                           onChange={this.handleChange}
                           min={1}
                           max={10}/>
        )
    }
}

class ColorScaleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open:false
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }

    handleOpen() {
        this.setState({open:true})
    }

    handleSelect() {

    }

    handleClose(canceled) {
        if (!canceled) {
            // Simulate a typical form change to be consistent with other forms
            this.props.onChange({target:{value:e.value}})
        }

        this.setState({open:false})
    }

    render() {
        const colorSetButtons = colorSets.map((colorSet, i) => {
            const stepCount = 5;
            const colors = chroma.scale(colorSet.set).colors(stepCount);

            return (
                <Button key={i} onClick={() => {}}>
                    {createColorButtonIcon(colors)}
                </Button>
            )
        });

        return (
            <Modal trigger={<Button onClick={this.handleOpen}>{"Color Scale"}</Button>} open={this.state.open}>
                <Modal.Content>
                    {colorSetButtons}
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Cancel' onClick={() => this.handleClose(true)} />
                    <Button content='Done' onClick={() => this.handleClose()} />
                </Modal.Actions>
            </Modal>
        )
    }
}

const colorSets = [
    {name:"pee", set:['lightyellow', 'navy']},
    {name:"rainbow", set:'RdYlBu'}
];

function createColorButtonIcon(colors) {
    let icons = [];

    for (let i=0; i < colors.length; i++) {
        icons.push(<div style={{background:colors[i]}} className={"color-set-div"} key={i}></div>)
    }

    return (
        <div key={-1}><span style={{clear:"right"}}>{colorSet.name}</span>{icons}</div>
    )
}

const formMap = [
    {name:"description", tag:DescriptionForm},
    {name:"color_scale", tag:ColorScaleForm},
    {name:"color_levels", tag:ColorLevelsForm},
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
