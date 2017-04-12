import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compileModel, setLayout } from '../actions'

import ImportDataModal from './dataImport'

class TopMenu extends Component {
    constructor(props) {
        super(props);

        this.zoomLevels = [25, 50, 75, 100, 200, 300];
        this.zoomLevelOptions = this.zoomLevels.map((e, i) => {
            return {key:i, value:e, text:e.toString() + "%"}
        });

        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleZoom = this.handleZoom.bind(this)
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
            ...this.props.overview
        };

        var form = document.getElementById("ssv-submit");
        var field = document.createElement("input");
        field.setAttribute("name", "model");
        field.setAttribute("value", JSON.stringify(output));
        form.appendChild(field);
        form.submit();
    }

    handleZoom(type, value) {
        const scale = this.props.layout.scale;
        if (type === "delta") {
            let i = this.zoomLevels.indexOf(scale);
            i = Math.max(Math.min(i+value, this.zoomLevels.length-1), 0);
            this.props.setLayout("scale", this.zoomLevels[i])
        } else {
            this.props.setLayout("scale", value)
        }
    }

    render() {
        return (
            <Menu id="top-sidebar" size="mini">
                <Menu.Item name="zoomLevel"><Dropdown text={this.props.layout.scale.toString() + "%"}
                                                      options={this.zoomLevelOptions}
                                                      onChange={(e, d) => this.handleZoom("select", d.value)} /></Menu.Item>
                <Menu.Item name="zoomIn" onClick={() => this.handleZoom("delta", +1)}><Icon name='zoom' /></Menu.Item>
                <Menu.Item name="zoomOut" onClick={() => this.handleZoom("delta", -1)}><Icon name='zoom out' /></Menu.Item>
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
    xSeriesIndex:shapeCollection.xSeriesIndex,
    overview:shapeCollection.overview,
    layout:shapeCollection.layout
});

const mapDispatchToProps = {
    setLayout:setLayout
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu)
