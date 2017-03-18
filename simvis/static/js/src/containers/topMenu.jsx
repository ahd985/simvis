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

    getCleanedSVG(el) {
        if (el.children.length > 0) {
            for (var i=el.children.length-1; i >= 0; i--) {
                let child = el.children[i];
                if (child.classList.contains("ignore")) {
                    child.remove()
                } else {
                    this.getCleanedSVG(child)
                }
            }
        }

        // Remove unwanted classes
        el.removeAttribute('class');

        return el
    }

    handleSubmitClick() {
        // Grab and clean svg layout
        var svg = document.getElementById("draw-svg");
        var svgClone = svg.cloneNode(true);
        svgClone = this.getCleanedSVG(svgClone);
        svgClone.setAttribute("viewBox", `0 0 1000 666`);

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
            tree:svgClone.outerHTML,
            xSeriesIndex:this.props.xSeriesIndex,
            //TODO - Implement these Options
            "x_series_unit": "",
            "title":"",
            "font_size":12
        };

        var form = document.getElementById("ssv-submit");
        var field = document.createElement("input");
        field.setAttribute("name", "model");
        field.setAttribute("value", JSON.stringify(output));
        form.appendChild(field);
        form.submit();
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
    shapes:shapeCollection.shapes,
    xSeriesIndex:shapeCollection.xSeriesIndex
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu)
