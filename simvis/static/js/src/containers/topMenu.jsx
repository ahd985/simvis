import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compileModel } from '../actions'

import ImportDataModal from './dataImport'

class TopMenu extends Component {
    constructor(props) {
        super(props);

        this.handleSubmitClick = this.handleSubmitClick.bind(this)
    }

    scrub_svg_children(el) {
        // Remove unwanted classes
        el.removeAttribute('class');

        if (el.children.length > 0) {
            for (var child of el.children) {
                if (child.classList.contains("ignore")) {
                    el.removeChild(child)
                } else {
                    this.scrub_svg_children(child)
                }
            }
        }
        return el
    }

    handleSubmitClick() {
        // Grab and clean svg layout
        var svg = document.getElementById("draw-svg");
        svg = this.scrub_svg_children(svg).cloneNode(true);

        // Grab model details
        const compiledModels = this.props.shapes.filter((shapeData) => {
            if (shapeData.model) {
                return true
            } else {
                return false
            }
        }).map((shapeData) => {
            return shapeData.model
        });

        const output = {
            elements:compiledModels,
            tree:svg.outerHTML
        }
    }

    render() {
        return (
            <Menu id="top-sidebar" size="mini">
                <Menu.Item name="moveForward"><Icon name='move' /></Menu.Item>
                <Menu.Item name="moveBackwards"><Icon name='move' /></Menu.Item>
                <Menu.Menu position='right'>
                    <ImportDataModal/>
                </Menu.Menu>
                <Menu.Menu position='right'>
                    <Menu.Item content='Submit' onClick={this.handleSubmitClick} />
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({
    shapes:shapeCollection.shapes
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu)
