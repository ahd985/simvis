import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar } from 'semantic-ui-react'

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
                <div>
                    <TopMenu />
                    <LeftSideBarMenu shapeHandlers={this.shapeHandlers}/>
                    <RightSideBarMenu />
                    <div className="diagram-container">
                        <div className="diagram-background"></div>
                        <Diagram shapes={this.props.shapes}/>
                    </div>
                </div>
            </div>
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
                    return (
                        <Grid.Column>
                            <a id={shape.id} className="menu-item" name={shape.name} onClick={(e) => getShape(e, shape)}>
                                <svg className="menu-icon" width="40" height="40" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin">
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
