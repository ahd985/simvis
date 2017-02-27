import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form } from 'semantic-ui-react'

import ImportDataModal from '../components/dataImport.js'

export default class TopMenu extends Component {
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
