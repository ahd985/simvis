import React, { Component } from 'react'
import { Button, Icon, Menu, Grid, Segment, Sidebar, Modal, Message, Popup, Input, Form } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import 'superagent-django-csrf'

import Handsontable from 'handsontable/dist/handsontable.full'

export default class ImportDataModal extends Component {
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
