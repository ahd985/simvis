import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Icon, Menu, Grid } from 'semantic-ui-react'

class DrawMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="draw-menu">
                <LeftSideBarMenu />
                <TopSideBarMenu />
                <RightSideBarMenu />
            </div>
        )
    }
}

class LeftSideBarMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.toggleVisibility = this.toggleVisibility.bind(this)
    }

    toggleVisibility(e) {
        this.setState((prevState, props) => {
            return {visible: prevState.visible ? false : true};
        });
    }

    render() {
        return (
            <div id="left-sidebar-menu" className={this.state.visible ? "display-block" : "display-none"}>
                <ToggleSideBarMenu toggleVisibility={this.toggleVisibility}/>
                <ElementSelectSubMenu />
            </div>
        );
    }
}

class TopSideBarMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.toggleVisibility = this.toggleVisibility.bind(this)
    }

    toggleVisibility(e) {
        this.setState((prevState, props) => {
            return {visible: prevState.visible ? false : true};
        });
    }

    render() {
        return (
            <div id="top-sidebar-menu" className={this.state.visible ? "display-block" : "display-none"}>
                <ToggleSideBarMenu toggleVisibility={this.toggleVisibility}/>
            </div>
        );
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
            return {visible: prevState.visible ? false : true};
        });
    }

    render() {
        return (
            <div id="right-sidebar-menu" className={this.state.visible ? "display-block" : "display-none"}>
                <ToggleSideBarMenu toggleVisibility={this.toggleVisibility}/>
            </div>
        );
    }
}

class ToggleSideBarMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility(e) {
        this.props.toggleVisibility();
    }

    render() {
        return (
            <button onClick={this.toggleVisibility}>HIDE</button>
        );
    }
}

class ElementSelectSubMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            icons: [
                {"id": 1, "type":"rect", "attr": {"x":2, "y":10, "height":16, "width":31}},
                {"id": 2, "type":"circle", "attr": {"r":8, "cx":18, "cy":18}},
                {"id": 3, "type":"path", "attr": {"d":"M2,18L31,18Z"}}
            ]
        }
    }

    render() {
        return (
            <GriddedSubMenu icons={this.state.icons} />
        )
    }
}

class GriddedSubMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const num_cols = 3;
        const num_rows = Math.ceil(this.props.icons.length / num_cols);
        return (
            <Grid columns={num_cols} divided>
                <Grid.Row>
                    {this.props.icons.map(function(icon, i) {
                        return (
                            <Grid.Column computer={3}>
                                <a id={icon.id} className="menu-item">
                                    <svg className="menu-icon">
                                        <g className="shape-svg-container" transform="translate(0.5,0.5)">
                                            <icon.type className="shape-svg" {...icon.attr}/>
                                        </g>
                                    </svg>
                                </a>
                            </Grid.Column>
                        )
                    })}
                </Grid.Row>
            </Grid>
        )
    }
}

/*
elements = [
    {"id": 1, "type":"rect", "attr": {"x":2, "y":10, "height":16, "width":31}},
    {"id": 2, "type":"circle", "attr": {"r":8, "cx":18, "cy":18}},
    {"id": 3, "type":"path", "attr": {"d":"M2,18L31,18Z"}}
];
*/

ReactDOM.render(
  <DrawMenu />,
  document.getElementById('draw-container')
);
