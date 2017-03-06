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
            <Form.Input label='Description' name='description' placeholder='Description' onChange={this.props.onChange}/>
        )
    }
}

class UnitForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='Unit' name='unit' placeholder='' onChange={this.props.onChange}/>
        )
    }
}

class SectionLabelForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='Section Label' name='sectionLabel' placeholder='Section' onChange={this.props.onChange}/>
        )
    }
}

class OpacityForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='Opacity' name='opacity' placeholder='1' type="number" onChange={this.props.onChange}/>
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

class OverlayForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='Overlay' name='overlay' placeholder='' onChange={this.props.onChange}/>
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
        super(props)
    }

    render() {
        return (
            <Form.Field width="1" control={NumberPicker} label="Color Steps"
                           value={0}
                           onChange={this.props.onChange}
                           min={0}/>
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
        this.handleClose = this.handleClose.bind(this)
    }

    handleOpen() {
        this.setState({open:true})
    }

    handleClose(canceled) {
        if (!canceled) {

        }

        this.setState({open:false})
    }

    render() {
        const colorSetButtons = colorSets.map((colorSet, i) => {
            return (
                <Button key={i} onClick={() => {}}>
                    {createColorButtonIcon(colorSet, 5)}
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

function createColorButtonIcon(colorSet, stepCount) {
    let icons = [];

    const colors = chroma.scale(colorSet.set).colors(stepCount);
    for (let i=0; i < stepCount; i++) {
        icons.push(<div style={{background:colors[i]}} className={"color-set-div"}></div>)
    }

    return (
        <div><span style={{clear:"right"}}>{colorSet.name}</span>{icons}</div>
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
    {name:"section_label", tag:SectionLabelForm},
    {name:"opacity", tag:OpacityForm},
    {name:"report", tag:ReportForm},
    {name:"overlay", tag:OverlayForm}
];

export default function getForm(name) {
    for (var f of formMap) {
        if (f.name === name) {
           return f
        }
    }

    return null
}
