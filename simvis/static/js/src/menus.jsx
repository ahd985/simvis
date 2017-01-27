import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import 'superagent-django-csrf'

import Handsontable from 'handsontable/dist/handsontable.full'

import Diagram from './diagram.js'
import shapes from './shapes'

export default class DrawMenu extends Component {
    constructor(props) {
        super(props);

        this.shapeHandlers = this.props.shapeHandlers;
    }

    render() {
        return (
            <div className="draw-menu">
                <div className="draw-menu-top">
                    <TopMenu />
                    <ImportDataModal dataHandlers={this.props.dataHandlers}/>
                </div>
                <div className="draw-menu-bottom">
                    <LeftSideBarMenu shapeHandlers={this.shapeHandlers}/>
                    <RightSideBarMenu selectedShape={this.props.selectedShape} />
                    <div className="diagram-wrapper">
                        <div className="diagram-container">
                            <div className="diagram-background"></div>
                            <Diagram shapes={this.props.shapes}
                                     shapeHandlers={this.shapeHandlers}
                                     selectedShape={this.props.selectedShape}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ImportDataModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstModalOpen:false,
            secondModalOpen:false,
            data:null
        };

        this.onDrop = this.onDrop.bind(this);
        this.openSecondModal = this.openSecondModal.bind(this);
        this.closeSecondModal = this.closeSecondModal.bind(this);
        this.addData = this.addData.bind(this);
    }

    onDrop(files) {
        let data = new FormData();
        data.append('file', files[0], files[0].name);

        let addData = this.addData;

        const req = request.post('data-upload')
            .send(data)
            .end(function(err, res) {
                // TODO - error catching
                addData(res.body.data)
            });

        this.openSecondModal()
    }

    openSecondModal() {
        // First, get data from file upload

        this.setState({
            secondModalOpen:true
        })
    }

    closeSecondModal() {
        this.setState({
            secondModalOpen:false
        });

        this.props.dataHandlers.addData(this.state.data, this.state.headers)
    }

    addData(data) {
        this.setState({
            data:data
        })
    }

    render() {
        const {secondModalOpen, data} = this.state;

        let secondModalContent = <div id="hot-container"/>;
        if (this.state.data) {
            const container = document.getElementById('hot-container');
            var hot = new Handsontable(container, {
                data:data,
                rowHeaders: true
            });
            hot.updateSettings({
                contextMenu: {
                    callback: function (key, options) {
                        if (key === 'header_add') {
                            var selected_row = hot.getSelected()[0];
                            var header = hot.getDataAtRow(0);
                            var header_add = hot.getDataAtRow(selected_row);
                            header = header.map(function(e, i) {
                                return header_add[i] != "" ? e + ", " + header_add[i] : e
                            });

                            hot.alter('remove_row', selected_row);
                            header.map(function(e, i) {
                                hot.setDataAtCell(0, i, e)
                            });
                        }
                    },
                    items: {
                        "header_add": {
                            name: 'Add to header',
                            disabled: function () {
                                // if first row, disable this option
                                return hot.getSelected()[0] === 0;
                            }
                        }
                    }
                },
                cells: function (row, col, prop) {
                    var cellProperties = {};

                    if (row > 0) {
                        cellProperties.readOnly = true;
                    }

                    return cellProperties;
                }
            });
        }

        return (
            <Modal trigger={<Button>Import Data</Button>} size='small'>
                <Modal.Header>Import Data</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Dropzone onDrop={this.onDrop} multiple={false}>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Modal dimmer={false} open={secondModalOpen} onOpen={this.openSecondModal} onClose={this.closeSecondModal} size='small'>
                        <Modal.Header>Data Manipulation</Modal.Header>
                        <Modal.Content>
                            {secondModalContent}
                        </Modal.Content>
                        <Modal.Actions>
                            <Button icon='check' content='All Done' onClick={this.close} />
                        </Modal.Actions>
                    </Modal>
                </Modal.Actions>
            </Modal>
        )
    }
}

class TopMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {activeItem: 'home'};
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    handleItemClick(e, {name}) {
        this.setState({activeItem: name});
    }

    render() {
        const { activeItem } = this.state;

        return (
            <Menu id="top-sidebar">
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
            </Menu>
        )
    }
}

class LeftSideBarMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
        };

        this.shapeHandlers = this.props.shapeHandlers;
        this.toggleVisibility = this.toggleVisibility.bind(this)
    }

    toggleVisibility() {
        this.setState((prevState, props) => {
            return {visible: !prevState.visible};
        });
    }

    render() {
        const { visible } = this.state;
        return (
            <Sidebar animation='overlay' direction="left" width='thin' visible={visible} id="left-sidebar">
                <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
                <GriddedSubMenu shapeHandlers={this.shapeHandlers}/>
            </Sidebar>
        )
    }
}

class RightSideBarMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.toggleVisibility = this.toggleVisibility.bind(this)
    }

    toggleVisibility(e) {
        this.setState((prevState, props) => {
            return {visible: !prevState.visible};
        });
    }

    render() {
        const { visible } = this.state;
        return (
            <Sidebar animation='overlay' direction="right" width='wide' visible={visible} id="right-sidebar">
                <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
            </Sidebar>
        )
    }
}

class GriddedSubMenu extends Component {
    constructor(props) {
        super(props);

        this.getShape = this.getShape.bind(this);
        this.addShape = props.shapeHandlers.addShape;
    }

    getShape(e, shape) {
        this.addShape(shape)
    }

    render() {
        const num_cols = 3;
        var getShape = this.getShape;

        return (
            <Grid container textAlign={"center"} columns={num_cols} padded>
                {shapes.map(function(shape, i) {
                    const viewbox = `${shape.bbox.x0-5} ${shape.bbox.y0-5} ${shape.bbox.w0+10} ${shape.bbox.h0+10}`;

                    return (
                        <Grid.Column key={i}>
                            <a id={shape.id} className="menu-item" name={shape.name} onClick={(e) => getShape(e, shape)}>
                                <svg className="menu-icon" width="40" height="40" viewBox={viewbox} preserveAspectRatio="xMidYMid">
                                    <g className="shape-svg-container">
                                        <g className="shape-svg">
                                            <shape.tag />
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </Grid.Column>
                    )
                })}
            </Grid>
        )
    }
}
