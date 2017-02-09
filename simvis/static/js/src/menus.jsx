import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import 'superagent-django-csrf'

import Handsontable from 'handsontable/dist/handsontable.full'

import Diagram from './diagram.js'
import shapes from './shapes'

export default class DrawMenu extends Component {
    constructor(props) {
        super(props);

        this.state={
            contextMenuActive:false,
            contextMenuStyle:{},
            contextUUIDs:null,
            style:{"stroke-width":10}
        };

        this.contextMenuHandler = this.contextMenuHandler.bind(this);
        this.closeContextMenu = this.closeContextMenu.bind(this)
    }

    contextMenuHandler(e, uuid) {
        this.setState({
            contextMenuActive:true,
            contextMenuStyle:{position:"absolute", left:e.clientX, top:e.clientY},
            contextUUIDs:[uuid]
        });
    }

    closeContextMenu() {
        this.setState({
            contextMenuActive:false,
            contextUUIDs:null
        });
    }

    render() {
        return (
            <div className="draw-menu">
                <ShapeContextMenu contextMenuActive={this.state.contextMenuActive}
                                  contextMenuStyle={this.state.contextMenuStyle}
                                  close={this.closeContextMenu}
                                  moveShapes={this.props.shapeHandlers.moveShapes}
                                  contextUUIDs={this.state.contextUUIDs}/>
                <div className="draw-menu-top">
                    <TopMenu />
                </div>
                <div className="draw-menu-bottom">
                    <LeftSideBarMenu shapeHandlers={this.props.shapeHandlers}/>
                    <RightSideBarMenu selectedShapes={this.props.selectedShapes} />

                    <div className="diagram-wrapper">
                        <div className="diagram-container">
                            <div className="diagram-background"></div>
                            <Diagram shapes={this.props.shapes}
                                     shapeHandlers={this.props.shapeHandlers}
                                     selectedShapes={this.props.selectedShapes}
                                     contextMenuHandler={this.contextMenuHandler}
                                     style={this.state.style}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ShapeContextMenu extends Component {
    constructor(props) {
        super(props);

        this.moveForwards = this.moveForwards.bind(this);
        this.moveBackwards = this.moveBackwards.bind(this);
        this.moveToFront = this.moveToFront.bind(this);
        this.moveToBack = this.moveToBack.bind(this)
    }

    moveForwards() {
        this.props.moveShapes(this.props.contextUUIDs, 1);
        this.props.close()
    }

    moveBackwards() {
        this.props.moveShapes(this.props.contextUUIDs, -1);
        this.props.close()
    }

    moveToFront() {
        this.props.moveShapes(this.props.contextUUIDs, "F");
        this.props.close()
    }

    moveToBack() {
        this.props.moveShapes(this.props.contextUUIDs, "B");
        this.props.close()
    }

    render() {
        const menu = <Menu secondary vertical>
            <Menu.Item name='moveForwards' onClick={this.moveForwards}/>
            <Menu.Item name='moveBackwards' onClick={this.moveBackwards}/>
            <Menu.Item name='moveToFront' onClick={this.moveToFront}/>
            <Menu.Item name='moveToBack' onClick={this.moveToBack}/>
        </Menu>;

        return (
            <Popup open={this.props.contextMenuActive} content={menu}
                   style={this.props.contextMenuStyle} basic on='click'
                   onClose={this.props.close}/>
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
        this.openFirstModal = this.openFirstModal.bind(this);
        this.openSecondModal = this.openSecondModal.bind(this);
        this.close = this.close.bind(this);
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

    openFirstModal() {
        this.setState({
            firstModalOpen:true
        })
    }

    openSecondModal() {
        this.setState({
            secondModalOpen:true
        })
    }

    close(data) {
        if (data) {
            this.props.dataHandlers.addData(data.slice(1), data[0])
        }

        this.setState({
            secondModalOpen:false,
            firstModalOpen:false,
            data:null
        });
    }

    addData(data) {
        this.setState({
            data:data
        })
    }

    render() {
        const {firstModalOpen, secondModalOpen, data} = this.state;

        let secondModalContent = <div id="hot-container"></div>;
        if (this.state.data) {
            const container = document.getElementById('hot-container');
            var hot = new Handsontable(container, {
                data:data,
                rowHeaders: true,
                stretchH: "all"
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
            <Modal trigger={<Menu.Item onClick={this.openFirstModal}>Import Data</Menu.Item>} size='small' open={firstModalOpen} onClose={() => this.close(null)}>
                <Modal.Header>Import Data</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Dropzone onDrop={this.onDrop} multiple={false} className="dropzone">
                            <div className="dropzone-area">Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Modal dimmer={false} open={secondModalOpen} onOpen={this.openSecondModal} size='small'>
                        <Modal.Header>Data Manipulation</Modal.Header>
                        <Modal.Content>
                            <Message>
                                <Message.Header>
                                    We did our best to import your data as intended.  Adjust the column names of your data if desired.
                                </Message.Header>
                                <p>
                                    Hint: right-click a row to add it to the header columns as text
                                </p>
                            </Message>
                            {secondModalContent}
                        </Modal.Content>
                        <Modal.Actions>
                            <Button content='All Done' onClick={() => this.close(hot.getData())} />
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
    }

    render() {
        return (
            <Menu id="top-sidebar" size="mini">
                <Menu.Item name="moveForward"><Icon name='move' /></Menu.Item>
                <Menu.Item name="moveBackwards"><Icon name='move' /></Menu.Item>
                <Menu.Menu position='right'>
                    <ImportDataModal/>
                </Menu.Menu>
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
            visible: true,
            activeItem: 'style'
        };

        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(e, {name}) {
        this.setState({activeItem: name})
    }

    render() {
        const { visible } = this.state;
        const { activeItem } = this.state;

        let menu;
        if (activeItem === 'style') {
            menu = <div>XXX</div>
        } else if (activeItem === 'arrange') {
            menu = <div>YYY</div>;
        }

        return (
            <Sidebar animation='overlay' direction="right" width='wide' visible={visible} id="right-sidebar">
                <Menu attached='top' tabular>
                    <Menu.Item name='style' active={activeItem === 'style'} onClick={this.handleTabClick} />
                    <Menu.Item name='arrange' active={activeItem === 'arrange'} onClick={this.handleTabClick} />
                </Menu>
                <Segment attached='bottom' visible={activeItem === 'style'}>
                    {menu}
                </Segment>
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
