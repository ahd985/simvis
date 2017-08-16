import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form, Dropdown, Table, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setShapeStyle, setShapeModel, setOverview, setLayout } from '../actions'

import NumberPicker from '../components/numberPicker';
import ColorPickerModal from '../components/colorPickerModal'
import ModelPickerModal from '../components/modelPickerModal'
import ImportDataModal from './dataImport'

class RightSideBarMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            activeItem: 'model'
        };

        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleStrokeWidthChange = this.handleStrokeWidthChange.bind(this);
        this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
        this.handleOverviewChange = this.handleOverviewChange.bind(this);
    }

    handleTabClick(e, {name}) {
        this.setState({activeItem: name})
    }

    handleStrokeWidthChange(e) {
        this.props.setShapeStyle({strokeWidth:e.value + ''})
    }

    handleFontSizeChange(e) {
        this.props.setShapeStyle({fontSize:e.value + ''})
    }

    handleOverviewChange(e, arg) {
        e.persist ? e.persist() : null;
        this.props.setOverview({
            ...this.props.overview,
            [arg]:e.value ? e.value : e.target.value
        })
    }

    render() {
        const { visible } = this.state;
        const { activeItem } = this.state;
        const textEditorAvailable = true;

        const style = {width:this.props.rightSideBarWidth, right:0, textAlign:"center"};

        let submenu, menu;
        if (!this.props.selectedShapes.length) {
            submenu = null;
            menu = <div id="right-sidebar" style={style}>
                <Segment size="mini" attached>Overview</Segment>
                <Form size="small" style={{padding:5}}>
                    <Form.Input label='Title' name='title' type='text' placeholder='My Simulation' value={this.props.overview.title} onChange={(e) => this.handleOverviewChange(e, "title")}/>
                    <Form.Group widths='equal'>
                        <Form.Input label='X Series Unit' name='x_series_unit' type='text' placeholder='e.g., Hrs' value={this.props.overview.x_series_unit} onChange={(e) => this.handleOverviewChange(e, "x_series_unit")}/>
                        <Form.Input label='Font Size' name='font_size' type='number' value={this.props.overview.font_size} onChange={(e) => this.handleOverviewChange(e, "font_size")} min={1} max={72}/>
                    </Form.Group>
                </Form>
                <Segment size="mini" attached>Layout</Segment>
                <Form size="small" style={{padding:5}}>
                    <Label attached="top">Width x Height</Label>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <Input labelPosition='right' label='px' name='diagram_width' type='number'  value={this.props.diagramWidth} onChange={(e) => this.props.setLayout("diagramWidth", parseInt(e.target.value))} min={1} max={10000}/>
                        </Form.Field>
                        <Form.Field>
                            <Input labelPosition='right' label='px' name='diagram_height' type='number'  value={this.props.diagramHeight} onChange={(e) => this.props.setLayout("diagramHeight", parseInt(e.target.value))} min={1} max={10000}/>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </div>
        } else {
            if (activeItem === 'model') {
                if (!this.props.data) {
                    submenu = <Segment attached='bottom' className="shapes-selected-menu">
                        <Form size="small" style={{padding:5}} as="none">
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <ImportDataModal asForm={true}/>
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Segment>;
                } else {
                    // TODO - check for conflicting models
                    const selectedShapes = this.props.shapes.filter((shape) => {
                        if (this.props.selectedShapes.includes(shape.uuid)) {
                            return true
                        }

                        return false
                    });

                    const selectedModel = selectedShapes[0].model;

                    submenu = <Segment attached='bottom' className="shapes-selected-menu">
                        <Form size="small" style={{padding:5}} as="none">
                            <ModelPickerModal model={selectedModel} setShapeModel={this.props.setShapeModel} ids={this.props.selectedShapes} data={this.props.data} dataHeaders={this.props.dataHeaders}/>
                        </Form>
                    </Segment>;
                }
            } else if (activeItem === 'style') {
                submenu = <Segment attached='bottom' className="shapes-selected-menu">
                    <Form size="small" style={{padding:5}} as="none">
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <ColorPickerModal color={this.props.selectedStyle.fill} setShapeStyle={this.props.setShapeStyle} desc="Fill" attr="fill"/>
                            </Form.Field>
                            <Form.Field>
                               <ColorPickerModal color={this.props.selectedStyle.stroke} setShapeStyle={this.props.setShapeStyle} desc="Stroke" attr="stroke"/>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='10'>
                            <Form.Field width="10" control={NumberPicker} label="Stroke-Width"
                                   name={"strokeWidthPicker"}
                                   value={this.props.selectedStyle.strokeWidth ? this.props.selectedStyle.strokeWidth : 0}
                                   onChange={this.handleStrokeWidthChange}
                                   min={0}/>
                        </Form.Group>
                    </Form>
                </Segment>;
            } else if (activeItem === 'text') {
                submenu = <Segment attached='bottom' className="shapes-selected-menu">
                    <Form size="small" style={{padding:5}} as="none">
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <ColorPickerModal color={this.props.selectedStyle.color} setShapeStyle={this.props.setShapeStyle} desc="Color" attr="color"/>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='10'>
                            <Form.Field width="10" control={NumberPicker} label="Font-Size"
                                   name={"fontSizePicker"}
                                   value={this.props.selectedStyle.fontSize ? this.props.selectedStyle.fontSize : 0}
                                   onChange={this.handleFontSizeChange}
                                   min={0}/>
                        </Form.Group>
                    </Form>
                </Segment>;
            }

            menu = <div id="right-sidebar" style={style}>
                <Menu attached='top' tabular>
                    <Menu.Item name='model' active={activeItem === 'model'} onClick={this.handleTabClick} />
                    <Menu.Item name='style' active={activeItem === 'style'} onClick={this.handleTabClick} />
                    {textEditorAvailable ? <Menu.Item name='text' active={activeItem === 'text'} onClick={this.handleTabClick} /> : null}
                </Menu>
                {submenu}
            </div>
        }

        return (
            this.props.rightSideBarPresent ? menu : null
        )
    }
}

const mapStateToProps = ({ shapeCollection }) => ({
    selectedShapes:shapeCollection.present.selectedShapes,
    shapes:shapeCollection.present.shapes,
    selectedStyle:shapeCollection.present.selectedStyle,
    dataHeaders:shapeCollection.present.dataHeaders,
    data:shapeCollection.present.data,
    rightSideBarWidth:shapeCollection.present.layout.rightSideBarWidth,
    rightSideBarPresent:shapeCollection.present.layout.rightSideBarPresent,
    overview:shapeCollection.present.overview,
    diagramWidth:shapeCollection.present.layout.diagramWidth,
    diagramHeight:shapeCollection.present.layout.diagramHeight
});

const mapDispatchToProps = {
    setShapeStyle:setShapeStyle,
    setShapeModel:setShapeModel,
    setOverview:setOverview,
    setLayout:setLayout
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSideBarMenu)
