import React, { Component } from 'react'
import { createStore } from 'redux'
import { connect } from 'react-redux'

import { Menu } from 'semantic-ui-react'
import { removeShapes } from '../actions/index.jsx'

import DrawContainer from './drawContainer.jsx'

class SimVis extends Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);

        document.addEventListener("keydown", this.handleKeyDown)
    }

    handleKeyDown(e) {
        let key = e.keyCode || e.charCode;

        if (!this.props.editActive) {
            // Allow shape deleting if delete or backspace is pressed
            if (key == 8 || key == 46) {
                this.props.removeShapes()
            }
        }
    }

    render() {
        return (
            <DrawContainer
                      shapes={this.props.shapes}
                      selectedShapes={this.props.selectedShapes}
                      selectedStyle={this.props.selectedStyle}/>
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({
    shapes:shapeCollection.present.shapes,
    selectedShapes:shapeCollection.present.selectedShapes,
    selectedStyle:shapeCollection.present.selectedStyle,
    editActive:shapeCollection.present.editActive
});

const mapDispatchToProps = {
    removeShapes:removeShapes
};

export default connect(mapStateToProps, mapDispatchToProps)(SimVis)
