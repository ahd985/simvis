import React, { Component } from 'react'
import { createStore } from 'redux'
import { connect } from 'react-redux'

import { Menu } from 'semantic-ui-react'
import uuidV4 from 'uuid/v4'
import ssv from '../../ssv.min.js'
import { removeShapes } from '../actions'

import DrawContainer from './drawContainer'

class SimVis extends Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);

        document.addEventListener("keydown", this.handleKeyDown)
    }

    handleKeyDown(e) {
        let key = e.keyCode || e.charCode;

        if (key == 8 || key == 46) {
            this.props.removeShapes()
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
    shapes:shapeCollection.shapes,
    selectedShapes:shapeCollection.selectedShapes,
    selectedStyle:shapeCollection.selectedStyle
});

const mapDispatchToProps = {
    removeShapes:removeShapes
};

export default connect(mapStateToProps, mapDispatchToProps)(SimVis)
