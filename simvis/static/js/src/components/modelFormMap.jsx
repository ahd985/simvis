import React, { Component } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'
import { SwatchesPicker } from 'react-color';

import NumberPicker from './numberPicker.js';
import chroma from 'chroma-js'

class DescriptionForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form.Input label='Description' name='description' placeholder='Description'/>
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
                           onChange={() => {}}
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
    {name:"color_levels", tag:ColorLevelsForm}
];

export default function getForm(name) {
    for (var f of formMap) {
        if (f.name === name) {
           return f
        }
    }

    return null
}
