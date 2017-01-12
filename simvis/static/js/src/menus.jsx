import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar } from 'semantic-ui-react'

import Diagram from './diagram.js'

export default class DrawMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: []
        };

        this.addElement = this.addElement.bind(this);
    }

    addElement(e, {id}) {

    }

    render() {
        const elements = this.state.elements;

        return (
            <div className="draw-menu">
                <div>
                    <TopMenu />
                    <LeftSideBarMenu addElement={this.addElement}/>
                    <RightSideBarMenu />
                    <div className="diagram-container">
                        <div className="diagram-background"></div>
                        <Diagram element={this.state.elements}/>
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
            icons: [
                {"id": 1, "type":"rect", "attr": {"x":2, "y":10, "height":16, "width":31}},
                {"id": 2, "type":"circle", "attr": {"r":8, "cx":18, "cy":18}},
                {"id": 3, "type":"path", "attr": {"d":"M2,18L31,18Z"}}
            ]
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
            <Sidebar animation='overlay' direction="left" width='thin' visible={visible} id="left-sidebar">
                <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
                <GriddedSubMenu icons={this.state.icons} />
            </Sidebar>
        )
    }
}

class RightSideBarMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
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
    }

    render() {
        const num_cols = 3;
        return (
            <Grid container textAlign={"center"} columns={num_cols} padded>
                {this.props.icons.map(function(icon, i) {
                    return (
                        <Grid.Column>
                            <a id={icon.id} className="menu-item">
                                <svg className="menu-icon">
                                    <g className="shape-svg-container">
                                        <icon.type className="shape-svg" {...icon.attr}/>
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
